import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
import "../styles/WeatherCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type Weather from "../models/Weather";

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const cities = city.trim();
    if (!cities) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const weatherDetails = await fetchWeather(cities);
      setWeather(weatherDetails);
    } catch (error) {
      setError("Failed to fetch weather details.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    setCity("");
    setWeather(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };
  
  return (
     <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-brand">
            <span className="navbar-logo">🌤️</span>
            <span>AeroVision </span>
          </a>
          <ul className="navbar-menu">
            <li>
              <a href="#" className="navbar-link">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                Forecast
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                Map
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <header className="header">
        <h1 className="header-title">Real-Time Weather Updates</h1>
        <p className="header-subtitle">
          Get accurate weather information for any city worldwide
        </p>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="cardContainer">
            <label className="visually-hidden" htmlFor="cityInput">
              City
            </label>
            <input
              id="cityInput"
              type="text"
              className="cityInput"
              placeholder="Enter city"
              aria-label="City name input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Searching..." : "🔎 Search"}
              </button>
              <button className="btn btn-outline" onClick={handleClear}>
                Clear
              </button>
            </div>

            {loading && <p className="loading">Loading weather info...</p>}
            {error && <div className="alert">{error}</div>}

            {weather && (
              <div className="weather-display">
                <div className="weather-header">
                  <h1 className="weather-city">{weather.location.name}</h1>
                  <p className="weather-country">{weather.location.country}</p>
                </div>

                <div className="weather-main">
                  <img
                    src={
                      weather.current.condition.icon?.startsWith("http")
                        ? weather.current.condition.icon
                        : `https:${weather.current.condition.icon}`
                    }
                    alt={weather.current.condition.text}
                    className="weather-icon"
                  />
                  <div className="weather-temp-container">
                    <div className="weather-temp">
                      {weather.current.temp_c}°
                    </div>
                    <div className="weather-condition">
                      {weather.current.condition.text}
                    </div>
                  </div>
                </div>

                <div className="weather-stats">
                  <div className="weather-stat">
                    <div className="weather-stat-icon">💧</div>
                    <div>
                      <div className="weather-stat-label">Humidity</div>
                      <div className="weather-stat-value">
                        {weather.current.humidity}%
                      </div>
                    </div>
                  </div>

                  <div className="weather-stat">
                    <div className="weather-stat-icon">🍃</div>
                    <div>
                      <div className="weather-stat-label">Wind Speed</div>
                      <div className="weather-stat-value">
                        {weather.current.wind_kph} km/h
                      </div>
                    </div>
                  </div>

                  <div className="weather-stat">
                    <div className="weather-stat-icon">🌆</div>
                    <div>
                      <div className="weather-stat-label">UV Index</div>
                      <div className="weather-stat-value">
                        {weather.current.uv}
                      </div>
                    </div>
                  </div>

                  <div className="weather-stat">
                    <div className="weather-stat-icon">🕛</div>
                    <div>
                      <div className="weather-stat-label">Time</div>
                      <div className="weather-stat-value">
                        {weather.location.localtime.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AeroVision</h3>
              <p>
                Your trusted source for real-time weather information. Stay
                updated with accurate forecasts and weather conditions from
                around the world.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  📘
                </a>
                <a href="#" aria-label="Twitter">
                  🐦
                </a>
                <a href="#" aria-label="Instagram">
                  📷
                </a>
                <a href="#" aria-label="LinkedIn">
                  💼
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 AeroVision. All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default WeatherCard;