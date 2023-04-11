import classnames from 'classnames';
import { colors } from 'constants/colors';
import React, { ReactNode, AllHTMLAttributes, forwardRef, Ref, CSSProperties } from 'react';
import { FontWeight, Typography } from './types';

export type TypographyValue = (typeof Typography)[keyof typeof Typography];
export type FontWeightValue = (typeof FontWeight)[keyof typeof FontWeight];

export interface BaseProps {
  chilren?: ReactNode;
  className?: string;
  typography?: TypographyValue;
  fontWeight?: FontWeightValue;
  color?: string;
  ellipsisAfterLines?: number;
  stringToJSX?: boolean;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  wordBreak?: boolean;
  /**
   * @deprecated
   */
  spanAttributes?: AllHTMLAttributes<any>;
}

export type Props = BaseProps;

type TextProps<Element extends keyof JSX.IntrinsicElements = 'span'> = BaseProps & {
  as?: Element;
} & Omit<AllHTMLAttributes<Element>, 'as'>;

function Text<Element extends keyof JSX.IntrinsicElements = 'span'>(props: TextProps<Element>, ref: Ref<HTMLElement>) {
  const {
    as: Component = 'span',
    display = 'inline-block',
    color = colors.grey900,
    className,
    children,
    ellipsisAfterLines,
    typography,
    fontWeight,
    stringToJSX,
    textAlign,
    style,
    spanAttributes,
    wordBreak = true,
    role,
    ...rest
  } = props as TextProps;

  const isSingleLine = ellipsisAfterLines !== undefined && ellipsisAfterLines === 1;
  const isMultiLine = ellipsisAfterLines !== undefined && ellipsisAfterLines > 1;

  return (
    <Component
      ref={ref}
      role={role ?? (Component === 'span' ? 'text' : undefined)}
      {...rest}
      {...(spanAttributes as any)}
      className={classnames(
        'text',
        {
          'text--single-line': isSingleLine,
          'text--multi-line': isMultiLine,
          'text--word-break': isSingleLine ? false : wordBreak,
          [`typography-${typography}`]: typography,
          [`text--font-weight-${fontWeight}`]: fontWeight,
          [`text--display-${display}`]: display && !isSingleLine && !isMultiLine,
          [`text--as`]: Component !== 'span',
        },
        className
      )}
      style={{
        color,
        WebkitLineClamp: isMultiLine ? ellipsisAfterLines : undefined,
        textAlign,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export default forwardRef(Text);

function convertNewLineToJsx(str: string) {}
