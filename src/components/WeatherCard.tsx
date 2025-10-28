import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
import "../styles/WeatherCard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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

      {loading && <p>Loading weather info...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <div className="card">
          <div
            style={{
              fontSize: "35px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              marginLeft: "190px"
            }}
          >
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="weatherIcon"
              style={{ margin: 0 }}
            />
            <div style={{ color: "#667eea" }} />
            <b>{weather.current.temp_c}°C </b>
          </div>
          <div className="cityName">
            {weather.location.name}, {weather.location.country}
          </div>
          <div className="weatherDetails" style={{fontWeight: "500"}}>
            <div className="row text-center">
              <div className="col-6 mb-3 animate-icon">
                🕛 Time: {weather.location.localtime}
              </div>
              <div className="col-6 mb-3 animate-icon">
                💧 Humidity: {weather.current.humidity}%
              </div>
              <div className="col-6 mb-3 animate-icon">
                🍃 Wind: {weather.current.wind_kph} kph
              </div>
              <div className="col-6 mb-3 animate-icon">
                🔆 UV Index: {weather.current.uv}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
