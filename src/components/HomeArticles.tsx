import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../data/Articles';
import { fetchArticles } from '../services/articlesApi';

const HomeArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data.slice(0, 3)); // Только первые 3 статьи
      } catch (err) {
        setError('Nepavyko gauti straipsnių');
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="card bg-base-300 shadow-xl flex flex-col">
            <figure className="h-36 w-full overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex flex-col flex-grow p-4">
              <h2 className="card-title text-sm line-clamp-1">{article.title}</h2>
              <div className="card-actions mt-2 justify-end p-2">
                <Link to={`/articles/${article.id}`} className="btn btn-sm btn-primary">
                  Skaityti daugiau
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/articles" className="btn btn-secondary">
          Rodyti daugiau straipsnių
        </Link>
      </div>
    </div>
  );
};

export default HomeArticles;
