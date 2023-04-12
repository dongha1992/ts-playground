import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { AddressTreeNode, addressTrees } from './data/data';

type getParameter = Parameters<typeof rest.get>[1];
type postParameter = Parameters<typeof rest.post>[1];

export function handlers() {
  return [
    // rest.get('/api/apt-addresses', getAptAddresses),
    // rest.get('/api/regions', getRegions),
    rest.get('/api/me', getMe),
    // rest.post('/api/loan-inquiry', postLoanInquiry),
    // rest.get('/api/loan-inquiry/progress', getLoanInquiryProgress),
    // rest.get('/api/loan-inquiry/result', getLoanInquiryResult),
  ];
}

const getMe: getParameter = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      name: '김동하',
    })
  );
};

// const getAptAddresses: getParameter = (_, res, ctx) => {
//   return ctx.status(200), ctx.json({ rootRegions: aptAddressTrees });
// };

// function aptAddressTree(dest, src) {
//   dest.name = src.name;
// }
