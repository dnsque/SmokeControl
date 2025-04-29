import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Article } from '../data/Articles';
import { fetchArticle } from '../services/articleDetailApi';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        if (!id) {
          setError('Nenurodytas straipsnio ID');
          setLoading(false);
          return;
        }

        const articles = await fetchArticle(id); 

        if (articles && articles.length > 0) {
          setArticle(articles[0]); 
        } else {
          setError('Straipsnis nerastas');
        }
      } catch (err) {
        setError('Nepavyko gauti straipsnio duomenų');
      }finally {
          setLoading(false);
        }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Helmet>
          <title>SmokeControl - Straipsnis nerastas</title>
        </Helmet>
        <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error || 'Straipsnis nerastas'}</span>
          </div>
        </div>
        <Link to="/articles" className="btn btn-primary mt-4">
          Grįžti į straipsnių sąrašą
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Helmet>
        <title>SmokeControl - {article.title}</title>
        <meta name="description" content={article.snippet} />
      </Helmet>

      <div className="mb-4">
        <Link to="/articles" className="btn btn-outline btn-sm">
          ← Grįžti į straipsnių sąrašą
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Publikuota: {new Date(article.publishDate).toLocaleDateString()}</span>
        </div>

        <div className="max-h-96 overflow-hidden rounded-lg mb-6">
          <img 
            src={article.image || 'https://via.placeholder.com/150'} 
            alt={article.title} 
            className="w-full object-cover"
          />
        </div>

        <div className="article-content">
          {article.content
            ? article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            : <p>{article.snippet}</p> }
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
