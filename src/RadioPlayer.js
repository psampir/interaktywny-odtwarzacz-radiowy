import React, { useState, useRef, useEffect } from 'react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [volume, setVolume] = useState(0.5);
  const [station, setStation] = useState('http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx');
  const [location, setLocation] = useState(null);
  const [browserInfo, setBrowserInfo] = useState({
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
  });
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(station);
    audioRef.current.preload = 'none';
    audioRef.current.volume = volume;
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [station]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleStationChange = (event) => {
    setStation(event.target.value);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current = new Audio(event.target.value);
      audioRef.current.volume = volume;
      audioRef.current.play();
    } else {
      audioRef.current = new Audio(event.target.value);
      audioRef.current.volume = volume;
    }
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Antyradio</h2>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pauza' : 'Odtwórz'}
      </button>
      <div>
        <label htmlFor="stations">Wybierz stację: </label>
        <select id="stations" onChange={handleStationChange} value={station}>
          <option value="http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx">Antyradio</option>
          <option value="https://17653.live.streamtheworld.com/WABCAMAAC.aac/;">77 WABC</option>
          <option value="https://auds1.intacs.com/weeradioonline;">Wee Radio</option>
        </select>
      </div>
      <div>
        <label htmlFor="volume">Głośność: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="date-time">
        <p>Data: {currentDateTime.toLocaleDateString()}</p>
        <p>Godzina: {currentDateTime.toLocaleTimeString()}</p>
      </div>
      <div className="location-info">
        {location ? (
          <p>Twoja lokalizacja: {location.latitude}, {location.longitude}</p>
        ) : (
          <p>Uzyskiwanie lokalizacji...</p>
        )}
      </div>
      <div className="browser-info">
        <p>Przeglądarka: {browserInfo.appName}</p>
        <p>Wersja: {browserInfo.appVersion}</p>
        <p>User Agent: {browserInfo.userAgent}</p>
      </div>
    </div>
  );
};

export default RadioPlayer;