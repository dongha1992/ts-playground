//https://github.com/kentcdodds/bookshelf/blob/main/src/test/server/server-handlers.js 참고

const usersKey = '__my_users__';
let users: any = {};
const persist = () => window.localStorage.setItem(usersKey, JSON.stringify(users));
const load = () => Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey) ?? ''));

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}

window.__my = window.__my || {};
window.__my.purgeUsers = () => {
  Object.keys(users).forEach(key => {
    delete users[key];
  });
  persist();
};

function validateUserForm({ username, password }: any) {
  if (!username) {
    const error: any = new Error('A username is required');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error: any = new Error('A password is required');
    error.status = 400;
    throw error;
  }
}

async function authenticate({ username, password }: any) {
  validateUserForm({ username, password });
  const id = hash(username);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), token: btoa(user.id) };
  }
  const error: any = new Error('Invalid username or password');
  error.status = 400;
  throw error;
}

async function create({ username, password }: any) {
  validateUserForm({ username, password });
  const id = hash(username);
  const passwordHash = hash(password);
  if (users[id]) {
    const error: any = new Error(`Cannot create a new user with the username "${username}"`);
    error.status = 400;
    throw error;
  }
  users[id] = { id, username, passwordHash };
  persist();
  return read(id);
}

async function read(id: any) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

function sanitizeUser(user: any) {
  const { passwordHash, ...rest } = user;
  return rest;
}

async function update(id: any, updates: any) {
  validateUser(id);
  Object.assign(users[id], updates);
  persist();
  return read(id);
}

// this would be called `delete` except that's a reserved word in JS :-(
async function remove(id: any) {
  validateUser(id);
  delete users[id];
  persist();
}

function validateUser(id: any) {
  load();
  if (!users[id]) {
    const error: any = new Error(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function hash(str: any) {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

async function reset() {
  users = {};
  persist();
}

export { authenticate, create, read, update, remove, reset };
