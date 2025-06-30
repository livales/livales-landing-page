
import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Heart shape */}
      <div className="floating-shape absolute top-1/4 left-1/4 w-16 h-16 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-livales-green">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      {/* Circle */}
      <div className="floating-shape absolute top-1/3 right-1/4 w-12 h-12 bg-green-300 rounded-full opacity-30"></div>
      
      {/* Triangle */}
      <div className="floating-shape absolute bottom-1/3 left-1/3 w-0 h-0 opacity-25"
           style={{
             borderLeft: '20px solid transparent',
             borderRight: '20px solid transparent',
             borderBottom: '35px solid #2ecc40'
           }}>
      </div>
      
      {/* Another circle */}
      <div className="floating-shape absolute top-1/2 right-1/3 w-8 h-8 bg-gray-300 rounded-full opacity-40"></div>
      
      {/* Star shape */}
      <div className="floating-shape absolute bottom-1/4 right-1/5 w-14 h-14 opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      {/* Organic blob */}
      <div className="floating-shape absolute top-1/5 right-1/2 w-20 h-20 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#2ecc40" d="M40.5,-47.6C54.8,-35.8,69.8,-25.5,74.2,-11.1C78.6,3.3,72.4,21.8,62.1,36.7C51.8,51.6,37.4,62.9,21.1,67.8C4.8,72.7,-13.4,71.2,-29.5,63.9C-45.6,56.6,-59.6,43.5,-66.8,27.2C-74,10.9,-74.4,-8.6,-68.9,-25.6C-63.4,-42.6,-52,-57.1,-37.6,-68.7C-23.2,-80.3,-5.8,-89,7.1,-97.8C20,-106.6,40,-115.5,54.5,-103.4"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingShapes;
