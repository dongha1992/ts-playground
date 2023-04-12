import { useUID } from 'react-uid';

export default function useId(givenId?: string) {
  const id = useUID();

  return givenId !== undefined ? `${'id-'}${id}` : id;
}
