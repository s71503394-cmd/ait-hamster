import React, { useState } from 'react';
import { useGameStore } from '@/services/gameStore';

interface FloatingText {
  id: number;
  value: number;
  x: number;
  y: number;
}

export const HamsterButton: React.FC = () => {
  const { click, getClickPower } = useGameStore();
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [textId, setTextId] = useState(0);
  const clickPower = getClickPower();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    click();

    const newId = textId;
    setTextId(textId + 1);
    setFloatingTexts(prev => [...prev, { id: newId, value: clickPower, x, y }]);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newId));
    }, 1000);
  };

  return (
    <div className="relative w-full flex justify-center items-center py-8">
      <div
        onClick={handleClick}
        className="relative w-40 h-40 md:w-48 md:h-48 cursor-pointer transform transition-transform hover:scale-110 active:scale-95"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 shadow-2xl flex items-center justify-center text-8xl md:text-9xl hover:shadow-orange-500/50 hover:shadow-2xl transition-all">
          🐹
        </div>

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 opacity-0 hover:opacity-20 blur-2xl transition-opacity" />

        {floatingTexts.map(text => (
          <div
            key={text.id}
            className="absolute pointer-events-none font-bold text-xl md:text-2xl text-orange-500"
            style={{
              left: text.x,
              top: text.y,
              animation: `floatUp 1s ease-out forwards`,
            }}
          >
            +{text.value}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};