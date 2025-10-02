import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }:LayoutProps) {
  return (
    <div className="h-dvh flex flex-col bg-cream ">
      {/* Header with solid soft pink */}
      <header className="bg-soft-pink text-brown-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left animate-slide-up">
              <span className="inline-block animate-float">🐾</span> Paw & Preference
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Footer with dark brown */}
      <footer className="bg-brown-800 text-cream mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto text-center text-sm sm:text-base">
            <p className="font-medium">© 2025 Paw & Preference. All rights reserved.</p>
            <p className="mt-2 text-beige opacity-80 text-xs sm:text-sm">
              Find your purrfect match! 🐱
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}