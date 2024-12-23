import React, { useState } from "react";
import "./App.css";
import imagesData from "./images.json"; // Import the JSON data

const categories = ["All", "Nature", "City", "Food"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 4;

  // Filter images based on the active category
  const filteredImages =
    activeCategory === "All"
      ? imagesData
      : imagesData.filter((image) => image.category === activeCategory);

  // Pagination Logic
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const paginatedImages = filteredImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>

      {/* Navigation Options */}
      <div className="nav-options">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(0); // Reset page to 0 when category changes
            }}
            className={activeCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        {paginatedImages.length > 0 ? (
          paginatedImages.map((image, index) => (
            <img key={index} src={image.src} alt={`${image.category} ${index + 1}`} />
          ))
        ) : (
          <p>No images available in this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredImages.length > imagesPerPage && (
        <div className="pagination">
          <button onClick={handlePrevious}>&#8592; Previous</button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button onClick={handleNext}>Next &#8594;</button>
        </div>
      )}
    </div>
  );
}

export default App;
