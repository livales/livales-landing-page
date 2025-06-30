
import React, { useEffect, useRef, useState } from 'react';

const ComingSoonGraphic = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Array<{x: number, y: number, id: number}>>([]);

  useEffect(() => {
    const mockup = mockupRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!mockup || !cursorDot) return;

    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mockup.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cursorDot.style.left = `${x - 6}px`;
      cursorDot.style.top = `${y - 6}px`;
      cursorDot.style.opacity = '1';

      // Add trail
      setTrails(prev => {
        const newTrail = { x: x - 3, y: y - 3, id: trailId++ };
        const updated = [...prev, newTrail].slice(-8); // Keep last 8 trails
        
        // Remove trail after animation
        setTimeout(() => {
          setTrails(current => current.filter(trail => trail.id !== newTrail.id));
        }, 500);
        
        return updated;
      });
    };

    const handleMouseLeave = () => {
      cursorDot.style.opacity = '0';
      setTrails([]);
    };

    mockup.addEventListener('mousemove', handleMouseMove);
    mockup.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mockup.removeEventListener('mousemove', handleMouseMove);
      mockup.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={mockupRef}
      className="interactive-mockup relative max-w-md mx-auto"
    >
      <div ref={cursorDotRef} className="cursor-dot opacity-0"></div>
      
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: (8 - index) / 8,
            transform: `scale(${(8 - index) / 8})`,
            animation: `fade-out 0.5s ease-out forwards`
          }}
        />
      ))}

      <div className="bg-gradient-to-br from-green-100 to-white rounded-3xl p-8 shadow-2xl border border-gray-200 card-shadow">
        <div className="text-center space-y-6">
          {/* Controllers illustration */}
          <div className="flex justify-center space-x-4">
            <div className="relative">
              <div className="w-20 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-lg transform rotate-12 opacity-90">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs">🎮</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-20 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-lg transform -rotate-12 opacity-90">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs">🎯</span>
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-green-300 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <h3 className="relative text-4xl font-black text-gradient">COMING SOON</h3>
          </div>
          
          {/* Features preview */}
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-livales-dark">Interactive Couple Challenges</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-livales-dark">Personality Discovery Quizzes</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-livales-dark">Fun Date Night Games</span>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="pt-4">
            <div className="flex justify-center space-x-2 mb-3">
              <span className="text-sm font-bold text-gray-700">Development Progress</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div className="bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 h-3 rounded-full animate-pulse shadow-lg" style={{ width: '65%' }}></div>
            </div>
            <div className="text-center mt-3">
              <span className="text-sm font-bold text-gray-700">65% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonGraphic;
