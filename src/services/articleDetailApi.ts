import { Article } from '../data/Articles';

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://api.worldnewsapi.com';

interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  news: {
    id: string;
    title: string;
    summary: string;
    image: string;
    publish_date: string;
    url: string;
    text: string;
  }[];
}

const options = {
  method: 'GET',
  headers: {
    'x-api-key': apiKey,
  },
};

export const fetchArticle = async (id: string): Promise<Article[]> => {
  const url = `${BASE_URL}/retrieve-news?ids=${id}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Klaida užklausos metu: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    const articles = data.news;

    if (articles.length === 0) {
      throw new Error('Straipsniu nerasta');
    }

    console.log(articles);
    return articles.map((data) => ({
      id: data.id,
      title: data.title,
      content: data.text,
      snippet: data.summary,
      image: data.image,
      publishDate: data.publish_date || '',
      link: data.url,
    }));

  } catch (error) {
    console.error(error);
    throw error;
  }
};
