import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';

function Newsboard({ category }) {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error('No articles found or error in data structure');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span>News <span className="text-danger">{category}</span></span>
      </h2>
      {articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        articles.map((news, index) => (
          <Newsitem 
            key={index} 
            title={news.title} 
            description={news.description} 
            src={news.urlToImage} 
            url={news.url} 
          />
        ))
      )}
    </div>
  );
}

export default Newsboard;
