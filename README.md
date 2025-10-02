# 🐾 Paw & Preference

A cat-swiping application built with React, Vite, and TailwindCSS. Swipe through adorable cat images, customize your preferences with tags, and discover your favorite feline types!

## ✨ Features

- **Swipe Interface**: Intuitive Tinder-like swipe mechanism for browsing cats
- **Tag-Based Filtering**: Customize your experience by selecting preferred cat tags
- **Responsive Design**: Fully responsive layout that works seamlessly on mobile and desktop
- **Tag Analytics**: View your most-liked cat types after completing a session
- **Smooth Animations**: Delightful micro-interactions and custom animations

## 🛠️ Technologies Used

### Core Framework
- **React 18**: Component-based UI library
- **Vite**: Next-generation frontend build tool for fast development
- **TypeScript**: Type-safe development for better code quality

### Styling & UI
- **TailwindCSS v4**: Utility-first CSS framework
- **Custom CSS Animations**: Hand-crafted animations (pop-in, slide-up, float)
- **Custom Font**: Handcaps typeface for playful typography
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### State Management
- **React Hooks**: useState, useEffect, useRef for local state management
- **Custom Hooks**: Reusable logic for API calls (useCats, useCatTags)

### API Integration
- **Fetch API**: Native browser API for HTTP requests
- **Custom API Service**: Abstracted service layer for clean data fetching
- **CATAAS API**: Cat as a Service API for fetching cat images ([Documentation](https://cataas.com/doc.html))
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🎨 UI/UX Design Approach

### Design Approach
The application embraces a warm, playful aesthetic inspired by cat cafés and pet adoption interfaces. The design prioritizes:

1. **Emotional Connection**: Soft, warm colors (soft pink, beige, cream) create an inviting atmosphere
2. **Intuitive Interactions**: Familiar swipe gestures reduce learning curve
3. **Delightful Feedback**: Animations and visual cues provide satisfying user feedback
4. **Accessibility**: High contrast text, clear button states, and semantic HTML

### Color Palette
```css
Soft Pink (#FFB6C1)  - Primary accent, headers, CTAs
Beige (#F5E6D3)      - Secondary backgrounds
Cream (#FFF8F0)      - Main background
Brown 700 (#5D4037)  - Text, borders
Brown 800 (#3E2723)  - Headings, footer
```

### Animation Strategy
- **Pop-in**: Entry animations for cards and modals (0.5s cubic-bezier)
- **Slide-up**: Text reveals with staggered delays
- **Float**: Subtle continuous motion for emojis
- **Swipe feedback**: Real-time visual indicators during card swipes

### Component Architecture
- **Atomic Design**: Reusable components (CatCard, SwipeableCard)
- **Layout Wrapper**: Consistent header/footer across all pages
- **View-based Routing**: Simple page navigation without router library
- **Separation of Concerns**: Hooks for data, components for presentation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/AlpLuc/paw_preference.git
cd paw-and-preference
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_BASE_URL=https://cataas.com
```

4. **Install required dependencies** (if not auto-installed)
```bash
npm install react react-dom
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npm install -D typescript @types/react @types/react-dom
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:3000` (configured in `vite.config.ts`)

**Note**: The application is configured to run on port 3000 and is accessible from any network interface (host: '0.0.0.0'), making it available for local network testing.

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
paw-and-preference/
├── src/
│   ├── assets/
│   │   └── font/
│   │       └── Handcaps.otf
│   ├── components/
│   │   ├── cat.tsx           # Cat card component
│   │   └── swipe.tsx         # Swipeable card wrapper
│   ├── hooks/
│   │   └── catHook.ts        # Custom hooks for API calls
│   ├── pages/
│   │   ├── homeView.tsx      # Landing page
│   │   ├── customizeView.tsx # Tag selection page
│   │   ├── swipeView.tsx     # Main swipe interface
│   │   └── layoutView.tsx    # Layout wrapper
│   ├── services/
│   │   └── catAPI.ts         # API service layer
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   └── tagAnalysis.ts    # Tag analytics utilities
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles & animations
│   └── main.tsx              # Entry point
├── .env                      # Environment variables
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🎯 Key Features Explained

### Swipe Mechanism
- Touch and mouse event support for cross-device compatibility
- Visual feedback with color gradients during swipe
- Smooth animations with CSS transforms
- Threshold-based swipe detection (100px)

### Tag Customization
- Search functionality for filtering available tags
- Minimum tag requirement (5 tags) before proceeding
- Visual counter showing progress toward minimum
- Selected tags displayed with remove functionality

### Analytics
- Tracks liked and disliked cats during session
- Calculates top tag preferences based on liked cats
- Displays ranked list of favorite cat types
- Responsive design for mobile and desktop views

## 🔧 Configuration

### TailwindCSS Custom Theme
Custom colors are defined in `index.css` using the `@theme` directive:
```css
@theme {
  --color-soft-pink: #FFB6C1;
  --color-beige: #F5E6D3;
  --color-cream: #FFF8F0;
  --color-brown-700: #5D4037;
  --color-brown-800: #3E2723;
}
```

### API Configuration
The application uses the CATAAS (Cat as a Service) API. Configure the base URL in `.env`:
```
VITE_BASE_URL=https://cataas.com
```

For more information about available endpoints and options, visit the [CATAAS API Documentation](https://cataas.com/doc.html).

## 🐛 Troubleshooting

**Issue**: Images not loading
- **Solution**: Check your internet connection and verify the CATAAS API is accessible

**Issue**: Tags not displaying
- **Solution**: Ensure the API endpoint `/api/tags` is reachable from your base URL

**Issue**: Animations not working
- **Solution**: Clear browser cache and ensure Tailwind CSS is properly configured

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---