import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { AddressTreeNode, addressTrees } from './data/data';
import * as usersDB from './data/users';
import { match } from 'node-match-path';

/* failure 처리 때문에 msw 모듈 건드림.... */

type GetParameter = Parameters<typeof rest.get>[1];
type PostParameter = Parameters<typeof rest.post>[1];

const apiUrl = process.env.REACT_APP_API_URL;
const authUrl = process.env.REACT_APP_AUTH_URL;

let sleep: () => void;
if (process.env.CI) {
  sleep = () => Promise.resolve();
} else if (process.env.NODE_ENV === 'test') {
  sleep = () => Promise.resolve();
} else {
  sleep = (t = Math.random() * ls('__my_variable_request_time__', 400) + ls('__my_min_request_time__', 400)) =>
    new Promise(resolve => setTimeout(resolve, t));
}

function ls(key: any, defaultVal: any) {
  const lsVal = window.localStorage.getItem(key);
  let val;
  if (lsVal) {
    val = Number(lsVal);
  }
  return Number.isFinite(val) ? val : defaultVal;
}

const postLogin: PostParameter = async (req, res, ctx) => {
  const { username, password } = req.body as any;

  const user = await usersDB.authenticate({ username, password });
  return res(ctx.json({ user }));
};

const postRegister: PostParameter = async (req, res, ctx) => {
  const { username, password } = req.body as any;

  const userFields = { username, password };
  await usersDB.create(userFields);
  let user;
  try {
    user = await usersDB.authenticate(userFields);
  } catch (error: any) {
    return res(ctx.status(400), ctx.json({ status: 400, message: error.message }));
  }
  return res(ctx.json({ user }));
};

const getMe: GetParameter = async (req, res, ctx) => {
  const user = await getUser(req);
  const token = getToken(req);
  return res(ctx.json({ user: { ...user, token } }));
};

const getToken = (req: any) => req.headers.get('Authorization')?.replace('Bearer ', '');

async function getUser(req: any) {
  const token = getToken(req);
  if (!token) {
    const error: any = new Error('A token must be provided');
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error: any = new Error('Invalid token. Please login again.');
    error.status = 401;
    throw error;
  }
  const user = await usersDB.read(userId);
  return user;
}

/* User 관련은 다른 부분을 참고해서 아래 api와 다름 */

// const getMe: GetParameter = (_, res, ctx) => {
//   return res(
//     ctx.status(200),
//     ctx.json({
//       name: '김동하',
//     })
//   );
// };

const getAptAddresses: GetParameter = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ rootRegions: aptAddressTrees }));
};
const aptAddressTrees = addressTrees.map(root => aptAddressTree({}, root));
function aptAddressTree(dest: Partial<AddressTreeNode>, src: AddressTreeNode) {
  dest.name = src.name;
  dest.children = src.children
    ?.filter(c => c.propertyType == null || c.propertyType === '아파트')
    .map(c => aptAddressTree({ name: c.name, propertyType: c.propertyType }, c));
  if (dest.children?.length === 0) {
    dest.children = undefined;
  }
  return dest as AddressTreeNode;
}

const regionTrees = addressTrees.map(root => regionTree({}, root));
function regionTree(dest: Partial<AddressTreeNode>, src: AddressTreeNode) {
  dest.name = src.name;
  dest.children = src.children?.filter(c => c.propertyType == null).map(c => regionTree({ name: c.name }, c));
  if (dest.children?.length === 0) {
    dest.children = undefined;
  }
  return dest as AddressTreeNode;
}

const getRegions: GetParameter = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ rootRegions: regionTrees }));
};

const inquiryByTransactionId: Record<
  string,
  { status: 'idle' | 'in_progress' | 'complete'; result?: { loanLimitAmount: number; interestRate1000: number } }
> = {};

const postLoanInquiry: PostParameter = (_, res, ctx) => {
  const transactionId = uuidv4();
  inquiryByTransactionId[transactionId] = {
    status: 'in_progress',
    result: undefined,
  };

  setTimeout(() => {
    inquiryByTransactionId[transactionId].status = 'complete';
    inquiryByTransactionId[transactionId].result = {
      loanLimitAmount: 306 * 천만,
      interestRate1000: 32,
    };
  }, 2000);

  return res(ctx.status(200), ctx.json({ transactionId }));
};

const getLoanInquiryProgress: GetParameter = (req, res, ctx) => {
  const tid = req.url.searchParams.get('transactionId');
  if (tid == null || inquiryByTransactionId[tid] == null) {
    return res(ctx.status(400));
  }

  return res(
    ctx.status(200),
    ctx.json({
      progress: inquiryByTransactionId[tid].status,
    })
  );
};

const getLoanInquiryResult: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const tid = req.url.searchParams.get('transactionId');
  if (tid == null || inquiryByTransactionId[tid] == null) {
    return res(ctx.status(400));
  }
  return res(ctx.status(200), ctx.json(inquiryByTransactionId[tid].result));
};

const 천만 = 1000 * 10000;

const handlers: any = [
  rest.get('/api/apt-addresses', getAptAddresses),
  rest.get('/api/regions', getRegions),
  rest.post('/api/loan-inquiry', postLoanInquiry),
  rest.get('/api/loan-inquiry/progress', getLoanInquiryProgress),
  rest.get('/api/loan-inquiry/result', getLoanInquiryResult),

  // 아래 user 관련은 위와 조금 다름
  rest.post(`${authUrl}/login`, postLogin),
  rest.post(`${authUrl}/register`, postRegister),
  rest.get(`${apiUrl}/me`, getMe),
].map(handler => {
  const originalResolver = handler.resolver;
  handler.resolver = async function resolver(req: any, res: any, ctx: any) {
    try {
      if (shouldFail(req)) {
        throw new Error('Request failure (for testing purposes).');
      }
      const result = await originalResolver(req, res, ctx);
      return result;
    } catch (error: any) {
      const status = error.status || 500;
      return res(ctx.status(status), ctx.json({ status, message: error.message || 'Unknown Error' }));
    } finally {
      await sleep();
    }
  };
  return handler;
});

// const handlers: any = [
//   rest.get('/api/apt-addresses', getAptAddresses),
//   rest.get('/api/regions', getRegions),
//   rest.post('/api/loan-inquiry', postLoanInquiry),
//   rest.get('/api/loan-inquiry/progress', getLoanInquiryProgress),
//   rest.get('/api/loan-inquiry/result', getLoanInquiryResult),

//   // 아래 user 관련은 위와 조금 다름
//   rest.post(`${authUrl}/login`, postLogin),
//   rest.post(`${authUrl}/register`, postRegister),
//   rest.get(`${apiUrl}/me`, getMe),
// ].map(handler => {
//   const customHandler = new CustomRequestHandler(handler);
//   console.log(handler, 'handler');
//   console.log(customHandler, 'customHandler');
//   customHandler.setCustomResolver(async function resolver(req: any, res: any, ctx: any) {
//     try {
//       if (shouldFail(req)) {
//         throw new Error('Request failure (for testing purposes).');
//       }
//       const result = await customHandler.resolver(req, res, ctx);
//       return result;
//     } catch (error: any) {
//       const status = error.status || 500;
//       return res(ctx.status(status), ctx.json({ status, message: error.message || 'Unknown Error' }));
//     } finally {
//       await sleep();
//     }
//   });
//   // customHandler.setCustomResolver(handler.resolver);
//   return customHandler;
// });

function shouldFail(req: any) {
  if (JSON.stringify(req.body)?.includes('FAIL')) {
    return true;
  }
  if (req.url.searchParams.toString()?.includes('FAIL')) {
    return true;
  }
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  const failureRate = Number(window.localStorage.getItem('__my_failure_rate__') || 0);
  if (Math.random() < failureRate) {
    return true;
  }
  if (requestMatchesFailConfig(req)) {
    return true;
  }

  return false;
}

function requestMatchesFailConfig(req: any) {
  function configMatches({ requestMethod, urlMatch }: any) {
    return (requestMethod === 'ALL' || req.method === requestMethod) && match(urlMatch, req.url.pathname).matches;
  }
  try {
    const failConfig = JSON.parse(window.localStorage.getItem('__my_request_fail_config__') || '[]');
    if (failConfig.some(configMatches)) {
      return true;
    }
  } catch (error) {
    window.localStorage.removeItem('__my_request_fail_config__');
  }
  return false;
}

export { handlers };
