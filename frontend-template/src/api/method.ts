// @ts-ignore
import { axiosIntercept } from "saasLibraries/AxiosIntercept";

const postData = async ({ url, data }: { url: string; data: any }) =>
  await axiosIntercept.post(url, data);

const fetchData = async ({ url }: { url: String }) =>
  await axiosIntercept.get(url).then((response: any) => response.data);

const putData = async ({ url, data }: { url: string; data: any }) =>
  await axiosIntercept.put(url, data);

const deleteData = async ({ url }: { url: String }) =>
  await axiosIntercept.delete(url).then((response: any) => response.data);

export { fetchData, postData, putData, deleteData };
