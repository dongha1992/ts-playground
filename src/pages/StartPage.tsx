import React, { useEffect } from 'react';
import { Banner, Icon, Spacing, Border, List } from 'components';
import { Top22 } from 'components/Top';
import { marginX24 } from 'utils/spacing';
import ListHeader from 'components/ListHeader';
import ListRow from 'components/ListRow';
import { colors } from 'constants/colors';
import FixedBottomCTA from 'components/FixedBottomCTA';
import { useCustomRouter } from 'hooks/useCustomRouter';

function StartPage() {
  const router = useCustomRouter();

  return (
    <>
      <Spacing size={20} />
      <Icon name="logo" size={150} />
      <Top22>{`텍스트1\n텍스트2`}</Top22>
      <Spacing size={32} />
      <Banner
        css={marginX24}
        iconSrc="https://static.toss.im/3d-emojis/u1F91D-apng.png"
        top="텍스트1"
        bottom="텍스트2"
      />
      <Spacing size={24} />
      <Border size={16} />
      <List>
        <ListHeader>텍스트 텍스트</ListHeader>
        <Spacing size={9} />
        <ListRow
          contents={
            <ListRow.Text2Rows
              top="텍스트1"
              topProps={{
                color: colors.grey700,
              }}
              bottom="텍스트2"
              bottomProps={{
                color: colors.grey600,
                typography: 't5',
                fontWeight: 'bold',
              }}
            />
          }
          right={<Icon name="icon-check" size={30} />}
        />
        <Spacing size={4} />
        <ListRow
          contents={
            <ListRow.Text2Rows
              top="자율과 책임 원칙 아래"
              topProps={{
                color: colors.grey700,
              }}
              bottom="스스로 결정하고 주도적으로 일할 수 있어요"
              bottomProps={{
                color: colors.grey600,
                typography: 't5',
                fontWeight: 'bold',
              }}
            />
          }
          right={<Icon name="icon-check" size={30} />}
        />
      </List>
      <FixedBottomCTA onClick={() => router.push('/property-type')}>기술과제 시작하기</FixedBottomCTA>
    </>
  );
}

export default StartPage;
