interface Product {
  app_sale_price: string;
  original_price: string;
  product_detail_url: string;
  product_small_image_urls: string[];
  second_level_category_name: string;
  target_sale_price: string;
  second_level_category_id: number;
  discount: string;
  product_main_image_url: string;
  first_level_category_id: number;
  target_sale_price_currency: string;
  target_app_sale_price_currency: string;
  tax_rate: string;
  original_price_currency: string;
  shop_url: string;
  target_original_price_currency: string;
  product_id: string;
  target_original_price: string;
  product_video_url: string;
  first_level_category_name: string;
  promotion_link: string;
  sku_id: string;
  evaluate_rate: string;
  shop_name: string;
  sale_price: string;
  product_title: string;
  hot_product_commission_rate: string;
  shop_id: string;
  app_sale_price_currency: string;
  sale_price_currency: string;
  lastest_volume: number;
  target_app_sale_price: string;
  commission_rate: string;
}

interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  products: {
    product: Product[];
  };
}


const apiKey = import.meta.env.VITE_ALIEXPRESS_API_KEY;
const BASE_URL = 'https://aliexpress-true-api.p.rapidapi.com'; // URL for RapidAPI
const RAPIDAPI_HOST = 'aliexpress-true-api.p.rapidapi.com';

// Function to format keywords into a string
const formatKeywords = (keywords: string[]): string => {
  return keywords.join(',');
};

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey!,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
};

// Function to fetch products based on savings and keywords
export const fetchProductsBySavings = async (
  savings: number,
  keywords: string[]
): Promise<{ id: string; title: string; price: number; image: string; url: string }[]> => {
  const formattedKeywords = formatKeywords(keywords);

  // Build URL for the request with parameters
  const url = `${BASE_URL}/api/v3/products?page_no=1&ship_to_country=LT&keywords=${formattedKeywords}&target_currency=EUR&target_language=EN&page_size=50&sort=SALE_PRICE_DESC`;

  try {
    const response = await fetch(url, options);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    if (data.products.product.length > 0) {
      const filtered = data.products.product
        .map((item) => ({
          id: item.product_id,
          title: item.product_title,
          price: parseFloat(item.target_sale_price),
          image: item.product_main_image_url,
          url: item.product_detail_url,
        }))
        .filter((product) => product.price <= savings); // Only include products within the savings amount
    
      console.log(filtered);
      return filtered; // Return the filtered product list
    } else {
      throw new Error('No products found or invalid data format');
    }    
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Failed to fetch product offers');
  }
};
