interface AliExpressProduct {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  url: string;
  discount?: string;
  orders?: number;
  rating?: number;
}

/**
 * Fetch products from AliExpress API based on savings amount
 * In a real implementation, this would connect to the actual AliExpress Affiliate API
 * For now, we're simulating the API response structure
 */
export const fetchProductsBySavings = async (savings: number): Promise<AliExpressProduct[]> => {
  try {
    // In a real implementation, this would be the actual API call:
    // const response = await fetch(`${API_CONFIG.baseUrl}/products?price_max=${savings}&sort=popular`, {
    //   headers: {
    //     "Authorization": `Bearer ${API_CONFIG.apiKey}`,
    //     "Content-Type": "application/json"
    //   }
    // });
    // const data = await response.json();
    // return data.products;
    
    // Simulate API response time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate API response with products within the user's price range
    return getProductsInPriceRange(savings);
  } catch (error) {
    console.error("Error fetching products from AliExpress API:", error);
    throw new Error("Failed to fetch products from AliExpress API");
  }
};

/**
 * Get products that match the price range
 * This simulates different product results based on the amount saved
 */
function getProductsInPriceRange(maxPrice: number): AliExpressProduct[] {
  // Full catalog of products with various price points
  const allProducts: AliExpressProduct[] = [
    {
      id: '1',
      title: 'Belaidės ausinės su triukšmo slopinimu',
      price: 25.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S0403de1efd504d2e8773343326d9b638j.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005020204023.html',
      discount: '-45%',
      orders: 2548,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Išmanusis laikrodis su pulso matuokliu',
      price: 39.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S063e5abf02cf4c02a0b827c9e3b4abe4E.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005004618100345.html',
      discount: '-30%',
      orders: 4921,
      rating: 4.5
    },
    {
      id: '3',
      title: 'Belaidis įkroviklis telefonui',
      price: 12.50,
      imageUrl: 'https://ae01.alicdn.com/kf/S71e7451c8c9c4a7f91cc2ee22a09b684M.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005003538024027.html',
      discount: '-50%',
      orders: 8742,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Vandeniui atsparus kalnų turizmo kuprinė',
      price: 45.00,
      imageUrl: 'https://ae01.alicdn.com/kf/Sb3d3e3ab9cb74a76be44f291fe25e571D.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005003694380642.html',
      discount: '-20%',
      orders: 1284,
      rating: 4.6
    },
    {
      id: '5',
      title: 'Nešiojamas Bluetooth garsiakalbis',
      price: 29.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S3fd2ddf53697428a82f0e2a3a99da8bcP.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005180092765.html',
      discount: '-35%',
      orders: 3562,
      rating: 4.4
    },
    {
      id: '6',
      title: 'Automatinė kavos mašina',
      price: 89.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S7d03580b81d64481a2e50b34be9b4d46Y.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005214796253.html',
      discount: '-15%',
      orders: 876,
      rating: 4.3
    },
    {
      id: '7',
      title: 'Nešiojamas oro valytuvas',
      price: 65.50,
      imageUrl: 'https://ae01.alicdn.com/kf/S9e9f44cfa0c34be087fc3d3f0e67c876n.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005004597264517.html',
      discount: '-25%',
      orders: 1423,
      rating: 4.2
    },
    {
      id: '8',
      title: 'LED šviestuvas namams',
      price: 18.75,
      imageUrl: 'https://ae01.alicdn.com/kf/S50dd7e2c6ca04df9a1f129c2a165ab48R.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005002981553533.html',
      discount: '-40%',
      orders: 5821,
      rating: 4.6
    },
    {
      id: '9',
      title: 'Mini projektorius namų kinui',
      price: 120.00,
      imageUrl: 'https://ae01.alicdn.com/kf/S32e0a66e08d54a5cb6c84fe9dd8a6d90e.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005003582266152.html',
      discount: '-10%',
      orders: 642,
      rating: 4.1
    },
    {
      id: '10',
      title: 'Išmanusis durų skambutis su kamera',
      price: 49.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S1a1e4a1a13794e3bb84bbf02c99d9b33l.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005004618153754.html',
      discount: '-20%',
      orders: 1975,
      rating: 4.4
    },
    {
      id: '11',
      title: 'Nešiojamas SSD diskas 1TB',
      price: 79.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S3dbe8b8a9025433c8ac79f04a8c7c9d0F.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005231856432.html',
      discount: '-25%',
      orders: 983,
      rating: 4.7
    },
    {
      id: '12',
      title: 'Elektroninė skaityklė',
      price: 99.99,
      imageUrl: 'https://ae01.alicdn.com/kf/S5ba5d86c0bdb495aaa8c6ee58a6548c6p.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005004712845632.html',
      discount: '-15%',
      orders: 762,
      rating: 4.5
    },
    {
      id: '13',
      title: 'Belaidė klaviatūra su mechaniniais jungikliais',
      price: 35.50,
      imageUrl: 'https://ae01.alicdn.com/kf/S247dbf0b80fe446ea2e4d5db5679dbe6U.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005104632476.html',
      discount: '-30%',
      orders: 2145,
      rating: 4.6
    },
    {
      id: '14',
      title: 'Kamera stebėjimui namie',
      price: 42.75,
      imageUrl: 'https://ae01.alicdn.com/kf/S5aa95cbae399439bb35f5d1ce29e1f33c.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005004892357432.html',
      discount: '-45%',
      orders: 3241,
      rating: 4.3
    },
    {
      id: '15',
      title: 'Išmanusis žiedas su NFC funkcija',
      price: 19.99,
      imageUrl: 'https://ae01.alicdn.com/kf/Sace7f8e9e82a47bbb5cdf5f8dd00b3c1v.jpg_640x640.jpg',
      url: 'https://www.aliexpress.com/item/1005005296743287.html',
      discount: '-60%',
      orders: 4875,
      rating: 4.4
    }
  ];
  
  // Filter products that the user can afford with their savings
  const affordableProducts = allProducts
    .filter(product => product.price <= maxPrice)
    // Sort by popularity (using orders as indicator)
    .sort((a, b) => (b.orders || 0) - (a.orders || 0));
  
  // Limit to 4 products maximum (can be adjusted)
  return affordableProducts.slice(0, 4);
}; 