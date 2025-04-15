import React, { useState, useEffect } from 'react';
import { fetchProductsBySavings } from '../services/aliexpressApi';

interface SavingsProductSuggestionsProps {
  savings: number;
}

const SavingsProductSuggestions: React.FC<SavingsProductSuggestionsProps> = ({ savings }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsBySavings(savings);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Nepavyko gauti prekių pasiūlymų');
      } finally {
        setLoading(false);
      }
    };

    if (savings > 0) {
      loadProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [savings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  if (products.length === 0) {
    if (savings <= 0) {
      return null; // Don't show anything if there are no savings yet
    }
    return (
      <div className="mt-4">
        <p className="text-sm">Kol kas neturime jums pasiūlymų, taupykite toliau!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Ką galite nusipirkti už sutaupytus {savings.toFixed(2)}€:</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="h-48 w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x300?text=AliExpress";
                }}
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  {product.discount}
                </div>
              )}
            </figure>
            <div className="card-body p-4">
              <h4 className="card-title text-sm line-clamp-2" title={product.title}>{product.title}</h4>
              
              <div className="flex items-center justify-between mt-2">
                <p className="font-bold text-lg text-primary">{product.price.toFixed(2)}€</p>
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              {product.orders && (
                <p className="text-xs text-gray-500 mt-1">Užsakymų: {product.orders.toLocaleString()}</p>
              )}
              
              <div className="card-actions justify-end mt-2">
                <a 
                  href={product.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-sm"
                >
                  Pirkti dabar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs mt-4 text-gray-500 bg-base-200 p-3 rounded-lg">
        <p className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Produktų kainos ir prieinamumas gali keistis. Kainos nurodytos be siuntimo mokesčių.
        </p>
      </div>
    </div>
  );
};

export default SavingsProductSuggestions; 