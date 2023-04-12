import React from 'react';
import { useCustomRouter } from 'hooks/useCustomRouter';
import { useState } from 'react';
import { FixedBottomCTA, Radio, Spacing } from 'components';
import { Top22 } from 'components/Top';
import { colors } from 'constants/colors';
import { marginX24 } from 'utils/spacing';

function PropertyTypePage() {
  const [value, setValue] = useState('0-아파트');

  const router = useCustomRouter();

  const onNextClickHandler = () => {
    router.push('/region-based-address');
  };
  return (
    <>
      <Top22 color={colors.grey900}>{`주택담보대출을 신청할\n주택의 종류를 선택해주세요`}</Top22>
      <Spacing size={32} />
      <Radio value={value} onChange={e => setValue(e.target.value)} css={marginX24}>
        <Radio.Option value="0-아파트">아파트</Radio.Option>
        <Radio.Option value="1-주택/빌라">주택/빌라</Radio.Option>
        <Radio.Option value="2-기타">기타</Radio.Option>
      </Radio>
      <FixedBottomCTA onClick={onNextClickHandler} disabled={false}>
        다음
      </FixedBottomCTA>
    </>
  );
}

export default PropertyTypePage;
