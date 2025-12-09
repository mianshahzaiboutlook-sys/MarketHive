import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";

const Carousel = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide only when there are at least 2 items
  useEffect(() => {
    if (!items || items.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items]);

  const next = () => {
    if (!items || items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    if (!items || items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md">
      <div
        className="flex transition-transform duration-700 h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex-none w-full h-full">
              <img
                src={item}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="24">Image not available</text></svg>';
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex-none w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No images</span>
          </div>
        )}
      </div>

      {/* Left Button */}
      <button
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/40 text-white px-3 py-1 rounded-full z-20"
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Right Button */}
      <button
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/40 text-white px-3 py-1 rounded-full z-20"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;

