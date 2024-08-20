import React, { useState, useEffect } from 'react';

// Inline CSS styles
const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '1000px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
    marginTop: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  article: {
    borderBottom: '1px solid #e0e0e0',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  articleHover: {
    backgroundColor: '#f1f1f1',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#1a73e8',
    lineHeight: '1.3',
  },
  description: {
    margin: '0 0 15px',
    color: '#555',
    lineHeight: '1.6',
  },
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#0a56c2',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  // Responsive styles
  '@media (max-width: 768px)': {
    container: {
      padding: '10px',
    },
    heading: {
      fontSize: '2rem',
    },
    title: {
      fontSize: '1.5rem',
    },
    description: {
      fontSize: '1rem',
    },
  },
  '@media (max-width: 480px)': {
    heading: {
      fontSize: '1.5rem',
    },
    title: {
      fontSize: '1.25rem',
    },
    description: {
      fontSize: '0.9rem',
    },
  },
};

const fetchTechNews = async () => {
  const apiKey = 'cc930e770cf84054b30c168aaa9a6a8e'; // Your actual API key
  const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      return data.articles;
    } else {
      throw new Error('Error fetching news');
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const TechNews = () => {
  const [articles, setArticles] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const getTechNews = async () => {
      const news = await fetchTechNews();
      setArticles(news);
    };

    getTechNews();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Latest Tech News</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div
            key={index}
            style={{
              ...styles.article,
              ...(hoveredIndex === index ? styles.articleHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={styles.image}
              />
            )}
            <h3 style={styles.title}>{article.title}</h3>
            <p style={styles.description}>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.link,
                ...(hoveredIndex === index ? styles.linkHover : {}),
              }}
            >
              Read more
            </a>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No news available</p>
      )}
    </div>
  );
};

export default TechNews;
