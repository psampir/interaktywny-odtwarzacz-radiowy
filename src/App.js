import React, { useState } from 'react';
import RadioPlayer from './RadioPlayer';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const handleAccept = () => {
    setShowPopup(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Radio Internetowe. Wszelkie prawa zastrzeżone.</p>
      </footer>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Polityka Prywatności</h2>
            <p>
              Ta strona wykorzystuje pliki cookie oraz zbiera dane geolokalizacyjne w celu poprawy jakości usług.
              Kontynuując korzystanie z tej strony, wyrażasz zgodę na przetwarzanie tych danych.
            </p>
            <button onClick={handleAccept}>Akceptuję</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;