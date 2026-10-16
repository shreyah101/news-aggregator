import React from 'react';
import BookmarkButton from './BookmarkButton';
import { ExternalLink, Clock } from 'lucide-react';

const NewsCard = ({ article, onRemove }) => {
  const { title, description, url, urlToImage, source, publishedAt, category, _id } = article;
  const isSavedBookmark = !!_id;

  const defaultImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Today';

  // Calculate estimated reading time for clean editorial feel
  const wordsCount = ((title || '') + ' ' + (description || '')).split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordsCount / 40) + 1);

  return (
    <article className="group bg-white rounded-2xl border border-[#EBE3D7] shadow-cozy-sm hover:shadow-cozy-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      {/* Decorative top ribbon accent on hover */}
      <div className="h-1 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#E07A5F] group-hover:to-[#D4A017] transition-all duration-300" />

      {/* Article Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-[#F5EFE6]">
        <img
          src={urlToImage || defaultImage}
          alt={title || 'News story'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => { e.target.src = defaultImage; }}
          loading="lazy"
        />
        
        {/* Subtle warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          {/* Category Stamp Badge */}
          <span className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2B231D] shadow-cozy-sm border border-[#EBE3D7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
            <span className="capitalize">{category || 'News'}</span>
          </span>

          {/* Quick Bookmark Button positioned on top of the image */}
          <div className="pointer-events-auto">
            <BookmarkButton article={article} isSaved={isSavedBookmark} onRemove={onRemove} />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Meta Row: Date & Reading Time */}
        <div className="flex items-center gap-3 text-xs text-[#A8988B] mb-2.5 font-medium">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#736257]">
            <Clock className="w-3.5 h-3.5 stroke-[1.8] text-[#E07A5F]" />
            {readTimeMinutes} min read
          </span>
        </div>

        {/* Title: Fraunces Serif for warm editorial charm */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B231D] group-hover:text-[#C65D42] transition-colors duration-200 mb-2 line-clamp-2 leading-snug">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>

        {/* Description: High legibility cinnamon body */}
        <p className="text-[#6E5D53] text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {description || 'Open full story to read the complete article, updates, and analysis.'}
        </p>

        {/* Footer row: Source & Read More CTA */}
        <div className="flex justify-between items-center pt-3.5 border-t border-[#F5EFE6] mt-auto">
          {/* Source with cute press icon */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#736257] truncate max-w-[150px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
            <span className="truncate">{source?.name || 'Dispatch'}</span>
          </div>

          {/* Read Story link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C65D42] hover:text-[#943C25] px-2.5 py-1.5 rounded-lg hover:bg-[#FAECE5] transition-colors group/link"
          >
            <span>Read Story</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
