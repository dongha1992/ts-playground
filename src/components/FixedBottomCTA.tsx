import { ComponentProps, ComponentType } from 'react';
import Button from 'components/Button';
import { GlobalPortal } from '../GlobalPortal';
import { css } from '@emotion/react';

function TypeA() {
  return (
    <GlobalPortal.Consumer>
      <div
        css={css`
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
        `}
      >
        <div
          css={css`
            padding: 0 20px 18px;
          `}
        >
          <Button />
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}

function TypeB() {
  return <div>FixedBottomCTA</div>;
}

const FixedBottomCTA = TypeA;

export default FixedBottomCTA;
