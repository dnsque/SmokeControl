import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { articles } from '../data/articles';
import { getGlobalSmokingStats } from '../services/statisticsApi';

interface StatsData {
    totalSmokers: string;
    annualDeaths: string;
    percentageAdultMen: string;
    percentageAdultWomen: string;
    percentageEU: string;
    percentageLithuania: string;
    yearOfData: string;
    source: string;
}

const Articles: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StatsData | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await getGlobalSmokingStats();
                if (statsResponse.success) {
                    setStats(statsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleArticleClick = (id: string) => {
        navigate(`/articles/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>SmokeControl - Straipsniai</title>
                <meta name="description" content="Straipsniai apie rūkymą ir jo žalą sveikatai" />
            </Helmet>
            
            <h1 className="text-3xl font-bold mb-6 text-center">Straipsniai apie rūkymą</h1>
            
            {/* Statistics Panel */}
            {stats && (
                <div className="stats shadow bg-base-200 mb-8 w-full">
                    <div className="stat">
                        <div className="stat-title">Rūkančių žmonių pasaulyje</div>
                        <div className="stat-value">{stats.totalSmokers}</div>
                        <div className="stat-desc">Šaltinis: {stats.source} ({stats.yearOfData})</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Mirčių per metus</div>
                        <div className="stat-value">{stats.annualDeaths}</div>
                        <div className="stat-desc">Dėl su rūkymu susijusių ligų</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Rūkančių Lietuvoje</div>
                        <div className="stat-value">{stats.percentageLithuania}</div>
                        <div className="stat-desc">Lyginant su ES vidurkiu: {stats.percentageEU}</div>
                    </div>
                </div>
            )}

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
                            content={article.summary}
                            imageSrc={article.imageSrc}
                            onClick={handleArticleClick}
                        />
                    ))}
                </div>
            )}
            
            <div className="mt-8 text-center">
                <Link to="/account" className="btn btn-primary">
                    Eiti į paskyrą
                </Link>
            </div>
        </div>
    );
};

const ArticleCard: React.FC<{
    id: string,
    title: string,
    content: string,
    imageSrc: string,
    onClick: (id: string) => void
}> = ({id, title, content, imageSrc, onClick}) => {
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
                <p className="flex-grow line-clamp-3">{content}</p>
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