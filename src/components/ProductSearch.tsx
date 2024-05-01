"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsSearchAction } from "@/app/main/action";

const LoginPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const [items, setItems] = useState<any>();

  return (
    <>
      <form
        action={async () => {
          try {
            const result = await ProductsSearchAction(keyword);
            if (result?.data) {
              let combinedItems = [];
              if (result.data.coupang) {
                combinedItems = combinedItems.concat(result.data.coupang);
              }
              if (result.data.ali) {
                combinedItems = combinedItems.concat(result.data.ali);
              }
              setItems(combinedItems); // "coupang"과 "ali" 데이터를 합쳐서 상태로 설정
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
        <input
          type="text"
          placeholder="찾고 싶은 상품을 검색해보세요!"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
      <div>
        <div>상품검색결과</div>
        <div>
          {items ? (
            <div>
              {items.map((item, index) => (
                <div key={index}>
                  <div>{item.title}</div>
                  <p>가격: {item.price}</p>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            "검색 결과를 기다리는 중..."
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
