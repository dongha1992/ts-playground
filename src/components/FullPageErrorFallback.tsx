import { colors } from 'constants/colors';

export default function FullPageErrorFallback({ error }: any) {
  return (
    <div
      role="alert"
      css={{
        color: colors.red100,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>에러가 발생했습니다.</p>
      <pre>{error.message}</pre>
    </div>
  );
}
