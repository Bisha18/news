import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';

function Newsboard({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Replace with actual API key or use the environment variable
      const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${apiKey}`;

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
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span>News <span className="text-danger">{category}</span></span>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((news, index) => (
            <Newsitem 
              key={index} 
              title={news.title} 
              description={news.description} 
              src={news.image}  // Use 'image' instead of 'urlToImage'
              url={news.url} 
              publishedAt={news.publishedAt} // Adding publishedAt to display the date
            />
          ))
        )
      )}
    </div>
  );
}

export default Newsboard;
