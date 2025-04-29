interface Product {
  product_id: string;
  product_title: string;
  target_sale_price: string;
  product_main_image_url: string;
  product_detail_url: string;
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
const BASE_URL = 'https://aliexpress-true-api.p.rapidapi.com';
const RAPIDAPI_HOST = 'aliexpress-true-api.p.rapidapi.com';


const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey!,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
};

const formatKeywords = (keywords: string[]): string => keywords.join(',');


export const fetchProductsBySavings = async (
  savings: number,
  keywords: string[]
): Promise<{ id: string; title: string; price: number; image: string; url: string }[]> => {
  const formattedKeywords = formatKeywords(keywords);

  const url = `${BASE_URL}/api/v3/products?` +
  `page_no=1&` +
  `ship_to_country=LT&` +
  `keywords=${formattedKeywords}&` +
  `target_currency=EUR&` +
  `target_language=EN&` +
  `page_size=50&` +
  `sort=SALE_PRICE_DESC`;

  try {

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Klaida užklausos metu: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    const products = data?.products?.product || [];

    if (products.length === 0) {
      throw new Error('Produktu nerasta');
    }

    return products
      .map((item) => ({
        id: item.product_id,
        title: item.product_title,
        price: parseFloat(item.target_sale_price) || 0, 
        image: item.product_main_image_url,
        url: item.product_detail_url,
      }))
      .filter((product) => product.price <= savings);

  } catch (err) {
    console.error('Klaida užklausos metu:', err);
    throw new Error('Nepavyko gauti prekių pasiūlymų');
  }
};
