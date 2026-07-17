import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('oauth_access_token');
  const expiresAt = Number(localStorage.getItem('oauth_token_expiry'));

  if (expiresAt && Date.now() >= expiresAt - 5 * 60 * 1000) {
    const refreshToken = localStorage.getItem('oauth_refresh_token');
    if (refreshToken) {
      try {
        const res = await axios.post(
          import.meta.env.VITE_OAUTH_TOKEN_URL || 'https://oauth2.googleapis.com/token',
          new URLSearchParams({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        );
        token = res.data.access_token;
        localStorage.setItem('oauth_access_token', token!);
        localStorage.setItem(
          'oauth_token_expiry',
          String(Date.now() + res.data.expires_in * 1000),
        );
        if (res.data.refresh_token) {
          localStorage.setItem('oauth_refresh_token', res.data.refresh_token);
        }
      } catch {
        localStorage.removeItem('oauth_access_token');
        localStorage.removeItem('oauth_token_expiry');
        localStorage.removeItem('oauth_refresh_token');
        window.location.href = '/';
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('oauth_access_token');
      localStorage.removeItem('oauth_token_expiry');
      localStorage.removeItem('oauth_refresh_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default api;