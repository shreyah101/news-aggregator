const Bookmark = require('../models/Bookmark');

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a bookmark
// @route   POST /api/bookmarks
// @access  Private
const addBookmark = async (req, res) => {
  const { title, url, urlToImage, source, publishedAt, description, category } = req.body;

  try {
    const existingBookmark = await Bookmark.findOne({ user: req.user._id, url });
    
    if (existingBookmark) {
      return res.status(400).json({ message: 'Article already bookmarked' });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      title,
      url,
      urlToImage,
      source,
      publishedAt,
      description,
      category
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
const removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await bookmark.deleteOne();
    res.json({ message: 'Bookmark removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBookmarks, addBookmark, removeBookmark };
