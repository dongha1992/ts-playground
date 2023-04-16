interface Props {
  error: unknown;
}

export default function ErrorMessage({ error, ...props }: Props) {
  const err = error instanceof Error ? error : new Error(String(error));
  return (
    <div role="alert" {...props}>
      <span>다음과 같은 에러가 발생했습니다: </span>
      <pre css={[{ whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 }]}>{err.message}</pre>
    </div>
  );
}
