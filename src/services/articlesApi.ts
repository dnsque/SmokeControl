import { Article } from '../data/Articles'; // Importing the correct interface

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://api.worldnewsapi.com'

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
  }[];
}

const options = {
  method: 'GET',
  headers: {
    'x-api-key': apiKey!,
  },
};

export const fetchArticles = async (): Promise<Article[]> => {
  var url = `${BASE_URL}/search-news?language=lt&text=r%C5%ABkymas`;

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
    console.log(articles)
    return articles.map((data) => ({
      id: data.id,
      title: data.title,
      content: '',
      snippet: data.summary,
      image: data.image,
      publishDate: data.publish_date || '',
      link: data.url 
    }));
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
