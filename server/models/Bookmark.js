const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    urlToImage: {
      type: String,
    },
    source: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
