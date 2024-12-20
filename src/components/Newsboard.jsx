import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem';

function Newsboard({category}) {

  const [articles, setArticles] = useState([]);
  useEffect(()=>{
     const apiKey = import.meta.env.VITE_NEWS_API_KEY;
     let url1 = ` https://newsapi.org/v2/top-headlines/sources?category=businessapiKey=b1448eafb3144b1a8600dd4016ac29f0`
     let url2 = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`

      fetch(url2)
       .then(res=>res.json())
       .then(data=>setArticles(data.articles))
       .catch(err=>console.log(err))
     },[category]
  )
  
  return (
    <div>
      <h2 className='text-center'> Latest <span className=''>News</span></h2>
      {articles.map((news,index)=>{
          return <Newsitem key={index} title={news.title} description={news.description}
           src={news.urlToImage} url={news.url}/>
      })}
    </div>
  )
}

export default Newsboard