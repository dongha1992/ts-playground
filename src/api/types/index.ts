export interface GetAptAddresses {
  /*
   * 예)
   * rootRegions[0] = {
   *   name: '코어시',
   *   children: [
   *     {
   *       name: '송금동',
   *       children: [
   *         { name: '토스아파트 1001동', propertyType: '아파트' },
   *       ]
   *     },
   *  ]
   * }
   */
  rootRegions: AptAddressTreeNode[];
}
export type AptAddressTreeNode =
  // 최상위 노드 혹은 중간 노드
  | {
      name: string; // 시군구, 읍면동 등 지역명
      children?: AptAddressTreeNode[];
    }
  // 마지막 노드
  | {
      name: string; // 아파트명
      propertyType: '아파트';
    };

export interface GetRegions {
  /*
   * 예)
   * rootRegions[0] = {
   *   name: '코어시',
   *   children: [
   *     {
   *       name: '송금동',
   *     },
   *  ]
   * }
   */
  rootRegions?: RegionTreeNode[];
}
export interface RegionTreeNode {
  name: string; // 시군구, 읍면동 등 지역명
  children?: RegionTreeNode[];
}

export interface GetMe {
  name: string;
}

export interface InquiryLoan {
  transactionId: string;
}
export interface GetLoanInquiryProgress {
  progress: 'idle' | 'in_progress' | 'complete';
}

export interface GetLoanInquiryResult {
  loanLimitAmount: number; // 1000은 1000원을 의미
  interestRate1000: number; // 1000은 100.0%를 의미
}
