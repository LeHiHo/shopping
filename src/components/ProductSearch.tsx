"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { ProductsSearchAction } from "@/app/main/action";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

const ProductSearch = () => {
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
        <div className="flex m-20">
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
        <div className="flex m-20b justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items ? (
              items.map((item, index) => (
                <div key={index} className="flex flex-col items-center m-5">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-40 h-40 object-cover mt-2"
                  />
                  <div className="w-40 h-40 items-left">
                    <Badge>{item.site}</Badge>
                    <div className="font-medium">{item.title}</div>
                    <strong className="text-gray-600">{item.price}원</strong>
                  </div>
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

export default ProductSearch;
