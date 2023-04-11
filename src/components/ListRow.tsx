import { css } from '@emotion/react';
import React, { ComponentProps, ReactNode } from 'react';
import Text from './Text';

interface ListRowProps {
  className?: string;
  contents: ReactNode;
  right?: ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
}

function ListRow({ className, contents, right, withArrow, onClick }: ListRowProps) {
  return (
    <li
      className={className}
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
      onClick={onClick}
    >
      {contents} {right}
    </li>
  );
}

interface Text2RowsProps {
  top: string;
  topProps?: ComponentProps<typeof Text>;
  bottom: string;
  bottomProps?: ComponentProps<typeof Text>;
}

ListRow.Text2Rows = ({ top, topProps, bottom, bottomProps }: Text2RowsProps) => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column' }}>
      <Text {...topProps}>{top}</Text>
      <Text {...bottomProps}>{bottom}</Text>
    </div>
  );
};

export default ListRow;
