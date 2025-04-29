import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Article } from '../data/Articles';
import { fetchArticles } from '../services/articlesApi';

const Articles: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]); // Fixed state initialization for articles
  const [error, setError] = useState<string | null>(null); // Added error state to handle errors
  const navigate = useNavigate();

  useEffect(() => {

    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        console.log(data);
        setArticles(data);
      } catch (err) {
        setError('Nepavyko gauti straipsnių');
      } finally {
        setLoading(false);
      }
    };
    loadArticles(); 
  }, []);

  const handleArticleClick = (id: string) => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Helmet>
        <title>SmokeControl - Straipsniai</title>
        <meta name="description" content="Straipsniai apie rūkymą ir jo žalą sveikatai" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Straipsniai apie rūkymą</h1>

        <div className="stats shadow bg-base-200 mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Rūkančių žmonių pasaulyje</div>
            <div className="stat-value">1.3 milijardo</div>
            <div className="stat-desc">Šaltinis: PSO 2022</div>
          </div>
          <div className="stat">
            <div className="stat-title">Mirčių per metus</div>
            <div className="stat-value">8 milijonai</div>
            <div className="stat-desc">Dėl su rūkymu susijusių ligų</div>
          </div>
          <div className="stat">
            <div className="stat-title">Rūkančių Lietuvoje</div>
            <div className="stat-value">28%</div>
            <div className="stat-desc">Lyginant su ES vidurkiu: 24%</div>
          </div>
        </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              snippet={article.content}
              imageSrc={article.image}
              link={article.link}
              onClick={handleArticleClick}
            />
          ))}
        </div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

    </div>
  );
};

const ArticleCard: React.FC<{
  id: string;
  title: string;
  snippet: string;
  imageSrc: string;
  link: string
  onClick: (id: string) => void;
}> = ({ id, title, snippet, imageSrc, onClick }) => {
  return (
    <div className="card bg-base-300 shadow-xl h-full flex flex-col">
      <figure className="h-48 overflow-hidden relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover absolute inset-0"
        />
      </figure>
      <div className="card-body flex flex-col flex-grow">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <p className="flex-grow line-clamp-3">{snippet}</p>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary"
            onClick={() => onClick(id)}
          >
            Skaityti daugiau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles;
