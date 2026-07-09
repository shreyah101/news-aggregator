import React from 'react';
import BookmarkButton from './BookmarkButton';

const NewsCard = ({ article, onRemove }) => {
  const { title, description, url, urlToImage, source, publishedAt, category, _id } = article;
  const isSavedBookmark = !!_id;

  const defaultImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Article Image */}
      <div className="relative overflow-hidden">
        <img
          src={urlToImage || defaultImage}
          alt={title}
          className="w-full h-44 sm:h-48 object-cover"
          onError={(e) => { e.target.src = defaultImage; }}
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        {/* Category + Date row */}
        <div className="flex justify-between items-center mb-2 gap-2">
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full uppercase tracking-wide flex-shrink-0">
            {category || 'News'}
          </span>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {description || 'No description available for this article.'}
        </p>

        {/* Footer row */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto gap-2">
          <span className="text-xs text-gray-400 truncate min-w-0">
            {source?.name || 'Unknown Source'}
          </span>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <BookmarkButton article={article} isSaved={isSavedBookmark} onRemove={onRemove} />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 whitespace-nowrap"
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
