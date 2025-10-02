import { useState } from "react"
import Layout from "./pages/layoutView";
import Home from './pages/homeView';
import Swipe from './pages/swipeView';
import Customize from "./pages/customizeView";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const navigateWithTags = (page: string, tags:string[]) => {
    setSelectedTags(tags);
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={setCurrentPage} />;
      case 'swipe':
        return <Swipe navigate={setCurrentPage } selectedTags={selectedTags}/>;
      case 'customize':
        return <Customize navigate={navigateWithTags} />;
      default:
        return <Home navigate={setCurrentPage} />;
    }
  };

  return <Layout>{renderContent()}</Layout>;
}