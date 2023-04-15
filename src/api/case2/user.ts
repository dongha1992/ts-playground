import { apiClient } from './api-client';

export const getMeApi = async ({ token }: { token: string }): Promise<any> => {
  return apiClient
    .get('me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log(res, 'res');
    });
};
