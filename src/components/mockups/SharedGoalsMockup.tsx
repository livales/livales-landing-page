
import React, { useEffect, useRef, useState } from "react";

const SharedGoalsMockup = () => {
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
        <div className="px-6 py-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-livales-dark mb-2">
              Tujuan Bersama
            </h3>
            <p className="text-sm text-gray-600 font-medium">Kamu & Dhara</p>
          </div>

          {/* Goal cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-livales-dark text-sm">
                  Workout Together
                </h4>
                <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold">
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                15/20 sessions completed
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-livales-dark text-sm">
                  Save for Vacation
                </h4>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  60%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Rp 12.000.000 / Rp 20.000.000
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-livales-dark text-sm">
                  Read 12 Books
                </h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  33%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: "33%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 font-medium">4/12 books completed</p>
            </div>
          </div>

          {/* Add new goal button */}
          <button className="w-full mt-6 bg-livales-green hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            + Tambah Tujuan Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedGoalsMockup;
