import { useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const useHttpRequest = () => {
  const sendRequest = useCallback(async (url, method = "GET", headers = {}, body = null) => {
    try {
      const dataRequest = async (value, urlData, data, headersData) => {
        switch (value) {
          case "GET":
            return await axiosInstance.get(urlData, headersData);
          case "POST":
            return await axiosInstance.post(urlData, data, headersData);
          case "PATCH":
            return await axiosInstance.patch(urlData, data, headersData);
          case "DELETE":
            return await axiosInstance.delete(urlData, headersData);
          default:
            return;
        }
      };
      const { data } = await dataRequest(method, url, body, headers);

      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  return { sendRequest };
};

export default useHttpRequest;
