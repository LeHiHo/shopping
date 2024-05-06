"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { ProductsSearchAction } from "@/app/main/action";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

const LoginPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  // const router = useRouter();
  const [items, setItems] = useState<ProductSearchResult[]>([]);

  return (
    <>
      <form
        action={async () => {
          try {
            const result = await ProductsSearchAction(keyword);
            if (result?.data) {
              let combinedItems: ProductSearchResult[] = [];
              if (result.data.coupang) {
                combinedItems = combinedItems.concat(result.data.coupang);
              }
              if (result.data.ali) {
                combinedItems = combinedItems.concat(result.data.ali);
              }
              setItems(combinedItems);
              if (combinedItems.length === 0) {
                console.log("검색 결과가 없습니다.");
              }
            }
          } catch (error) {
            console.error("서버 액션 오류", error);
            setItems([]); // 오류 발생 시 상태 초기화
          }
          // alert(result?.message);
          // if (result?.redirectUri) {
          //   router.push(result.redirectUri);
          // }
        }}
      >
        <div className="flex">
          <Input
            type="text"
            placeholder="찾고 싶은 상품을 검색해보세요!"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit">검색</Button>
        </div>
      </form>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-wrap">
            {items ? (
              items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 m-2 border rounded shadow-lg flex flex-col items-center"
                >
                  <div className="font-medium">{item.title}</div>
                  <p className="text-gray-600">가격: {item.price}</p>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-24 h-24 object-cover mt-2"
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
