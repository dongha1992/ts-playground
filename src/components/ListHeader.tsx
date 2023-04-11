import { css } from '@emotion/react';
import { Text } from 'components';

interface ListHeaderProps {
  className?: string;
  children?: string;
}

function ListHeader({ className, children }: ListHeaderProps) {
  return (
    <li
      className={className}
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <Text typography="t5" fontWeight="bold" ellipsisAfterLines={1}>
        {children}
      </Text>
    </li>
  );
}

export default ListHeader;
