import React, { useEffect } from 'react';
import { GamePage } from '@/pages/GamePage';
import './App.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
      }
    };
  }, []);

  return (
    <div className="bg-darker">
      <GamePage />
    </div>
  );
}

export default App;