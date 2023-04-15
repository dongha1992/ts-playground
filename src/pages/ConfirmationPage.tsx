import React from 'react';
import { Button, FixedBottomCTA, List, ListRow, Spacing } from 'components';
import { Top22 } from 'components/Top';
import { colors } from 'constants/colors';
import { useCustomRouter } from 'hooks/useCustomRouter';

function ConfirmationPage() {
  const router = useCustomRouter();

  const onNextHandler = () => {
    router.push('/waiting');
  };
  return (
    <>
      <Spacing size={17} />
      <Top22 color={colors.grey900}>아래 정보가 맞는지 확인해주세요</Top22>
      <Spacing size={37} />
      <List>
        <ListRow
          contents={
            <ListRow.Text1Row
              top="이름"
              topProps={{
                color: colors.grey700,
              }}
            />
          }
          right={
            <ListRow.Text1Row
              top={'유저네임'}
              topProps={{
                color: colors.grey700,
              }}
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Text1Row
              top={`선택 주소`}
              topProps={{
                color: colors.grey700,
                typography: 't5',
              }}
            />
          }
          right={
            <ListRow.Text2Rows
              top="토스시 송금동 토스아파트"
              topProps={{
                color: colors.grey700,
                typography: 't5',
                fontWeight: 'bold',
              }}
              bottom="1001동"
              bottomProps={{
                color: colors.grey700,
                typography: 't5',
                textAlign: 'end',
              }}
            />
          }
        />
      </List>
      <FixedBottomCTA.TypeB
        leftButton={
          <Button style="weak" type="dark" onClick={() => router.back()}>
            바꿀래요
          </Button>
        }
        rightButton={
          <Button
            style="fill"
            type="primary"
            onClick={() => {
              onNextHandler();
            }}
          >
            맞아요
          </Button>
        }
      />
    </>
  );
}

export default ConfirmationPage;
