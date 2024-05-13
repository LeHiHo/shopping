"use server";

import { getProducts } from "@/api/Scraping";
import NodeCache from "node-cache";

// 캐시 인스턴스 생성, 캐시 유효 기간은 10분(600초)으로 설정
const cache = new NodeCache({ stdTTL: 600 });

export async function ProductsSearchAction(keyword: string) {
  if (!keyword) {
    return {
      message: "키워드를 입력해주세요",
    };
  }

  try {
    // 캐시에서 데이터 조회
    const cachedData = cache.get(keyword);
    if (cachedData) {
      return {
        message: "캐시된 데이터로 검색에 성공했습니다.",
        data: cachedData,
      };
    }

    const res = await getProducts(keyword);

    if (res.data.statusCode === 400) {
      return {
        message: "검색이 실패했습니다.",
      };
    }

    // 새로운 데이터를 캐시에 저장
    cache.set(keyword, res.data);

    return {
      message: "검색에 성공했습니다.",
      data: res.data,
    };
  } catch (error: any) {
    console.error("검색 실패:", error);
    return {
      message: "검색이 실패했습니다.",
    };
  }
}
