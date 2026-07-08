const axios = require('axios');
const fs = require('fs');
const path = require('path');

const sampleNewsPath = path.join(__dirname, '../data/sample_news.json');

// Helper function to read sample news
const getSampleNews = (category = null, query = null) => {
  try {
    const rawData = fs.readFileSync(sampleNewsPath);
    let data = JSON.parse(rawData);

    if (category) {
      data = data.filter(article => article.category && article.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      data = data.filter(article => 
        (article.title && article.title.toLowerCase().includes(lowerQuery)) || 
        (article.description && article.description.toLowerCase().includes(lowerQuery))
      );
    }

    return data;
  } catch (error) {
    console.error('Error reading sample news:', error);
    return [];
  }
};

// Helper function to fetch from NewsAPI with fallback
const fetchNews = async (url, category = null, query = null) => {
  const apiKey = process.env.NEWS_API_KEY;
  
  if (!apiKey || apiKey === 'your_news_api_key_here') {
    console.log('No valid NewsAPI key found, using sample data.');
    return getSampleNews(category, query);
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (response.data.status === 'ok') {
      // Map standard NewsAPI response to our format
      return response.data.articles.map(article => ({
        ...article,
        category: category || 'General' // Assign a category if known, else General
      }));
    } else {
       console.log('NewsAPI returned non-ok status, using sample data.');
       return getSampleNews(category, query);
    }
  } catch (error) {
    console.error('NewsAPI fetch error:', error.message, 'falling back to sample data.');
    return getSampleNews(category, query);
  }
};

// @desc    Get latest news
// @route   GET /api/news
// @access  Public
const getNews = async (req, res) => {
  const url = 'https://newsapi.org/v2/top-headlines?country=us';
  const news = await fetchNews(url);
  res.json(news);
};

// @desc    Get news by category
// @route   GET /api/news/category/:category
// @access  Public
const getNewsByCategory = async (req, res) => {
  const { category } = req.params;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
  const news = await fetchNews(url, category);
  res.json(news);
};

// @desc    Search news
// @route   GET /api/news/search
// @access  Public
const searchNews = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}`;
  const news = await fetchNews(url, null, q);
  res.json(news);
};

module.exports = { getNews, getNewsByCategory, searchNews };
