import React from 'react';
import { useEffect, useState } from 'react';
import { FixedBottomCTA, Icon, List, ListRow, Lottie, Spacing } from 'components';
import { Top22 } from 'components/Top';
import { colors } from 'constants/colors';

function InquiryCompletePage() {
  return (
    <>
      <Lottie
        src="https://static.toss.im/lotties/confetti/confetti-explode.json"
        loop
        css={{ position: 'fixed', width: '100%' }}
      />
      <Spacing size={20} />
      <Top22 color={colors.grey900}>대출 조회 결과가 나왔어요!</Top22>
      <Spacing size={16} />
      <List>
        <ListRow
          contents={
            <ListRow.Text2Rows
              top="임지훈님의 맞춤 금리"
              topProps={{ color: colors.grey900, typography: 't7' }}
              bottom={formatRate1000(10000)}
              bottomProps={{ color: colors.blue500, typography: 't2', fontWeight: 'semibold' }}
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Text2Rows
              top="한도"
              topProps={{ color: colors.grey900, typography: 't7' }}
              bottom={'0.3'}
              bottomProps={{ color: colors.blue500, typography: 't2', fontWeight: 'semibold' }}
            />
          }
        />
      </List>
      <FixedBottomCTA
        onClick={() => {
          // 개발 편의를 위해 앱 재시작
          location.replace('/start');
        }}
      >
        지금 바로 받으러 가기
      </FixedBottomCTA>
    </>
  );
}

export default InquiryCompletePage;

export function formatRate1000(rate1000: number): string {
  return `${[(rate1000 / 10).toFixed(0), rate1000 % 10].join('.')}%`;
}
