import React, { FormEvent, ReactElement, cloneElement } from 'react';
import Spacing from './Spacing';
import TextFieldLine from './TextFieldLine';
import { useAsync } from 'hooks/useAsync';
import { Spinner } from 'components';

interface Props {
  onSubmit: <T>(form: { username: string; password: string }) => Promise<T>;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  const { isLoading, isError, error, run } = useAsync();

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [username, password] = event.currentTarget.elements as any;
    run(onSubmit({ username: username.value, password: password.value }));
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
        ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children]),
        isLoading ? <Spinner /> : null
      )}
      {/* {isError ? <ErrorMessage error={error} /> : null} */}
      {isError ? <div>에러</div> : null}
    </form>
  );
}

export default LoginForm;
