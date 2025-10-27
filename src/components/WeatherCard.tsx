import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
import "../styles/WeatherCard.css";
import type Weather from "../models/Weather";

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setError("Failed to fetch weather data.");
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

  return (
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
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "🔎 Search"}
        </button>
        <button className="btn btn-outline" onClick={handleClear}>
          Clear
        </button>
      </div>

      {loading && <p>Loading weather info...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <div className="card">
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="weatherIcon"
          />
          <div className="cityName">
            {weather.location.name}, {weather.location.country}
          </div>
          <div className="weatherDetails">
            <div>{weather.location.localtime}</div>
            <div>
              🌡️ <strong>{weather.current.temp_c}°C</strong> — {weather.current.condition.text}
            </div>
            <div>💧 Humidity: {weather.current.humidity}%</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
