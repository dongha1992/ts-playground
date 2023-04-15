import React from 'react';
import { useCustomRouter } from 'hooks/useCustomRouter';
import { Spacing, List, ListRow } from 'components';
import { Top22 } from 'components/Top';
import { colors } from 'constants/colors';

function RegionBasedAddressPage() {
  const router = useCustomRouter();

  const onClickAddressHandler = (region: string) => {
    router.push(`/confirmation`);
  };
  return (
    <>
      <Top22 color={colors.grey900}>{`주택담보대출을 받을\n지역을 알려주세요`}</Top22>
      <Spacing size={22} />
      <List>
        <ListRow
          contents={
            <ListRow.Text1Row
              top={'텍스트1'}
              topProps={{
                color: colors.grey700,
              }}
            />
          }
          withArrow
          onClick={() => onClickAddressHandler('코어시')}
        />
        <ListRow
          contents={
            <ListRow.Text1Row
              top={'텍스트2'}
              topProps={{
                color: colors.grey700,
              }}
            />
          }
          withArrow
          onClick={() => onClickAddressHandler('코어시')}
        />
        <ListRow
          contents={
            <ListRow.Text1Row
              top={'텍스트3'}
              topProps={{
                color: colors.grey700,
              }}
            />
          }
          withArrow
          onClick={() => onClickAddressHandler('코어시')}
        />
      </List>
    </>
  );
}

export default RegionBasedAddressPage;
