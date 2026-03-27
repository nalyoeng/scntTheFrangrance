import React, { useState, useEffect } from 'react';
import { Products } from '../productDetails';
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Products;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, [images.length]);

  return (
    <div className="relative w-[70%] h-[70vh] overflow-hidden rounded-lg shadow-lg m-auto">
      {/* The "Carousel Inner" equivalent */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img src={images[currentIndex].src} alt={images[currentIndex].name} className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>

      {/* Optional: Dot Indicators (since users usually like to see where they are) */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;