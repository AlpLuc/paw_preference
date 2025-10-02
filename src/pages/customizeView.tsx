import { useCatTags } from '../hooks/catHook';
import { useState, useEffect } from 'react';

interface CustomizeProps {
  navigate: (page: string, tags: string[]) => void;
}

export default function Customize({ navigate }: CustomizeProps) {
  const { tags, loading, error } = useCatTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  
  // Define the minimum number of tags required
  const MIN_TAGS_REQUIRED = 5;

  useEffect(() => {
    if (tags) {
      if (searchTerm) {
        setFilteredTags(
          tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      } else {
        setFilteredTags(tags.slice(0, 15));
      }
    }
  }, [tags, searchTerm]);

  const handleTagClick = (tag:string) => {
    // Only allow adding tags if the limit hasn't been reached
    if (!selectedTags.includes(tag) && selectedTags.length < 10) { // Optional: Set a max limit
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove:string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleProceed = () => {
    if (selectedTags.length >= MIN_TAGS_REQUIRED) {
      navigate('swipe', selectedTags);
    }
    // No 'else' block needed, as the button will be disabled.
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center animate-pop-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-soft-pink border-t-rose-400 mx-auto mb-4"></div>
          <p className="text-brown-700 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-red-700 text-lg font-medium">Error loading tags.</p>
      </div>
    );
  }
  
  // Check if the proceed button should be disabled
  const isProceedDisabled = selectedTags.length < MIN_TAGS_REQUIRED;
  
  // Dynamically set button styles based on the disabled state
  const buttonClasses = `
    w-full md:w-auto px-6 py-3 rounded-lg font-bold text-lg 
    transition duration-300 ease-in-out
    ${isProceedDisabled 
      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
      : 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
    }
  `;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Select Your Tags 🏷️</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for tags..."
          className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <hr className="my-6" />

      {/* Selected Tags Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Selected Tags</h2>
        <div className="flex flex-wrap gap-2">
          {selectedTags.length > 0 ? (
            selectedTags.map(tag => (
              <span
                key={tag}
                className="flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-medium transition duration-300 ease-in-out"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-white hover:text-red-300 focus:outline-none"
                  aria-label={`Remove ${tag}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))
          ) : (
            <p className="text-gray-500 italic">No tags selected yet.</p>
          )}
        </div>
      </div>
      
      {/* Visual cue for tag count */}
      <div className="text-center mt-2 mb-4">
        <p className={`text-sm font-medium ${isProceedDisabled ? 'text-red-500' : 'text-green-500'}`}>
          {selectedTags.length} / {MIN_TAGS_REQUIRED} tags selected
        </p>
      </div>

      <hr className="my-6" />
      
      {/* Tags Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Available Tags</h2>
        <div className="flex flex-wrap gap-2">
          {filteredTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Button Section */}
      <div className="flex justify-center">
        <button
          onClick={handleProceed}
          disabled={isProceedDisabled}
          className={buttonClasses}
        >
          Proceed 🎉
        </button>
      </div>
    </div>
  );
}