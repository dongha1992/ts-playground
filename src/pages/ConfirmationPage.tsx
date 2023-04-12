import { Spacing } from 'components';
import { Top22 } from 'components/Top';
import { colors } from 'constants/colors';
import React from 'react';

function ConfirmationPage() {
  return (
    <>
      <Spacing size={17} />
      <Top22 color={colors.grey900}>아래 정보가 맞는지 확인해주세요</Top22>
      <Spacing size={37} />
    </>
  );
}

export default ConfirmationPage;
