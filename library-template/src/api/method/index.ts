import axios from "axios";
import { axiosIntercept } from "../../utils/AxiosInterceptor";
import Api from "../api";

export const axiosPost = async (url: string, body: any) => {
  const response = await axios.post(url, body);
  return response;
};

export const getNewAccessToken = async ({ refreshToken }: any) => {
  try {
    const requestData = {
      refreshToken: refreshToken,
    };
    const response = await axiosIntercept.post(
      Api.GenerateAccessToken,
      requestData
    );
    return response;
  } catch {
    const Pload: any = [];
    return {
      response: { status: 401, data: { success: false, payload: Pload } },
    };
  }
};
