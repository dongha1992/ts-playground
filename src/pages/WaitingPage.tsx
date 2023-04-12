import React, { useEffect } from 'react';
import { useCustomRouter } from 'hooks/useCustomRouter';
import { Lottie } from 'components';
import { Top22 } from 'components/Top';
import { colors } from '../constants/colors';
// import { getLoanInquiryProgress } from './remotes';

function WaitingPage() {
  const router = useCustomRouter();
  return (
    <>
      <Top22 color={colors.grey900}>{`입력한 정보로\n임지훈님의 대출 조건을 확인할게요`}</Top22>
    </>
  );
}

export default WaitingPage;
