"use server";

import { getProducts } from "@/api/Scraping";

export async function ProductsSearchAction(keyword: string) {
  if (keyword) {
    try {
      const res = await getProducts(keyword);

      if (res.data.statusCode === 400) {
        return {
          message: "검색이 실패했습니다.",
        };
      }

      return {
        // redirectUri: "/main/result",
        message: "검색에 성공했습니다.",
        data: res.data,
      };
    } catch (error: any) {
      console.error("검색 실패:", error);
      return {
        message: "검색이 실패했습니다.",
      };
    }
  } else {
    return {
      message: "아이디와 비밀번호를 입력해주세요",
    };
  }
}
