import axios from "axios";

const TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

let accessToken: any = null;
let tokenExpiry: any = null;

const getToken = async () => {
  // Token hala geçerliyse tekrar istek atma
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const res = await axios.post(
    TOKEN_URL,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_OPENSKY_CLIENT_ID,
      client_secret: import.meta.env.VITE_OPENSKY_CLIENT_SECRET,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  accessToken = res.data.access_token;
  tokenExpiry = Date.now() + (res.data.expires_in - 30) * 1000; // 30sn önce yenile

  return accessToken;
};

const api = axios.create({
  baseURL: "https://opensky-network.org/api",
  timeout: 15000,
});

// Her istekten önce token ekle
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Hata yönetimi
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      accessToken = null; // Token geçersiz, sıfırla
      tokenExpiry = null;
    }
    return Promise.reject(err);
  }
);

export default api;