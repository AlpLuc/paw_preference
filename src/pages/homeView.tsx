import { type Navigate } from "../types";

export default function Home({ navigate }:Navigate) { // Accepts navigate prop for routing
  const handleStart = () => {
    navigate('swipe');
  };

  const handleCustomize = () => {
    navigate('customize');
  };

  return (
    // Central container for the Home screen content
    <div className="max-w-xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center p-8 sm:p-12 bg-white rounded-3xl shadow-xl border-4 border-soft-pink animate-pop-in">
        
        {/* Main Heading/Slogan */}
        <h2 className="text-brown-800 text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 animate-slide-up">
          Looking for your purrfect match?
        </h2>
        
        {/* Sub-Text */}
        <p className="text-brown-700 text-lg sm:text-xl mb-8 sm:mb-10 animate-pop-delay-1">
          Swipe now to find your new best friend!
        </p>

        {/* Action Buttons - Responsive Layout */}
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Primary Action: Start */}
          <button
            onClick={handleStart}
            className="flex-1 py-4 px-6 rounded-xl text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 bg-soft-pink text-brown-800 hover:bg-rose-300 border border-soft-pink hover:shadow-lg animate-pop-delay-2"
          >
            Start Swiping
          </button>
          
          {/* Secondary Action: Customize */}
          <button
            onClick={handleCustomize}
            className="flex-1 py-4 px-6 rounded-xl text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 border-2 border-brown-700 text-brown-700 hover:bg-beige hover:shadow-lg animate-pop-delay-3"
          >
            Customize Preference
          </button>
        </div>
      </div>
    </div>
  );
}