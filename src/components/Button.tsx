import { PropsWithChildren } from 'react';
import useId from 'hooks/useId';
import classnames from 'classnames';

type Props = PropsWithChildren<{
  buttonType?: 'submit';
  type?: 'primary' | 'danger' | 'light' | 'dark';
  style?: 'fill' | 'outline' | 'weak' | 'flat';
  display?: 'inline' | 'block' | 'full';

  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}>;

function Button(props: Props) {
  const {
    type = 'primary',
    style = 'fill',
    display = 'inline',
    disabled,
    className,
    children,
    buttonType,
    ...rest
  } = props;
  const buttonId = useId();

  return (
    <button
      id={buttonId}
      type={buttonType}
      className={classnames(
        'button',
        'button--size-big',
        {
          [`button--type-${type}`]: type,
          [`button--style-${style}`]: style,
          [`button--display-${display}`]: display,
        },
        { disabled },
        className
      )}
      {...rest}
    >
      <span className="button__content">{children}</span>
    </button>
  );
}

export default Button;
