const express = require('express');
const router = express.Router();
const { getNews, getNewsByCategory, searchNews } = require('../controllers/newsController');

router.get('/', getNews);
router.get('/search', searchNews); // Make sure search is before /category/:category
router.get('/category/:category', getNewsByCategory);

module.exports = router;
