import { useState, useRef, type ReactNode } from "react";

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeComplete?: () => void;
}

export default function SwipeableCard({ children, onSwipeLeft, onSwipeRight, onSwipeComplete }: SwipeableCardProps) {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef(null);

  const handleTouchStart = (e:React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e:React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping) return;
    const diff = e.touches[0].clientX - startX;
    setCurrentX(diff);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 100;
    
    if (currentX > swipeThreshold) {
      // Swiped right - Like
      animateSwipe('right');
    } else if (currentX < -swipeThreshold) {
      // Swiped left - Dislike
      animateSwipe('left');
    } else {
      // Reset position
      setCurrentX(0);
    }
    
    setIsSwiping(false);
  };

  const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setIsSwiping(true);
  };

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if (!isSwiping) return;
    const diff = e.clientX - startX;
    setCurrentX(diff);
  };

  const handleMouseUp = () => {
    if (!isSwiping) return;
    
    const swipeThreshold = 100;
    
    if (currentX > swipeThreshold) {
      animateSwipe('right');
    } else if (currentX < -swipeThreshold) {
      animateSwipe('left');
    } else {
      setCurrentX(0);
    }
    
    setIsSwiping(false);
  };

  const animateSwipe = (direction: string) => {
    const finalX = direction === 'right' ? 1000 : -1000;
    setCurrentX(finalX);
    
    setTimeout(() => {
      if (direction === 'right') {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
      onSwipeComplete?.();
      setCurrentX(0);
    }, 300);
  };

  const rotation = currentX * 0.1;
  const opacity = Math.max(0.5, 1 - Math.abs(currentX) / 200);

  return (
    <div className="absolute w-full overflow-hidden">
      <div className="p-4">
        {/* Swipe Indicators */}
        {currentX > 50 && (
          <div 
            className="absolute inset-y-0 right-0 w-2 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(34, 197, 94, 0.8), transparent)',
              boxShadow: '-10px 0 30px 10px rgba(34, 197, 94, 0.8)',
              opacity: Math.min(1, Math.abs(currentX) / 150)
            }}
          />
        )}
        {currentX < -50 && (
          <div 
            className="absolute inset-y-0 left-0 w-2 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(239, 68, 68, 0.6), transparent)',
              boxShadow: '10px 0 30px 10px  rgba(239, 68, 68, 0.6',
              opacity: Math.min(1, Math.abs(currentX) / 150)
            }}
          />
        )}
      <div
        ref={cardRef}
        className="w-full cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${currentX}px) rotate(${rotation}deg)`,
          opacity: opacity,
          transition: isSwiping ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
        
      </div>
      </div>
    </div>
  );
}