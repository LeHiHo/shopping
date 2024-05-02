interface ProductSearchResult {
  title: string;
  price: string;
  image_url: string;
}

interface ProductsSearchResponse {
  data?: {
    coupang?: ProductSearch_Result[];
    ali?: ProductSearch_Result[];
  };
  message?: string;
  redirectUri?: string;
}
