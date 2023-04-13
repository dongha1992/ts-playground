import styled from '@emotion/styled';
import React, { FormEvent } from 'react';
import Button from './Button';
import Spacing from './Spacing';
import TextFieldLine from './TextFieldLine';

function LoginForm() {
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(event, '!1');
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <TextFieldLine label="아이디" />
      <Spacing size={10} />
      <TextFieldLine label="비밀번호" />
      <Spacing size={10} />
      <Button buttonType="submit">제출</Button>
    </form>
  );
}

export default LoginForm;
