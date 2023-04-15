import React, { FormEvent, ReactElement, cloneElement } from 'react';
import Spacing from './Spacing';
import TextFieldLine from './TextFieldLine';
// import { Spinner } from 'components';

interface Props {
  onSubmit: () => void;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  // const isLoading = true;
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <TextFieldLine label="아이디" />
      <Spacing size={10} />
      <TextFieldLine label="비밀번호" />
      <Spacing size={10} />
      {cloneElement(
        submitButton,
        {
          type: 'submit',
        },
        ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children])
        // isLoading ? <Spinner /> : null
      )}
    </form>
  );
}

export default LoginForm;
