import { css } from '@emotion/react';
import { Icon, Spacing } from 'components';
import React from 'react';

function UnauthenticatedApp() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <Spacing size={20} />
    </div>
  );
}

export default UnauthenticatedApp;
