import React from 'react';
import { css } from '@emotion/react';
import { Icon, Spacing, LoginForm, Button } from 'components';
import { Modal, ModalCloseButton, ModalContents, ModalOpenButton } from 'components/Modal';

function UnauthenticatedApp() {
  const registerHandler = () => {};
  const loginHandler = () => {};
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
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-gap: 0.75rem;
        `}
      >
        <Modal>
          <ModalOpenButton>
            <Button>로그인</Button>
          </ModalOpenButton>
          <ModalContents title="Login">
            <LoginForm onSubmit={loginHandler} />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button>회원가입</Button>
          </ModalOpenButton>
          <ModalContents title="Login">
            <LoginForm onSubmit={registerHandler} />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
