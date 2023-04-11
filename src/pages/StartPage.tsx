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
      </List>
    </>
  );
}

export default StartPage;
