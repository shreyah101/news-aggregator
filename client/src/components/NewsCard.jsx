import React from 'react';
import BookmarkButton from './BookmarkButton';

const NewsCard = ({ article, onRemove }) => {
  const { title, description, url, urlToImage, source, publishedAt, category, _id } = article;
  const isSavedBookmark = !!_id;

  const defaultImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full">
      <img 
        src={urlToImage || defaultImage} 
        alt={title} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = defaultImage; }}
      />
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full uppercase tracking-wider">
            {category || 'News'}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description || 'No description available for this article.'}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
          <span className="text-xs text-gray-500 truncate max-w-[120px]">
            {source?.name || 'Unknown Source'}
          </span>
          <div className="flex items-center space-x-3">
            <BookmarkButton article={article} isSaved={isSavedBookmark} onRemove={onRemove} />
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
