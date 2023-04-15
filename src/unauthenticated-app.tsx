import React from 'react';
import { css } from '@emotion/react';
import { Spacing, LoginForm, Button } from 'components';
import { Modal, ModalContents, ModalOpenButton } from 'components/Modal';
import { useAuth } from 'auth/auth-context';

function UnauthenticatedApp() {
  const { register } = useAuth();

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
          <ModalContents title="로그인">
            <LoginForm onSubmit={register} submitButton={<Button css={{ marginTop: '10px' }}>로그인</Button>} />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button>회원가입</Button>
          </ModalOpenButton>
          <ModalContents title="회원가입">
            <LoginForm onSubmit={register} submitButton={<Button css={{ marginTop: '10px' }}>회원가입</Button>} />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
