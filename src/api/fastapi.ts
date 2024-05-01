import client from "./client";

export const getProducts = async (keyword: string) => {
  const res = await client.get(`/api/products/`, { params: { keyword } });
  return res;
};
