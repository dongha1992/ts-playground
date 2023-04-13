import React, { createContext, ReactElement, useState, Dispatch, SetStateAction, useContext } from 'react';
import { Dialog as ReachDialog } from '@reach/dialog';
import * as mq from 'styles/media-queries';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Top22 } from './Top';

type ModalState = [boolean, Dispatch<SetStateAction<boolean>>];
const ModalContext = createContext<ModalState | null>(null);

function useModal() {
  const context = React.useContext(ModalContext);
  if (context === null) {
    throw new Error(`useModal must be used within a ModalProvider`);
  }
  return context as ModalState;
}

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const value = [isOpen, setIsOpen];
  return <ModalContext.Provider value={value as ModalState} />;
}

function ModalCloseButton({ children: child }: any) {
  const [, setIsOpen] = useModal();
}
function ModalOpenButton({ children: child }: any) {
  const [, setIsOpen] = useModal();
}

function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = useModal();
  return <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />;
}

function ModalContents({ title, children, ...props }: any) {
  return (
    <ModalContentsBase {...props}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ModalCloseButton>닫기</ModalCloseButton>
        <Top22>{title}</Top22>
        {children}
      </div>
    </ModalContentsBase>
  );
}

export { Modal, ModalCloseButton, ModalOpenButton, ModalContents };

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
});
