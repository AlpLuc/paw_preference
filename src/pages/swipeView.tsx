import { useState } from 'react';
import {useCats} from '../hooks/catHook'
import CatCard from '../component/cat'
import SwipeableCard from '../component/swipe';
import {type Cat} from '../types/index'
import { getTopTags } from '../utils/tagAnalysis';

interface SwipeProps {
  navigate: (page: string) => void;
  selectedTags: string[];
}

function Swipe({ navigate, selectedTags}:SwipeProps ) {
  const { cats, loading, error, refetch } = useCats(selectedTags);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [dislikedCats, setDislikedCats] = useState<Cat[]>([]);

  const handleSwipeLeft = () =>{
    setDislikedCats(prev => [...prev, cats[currentIndex]]);
  };

  const handleSwipeRight = () => {
    setLikedCats(prev => [...prev, cats[currentIndex]]);
  };

  const handleSwipeComplete = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleBackHome = () => {
    navigate('home');
  };

  const handleRestart = () => {
    refetch();
    setCurrentIndex(0);
    setDislikedCats([]);
    setLikedCats([]);
  }

  const currentCat = cats[currentIndex];
  const nextCat = cats[currentIndex + 1];

  if (loading){
    return (
      <div className=" relative h-[60dvh] flex items-center justify-center bg-cream">
        <div className="text-center animate-pop-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-soft-pink border-t-rose-400 mx-auto mb-4"></div>
          <p className="text-brown-700 text-lg font-medium">Gathering meows...</p>
        </div>
      </div>
    );
  }

  if(error){
    return (
      <div className="relative h-[60dvh] flex items-center justify-center bg-cream px-4">
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl animate-pop-in">
          <div className="text-5xl mb-4 text-center">😿</div>
          <h3 className="text-brown-800 font-bold text-xl mb-3 text-center">Oops!</h3>
          <p className="text-brown-700 mb-6 text-center">{error}</p>
          <button 
            onClick={refetch}
            className="w-full bg-soft-pink text-brown-800 font-semibold px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= cats.length) {
    const topTags = getTopTags(likedCats);
    return (
      <div className="h-full bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl animate-pop-in overflow-hidden">
          {/* Mobile: Vertical Layout */}
          <div className="block lg:hidden p-6 sm:p-10 max-h-[80vh] overflow-y-auto">
            <div className="text-6xl sm:text-7xl mb-4 text-center animate-float">🎉</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brown-800 mb-4 text-center animate-slide-up">
              All Done!
            </h2>
            <p className="text-brown-600 mb-6 text-center text-base sm:text-lg">
              You've reviewed all the cats.
            </p>
            
            <div className="space-y-3 sm:space-y-4 mb-6">
              <div className="bg-green-50 p-4 sm:p-5 rounded-xl border-2 border-green-200 animate-pop-delay-1">
                <p className="text-green-800 font-semibold text-center text-base sm:text-lg">
                  ❤️ Liked: {likedCats.length} cats
                </p>
              </div>
              <div className="bg-rose-50 p-4 sm:p-5 rounded-xl border-2 border-rose-200 animate-pop-delay-2">
                <p className="text-rose-800 font-semibold text-center text-base sm:text-lg">
                  ✕ Passed: {dislikedCats.length} cats
                </p>
              </div>
            </div>

            {topTags.length > 0 && (
              <div className="mt-6 bg-soft-pink p-5 sm:p-6 rounded-2xl border-2 border-soft-pink animate-pop-delay-3">
                <h3 className="text-lg sm:text-xl font-bold text-brown-800 mb-4 text-center">
                  Your Favorite Cat Types 🐱
                </h3>
                <div className="space-y-3">
                  {topTags.map((item, index) => (
                    <div 
                      key={item.tag}
                      className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl font-bold text-soft-pink">
                          #{index + 1}
                        </span>
                        <span className="font-semibold text-brown-800 capitalize text-sm sm:text-base">
                          {item.tag}
                        </span>
                      </div>
                      <span className="bg-soft-pink bg-opacity-20 text-brown-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {item.count} {item.count === 1 ? 'cat' : 'cats'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-3 mt-6 sm:mt-8">
              <button 
                onClick={handleRestart}
                className="w-full bg-soft-pink text-brown-800 font-bold px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                Start Over
              </button>
              <button
                onClick={handleBackHome}
                className="w-full bg-beige text-brown-800 font-semibold px-8 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:flex">
            {/* Left side - Stats */}
            <div className="w-1/2 p-10 flex flex-col justify-center">
              <div className="text-7xl mb-6 text-center animate-float">🎉</div>
              <h2 className="text-4xl font-bold text-brown-800 mb-4 text-center animate-slide-up">
                All Done!
              </h2>
              <p className="text-brown-600 mb-8 text-center text-lg">
                You've reviewed all the cats.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 animate-pop-delay-1">
                  <p className="text-green-800 font-semibold text-center text-lg">
                    ❤️ Liked: {likedCats.length} cats
                  </p>
                </div>
                <div className="bg-rose-50 p-6 rounded-xl border-2 border-rose-200 animate-pop-delay-2">
                  <p className="text-rose-800 font-semibold text-center text-lg">
                    ✕ Passed: {dislikedCats.length} cats
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleRestart}
                  className="w-full bg-soft-pink text-brown-800 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  Start Over
                </button>
                <button
                  onClick={handleBackHome}
                  className="w-full bg-beige text-brown-800 font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>

            <div className='w-1/500 bg-beige'></div>

            {/* Right side - Top Tags */}
            <div className="w-1/2 p-10 flex flex-col justify-center max-h-[100vh] overflow-y-auto">
              {topTags.length > 0 ? (
                <div>
                  <h3 className="text-2xl font-bold text-brown-800 mb-6 text-center">
                    Your Favorite Cat Types 🐱
                  </h3>
                  <div className="space-y-3">
                    {topTags.map((item, index) => (
                      <div 
                        key={item.tag}
                        className="flex items-center justify-between bg-white px-5 py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-soft-pink">
                            #{index + 1}
                          </span>
                          <span className="font-semibold text-brown-800 capitalize text-base">
                            {item.tag}
                          </span>
                        </div>
                        <span className="bg-soft-pink bg-opacity-20 text-brown-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item.count} {item.count === 1 ? 'cat' : 'cats'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-brown-600">
                  <div className="text-6xl mb-4">🐱</div>
                  <p className="text-lg">No favorite tags yet!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-md">
        {/* Icons above the card */}
        <div className="flex justify-between items-center mb-4 text-sm font-semibold text-gray-600 w-full max-w-sm mx-auto">
  
          <div className="flex items-center space-x-1"> 
            <div className="flex flex-col items-center">
              <span>&#x2190;</span> <span>SWIPE LEFT</span>
            </div>
            <div className="text-3xl">💔</div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="text-3xl">💓</div>
            <div className="flex flex-col items-center">
              <span>&#x2192;</span> <span>SWIPE RIGHT</span>
            </div>
          </div>
          
        </div>
        <div className="relative h-[45dvh] mb-8 w-full max-w-md">
          {/* Next card (background) */}
          {nextCat && (
            <div className="absolute w-full scale-95 transform">
              <CatCard  key={`next-${nextCat.id}`} cat={nextCat} />
            </div>
          )}

          {/* Current card (foreground) */}
          {currentCat && (
            <SwipeableCard
              
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeComplete={handleSwipeComplete}
            >
              <CatCard key={`current-${currentCat.id}`}   cat={currentCat} />
            </SwipeableCard>
          )}
        </div>
      </div>
    </div>
  )
}

export default Swipe