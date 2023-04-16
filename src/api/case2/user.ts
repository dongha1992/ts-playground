import { apiClient } from './api-client';

export const getMeApi = async ({
  token,
}: {
  token: string;
}): Promise<{ user: { username: string; password: string; token: string } }> => {
  // TODO: 에러 처리 해야함

  return apiClient
    .get('me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};
