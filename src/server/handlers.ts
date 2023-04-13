import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { AddressTreeNode, addressTrees } from './data/data';

type GetParameter = Parameters<typeof rest.get>[1];
type PostParameter = Parameters<typeof rest.post>[1];

export function handlers() {
  return [
    rest.get('/api/apt-addresses', getAptAddresses),
    rest.get('/api/regions', getRegions),
    rest.get('/api/me', getMe),
    rest.post('/api/loan-inquiry', postLoanInquiry),
    rest.get('/api/loan-inquiry/progress', getLoanInquiryProgress),
    rest.get('/api/loan-inquiry/result', getLoanInquiryResult),
  ];
}

const getMe: GetParameter = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      name: '김동하',
    })
  );
};

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
