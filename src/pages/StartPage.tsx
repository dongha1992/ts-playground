import React from 'react';
import { Banner, Icon, Spacing, Border, List, Text } from 'components';
import { Top22 } from 'components/Top';
import { marginX24 } from 'utils/spacing';
import ListHeader from 'components/ListHeader';
import ListRow from 'components/ListRow';
import { colors } from 'constants/colors';

function StartPage() {
  return (
    <>
      <Spacing size={20} />
      <Icon name="logo" size={150} />
      <Top22>{`토스 프론트엔드\n기술과제를 시작할게요`}</Top22>
      <Spacing size={32} />
      <Banner
        css={marginX24}
        iconSrc="https://static.toss.im/3d-emojis/u1F91D-apng.png"
        top="지금 토스팀에 합류해서"
        bottom="최고의 제품을 함께 만들어요!"
      />
      <Spacing size={24} />
      <Border size={16} />
      <List>
        <ListHeader>토스에 합류하시면</ListHeader>
        <Spacing size={9} />
        <ListRow
          contents={
            <ListRow.Text2Rows
              top="최고의 제품을 만들어"
              topProps={{
                color: colors.grey700,
              }}
              bottom="시장을 혁신하는 경험을 할 수 있어요"
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
    </>
  );
}

export default StartPage;
