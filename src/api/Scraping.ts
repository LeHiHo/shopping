import Client from "./Client";
import cache from "@/utils/ClientCache";

export const getProducts = async (keyword: string) => {
  const cacheKey = `products-${keyword}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData; // 캐시된 데이터가 있으면 반환
  }

  const res = await Client.get(`/api/products/`, { params: { keyword } });
  cache.set(cacheKey, res);  // 응답을 캐시에 저장
  return res;
};