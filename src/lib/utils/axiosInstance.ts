import axios from "axios";

const OPENDOTA_API_BASE_URL = process.env.OPENDOTA_API_BASE_URL;

if (!OPENDOTA_API_BASE_URL) {
  console.error(
    "Error: Variabel lingkungan OPENDOTA_API_BASE_URL tidak didefinisikan."
  );
  console.error(
    "Pastikan anda memiliki file .env di root proyek dengan OPENDOTA_API_BASEURL = http://api.opendota.com/api"
  );
}

const openDotaApiClient = axios.create({
  baseURL: OPENDOTA_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

openDotaApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("[Axios Request Error]", error.message);
    return Promise.reject(error);
  }
);

openDotaApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
      if (error.message) {
        console.error("[Axios Response Error] Status:", error.response?.status);
        console.error("[Axios Response Error] Data:", error.response?.data);
      } else if (error.request) {
        console.error(
          "[Axios Response Error] Tidak ada response diterima dari server:",
          error.request
        );
      } else {
        console.error(
          "[Axios Response Error] Tidak ada response diterima dari server:",
          error.request
        );
      }
    } else {
      console.error("[Axios Response Error] Kesalahan tidak dikenal:", error);
    }
    return Promise.reject(error);
  }
);
export default openDotaApiClient;
