import axios from "axios";
import { userInfoStorage, userInfoKeys, clearStorage } from "@/utils/storage";
import Message from "@/components/Message/index";

const isDev = process.env.NODE_ENV === "development";
export const baseURL = !isDev || process.env.REACT_APP_ENV === "production"
  ? "https://ic.dmail.ai/api/v3"
  : "https://testmail.dmail.ai/api/v3";
  
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.defaults.timeout = 120000;

export const cache = {
  pid: userInfoStorage.get(userInfoKeys[0]) || undefined,
  enpid: userInfoStorage.get(userInfoKeys[5]) || undefined,
};

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (cache.pid === undefined) {
      cache.pid = userInfoStorage.get(userInfoKeys[0]) || undefined;
    }

    if (cache.enpid === undefined) {
      cache.enpid = userInfoStorage.get(userInfoKeys[5]) || undefined;
    }

    if (cache.pid && cache.enpid && config.headers) {
      config.headers["dm-pid"] = cache.pid;
      config.headers["dm-encstring"] = cache.enpid;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    const code = res.data.code;
    if ((code == -1 || code == -2) && process.env.NODE_ENV !== "development") {
      Message.warn("Login status is disabled");
      clearStorage();
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else if (code === 0) {
      // Message.error(res.data.msg || "Request error");
    }
    return res;
  },
  (error) => {
    if (error.code == "ECONNABORTED" && error.message.includes("15000ms")) {
      return Promise.reject(error);
    }

    if (error.code == "ECONNABORTED") {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default function (config) {
  if (config.errorTitle) {
    if (!config.transformResponse) {
      config.transformResponse = [];
    }
    Array.isArray(config.transformResponse) &&
      config.transformResponse.push((data) => ({
        ...JSON.parse(data),
        errorTitle: config.errorTitle,
      }));
  }

  return axiosInstance(config).catch(function (res) {
    return res;
  });
}
