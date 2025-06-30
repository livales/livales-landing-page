
import React, { useEffect, useRef, useState } from 'react';

const MemoryJarMockup = () => {
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
      className="interactive-mockup relative max-w-sm mx-auto"
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

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 card-shadow">
        {/* Phone frame */}
        <div className="bg-livales-dark h-2 w-full"></div>
        
        {/* Status bar */}
        <div className="bg-white px-6 py-3 flex justify-between items-center text-xs text-gray-600">
          <span className="font-semibold">9:41</span>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-livales-green rounded-sm"></div>
          </div>
        </div>
        
        {/* App content */}
        <div className="px-6 py-8 bg-gradient-to-br from-green-50 to-white">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-livales-dark mb-2">Memory Jar</h3>
            <p className="text-sm text-gray-600 font-medium">Kenangan Bersama</p>
          </div>
          
          {/* Memory cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-pink-600 text-lg">❤️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-livales-dark mb-1">First date di café kecil itu ❤️</p>
                  <p className="text-xs text-gray-500 font-medium">2 hari yang lalu</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-green-600 text-lg">🚗</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-livales-dark mb-1">Spontan road trip ke Bandung!</p>
                  <p className="text-xs text-gray-500 font-medium">1 minggu yang lalu</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">👨‍🍳</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-livales-dark mb-1">Masak berdua untuk pertama kali 👨‍🍳</p>
                  <p className="text-xs text-gray-500 font-medium">2 minggu yang lalu</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🎉</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-livales-dark mb-1">Anniversary ke-1 di restoran favorit</p>
                  <p className="text-xs text-gray-500 font-medium">1 bulan yang lalu</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add memory button */}
          <button className="w-full mt-6 bg-livales-green hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            + Tambah Kenangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryJarMockup;
