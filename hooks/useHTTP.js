import axios from "axios";
import {useContext} from "react";
import { CONTEXT_APP, STORAGE, TOKEN_KEY } from "../settings.js";

const useHTTP = () => {
  const application = useContext(CONTEXT_APP);
  const privateHTTP = axios.create({
    timeout: 25000
  })

  const publicHTTP = axios.create({
    timeout: 25000
  })

  privateHTTP.interceptors.request.use(
    (config) => {
      application.setIsAuthenticated(true);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  privateHTTP.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { status } = error.response
      if (status && status === 401) {
        await STORAGE.setItem(TOKEN_KEY, "");
        application.setIsAuthenticated(false);
      }
      return Promise.reject(error);
    }
  )

  return {
    privateHTTP,
    publicHTTP
  }
}

export default useHTTP;