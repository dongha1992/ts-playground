import React, { useState } from 'react';
import { Header, Range, TextArea, TextFieldLine } from 'components';

function Test() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Header />
      <Range />
      <TextArea />
      <TextFieldLine label="테스트" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  );
}

export default Test;
