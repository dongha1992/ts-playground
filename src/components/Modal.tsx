import React, {
  createContext,
  ReactElement,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  HTMLAttributes,
  cloneElement,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { GlobalPortal } from 'GlobalPortal';
import Text from './Text';
import Spacing from './Spacing';
import { colors } from 'constants/colors';
import { callAll } from 'utils/callAll';

type ModalState = [boolean, Dispatch<SetStateAction<boolean>>];
const ModalContext = createContext<ModalState | null>(null);

function useModalContext() {
  const context = React.useContext(ModalContext);
  if (context === null) {
    throw new Error(`useModal must be used within a ModalProvider`);
  }
  return context as ModalState;
}

function Modal(props: HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const value = [isOpen, setIsOpen];
  return <ModalContext.Provider value={value as ModalState} {...props} />;
}

interface Children {
  children: ReactElement;
}

function ModalCloseButton({ children: child }: Children) {
  const [, setIsOpen] = useModalContext();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}
function ModalOpenButton({ children: child }: Children) {
  const [, setIsOpen] = useModalContext();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props: HTMLAttributes<HTMLDivElement>) {
  const [isOpen, _] = useModalContext();

  if (!isOpen) {
    return null;
  }

  return (
    <GlobalPortal.Consumer>
      <div
        className="modal-container"
        css={css`
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0px;
          left: 0px;
          height: 100%;
          width: 100%;
        `}
      >
        <Dialog {...props} />
      </div>
    </GlobalPortal.Consumer>
  );
}

type Props = PropsWithChildren<{
  title: string;
}>;

function ModalContents({ title, children, ...props }: Props) {
  return (
    <ModalContentsBase {...props}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div css={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
          <ModalCloseButton>
            <CircleButton>
              <span aria-hidden>×</span>
            </CircleButton>
          </ModalCloseButton>
        </div>
        <Text
          className="typography-t1"
          css={css`
            text-align: center;
          `}
        >
          {title}
        </Text>
        {children}
      </div>
      <Spacing size={30} />
    </ModalContentsBase>
  );
}

export { Modal, ModalCloseButton, ModalOpenButton, ModalContents };

const Dialog = styled.div`
  position: relative;
  width: 432px;
  height: auto;
  border-radius: 3px;
  padding: 16px;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
`;

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.white,
  color: colors.black,
  border: `1px solid ${colors.greyOpacity400}`,
  cursor: 'pointer',
});
