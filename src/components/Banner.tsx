import { css } from '@emotion/react';
import { Text } from 'components';
import { colors } from '../constants/colors';

function Banner({
  className,
  iconSrc,
  top,
  bottom,
}: {
  className?: string;
  iconSrc: string;
  top: string;
  bottom?: string;
}) {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        align-items: center;
        background-color: ${colors.grey100};
        border-radius: 20px;
        padding: 24px;
      `}
    >
      <img
        alt="아이콘"
        src={iconSrc}
        css={css`
          width: 40px;
          height: 40px;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 16px;
        `}
      >
        <Text color="rgb(51, 61, 75)" fontWeight="bold" typography="t4">
          {top}
        </Text>
        {bottom ? (
          <Text color={colors.grey700} typography="t6" fontWeight="regular">
            {bottom}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

export default Banner;
