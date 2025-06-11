import createApi from '@/lib/axios';

const useApi = (session) => {
  const accessToken = session?.accessToken;

  const api = createApi(accessToken);
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return api;
};

export default useApi;
