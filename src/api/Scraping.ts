import Client from "./Client";

export const getProducts = async (keyword: string) => {
  const res = await Client.get(`/api/products/`, { params: { keyword } });
  return res;
};
