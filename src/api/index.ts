import { http } from './http';
import qs from 'qs';
import { GetLoanInquiryProgress, GetLoanInquiryResult, GetMe, GetRegions, InquiryLoan } from './types';

// 지역 API
// 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요.
export function getRegions() {
  return http.get<GetRegions>('/api/regions');
}
// 고객 정보 API
// 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요.
export function getMe() {
  return http.get<GetMe>('/api/me');
}
// 대출 조회 API
// 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요.
export function inquiryLoan(data: { propertyType: '주택/빌라' | '아파트'; address: string[] }) {
  return http.post<any, InquiryLoan>('/api/loan-inquiry', data);
}
// 대출 조회 진행 확인 API
// 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요.
export function getLoanInquiryProgress(transactionId: string) {
  return http.get<GetLoanInquiryProgress>(
    `/api/loan-inquiry/progress${qs.stringify({ transactionId }, { addQueryPrefix: true })}`
  );
}
// 대출 조회 결과 API
// 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요.
export function getLoanInquiryResult(transactionId: string) {
  return http.get<GetLoanInquiryResult>(
    `/api/loan-inquiry/result${qs.stringify({ transactionId }, { addQueryPrefix: true })}`
  );
}
