import { ComponentProps, ComponentType } from 'react';
import Button from 'components/Button';
import { GlobalPortal } from '../GlobalPortal';
import { css } from '@emotion/react';

type TypeAProps = ComponentProps<typeof Button>;

function TypeA(props: TypeAProps) {
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
          <Button {...props} />
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}

type TypeBProps = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
};
function TypeB({ leftButton, rightButton }: TypeBProps) {
  return <div>FixedBottomCTA</div>;
}

const FixedBottomCTA = TypeA as ComponentType<TypeAProps> & { TypeB: ComponentType<TypeBProps> };
FixedBottomCTA.TypeB = TypeB;

export default FixedBottomCTA;
