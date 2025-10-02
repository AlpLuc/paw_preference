import { useState } from 'react';
import {type Cat} from '../types/index';


export default function CatCard({ cat } : {cat : Cat}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    // Updated container to use flex-col and match screen height
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md flex flex-col h-[50dvh] sm:h-[50dvh] border-4 border-soft-pink hover:shadow-3xl transition-shadow duration-300">
      {/* Image Section */}
      {/* Updated image container to use flex-1 to fill available space */}
      <div className="relative w-full flex-1 bg-beige overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center animate-pop-in">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-soft-pink border-t-rose-400"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-cream">
            <div className="text-center p-6 animate-pop-in">
              <div className="text-7xl sm:text-8xl mb-4 animate-float">🐱</div>
              <p className="text-brown-700 font-medium text-base sm:text-lg">
                Image not available
              </p>
              <p className="text-brown-600 text-sm mt-2">
                But still adorable! ✨
              </p>
            </div>
          </div>
        ) : (
          <img 
            src={cat.url}
            alt={`Cat ${cat.id}`}
            // Image itself takes up full height and width of its container
            className={`w-full h-full object-contain transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Info Section */}
      {/* Info section has a fixed height, preventing the image from taking up too much space */}
      <div className="flex-none p-5 sm:p-6 bg-cream">
        <div className="flex-1">          
          <p className="text-sm text-brown-600 mb-3 font-semibold">
            About Me:
          </p>
          <div className="flex flex-wrap gap-2">
            {cat.tags.length > 0 ? (
              cat.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-soft-pink px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-soft-pink"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-brown-500 text-sm italic bg-beige px-3 py-1 rounded-full">
                No tags available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}