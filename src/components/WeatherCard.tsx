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
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            margin: "0 auto",
            backgroundColor: "#f0f4f8",
            borderRadius: "32px",
            padding: "30px 70px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#1e3a5f",
                marginBottom: "4px",
                lineHeight: 1,
              }}
            >
              {weather.location.name}
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7c93",
                margin: 0,
              }}
            >
              {weather.location.country}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "25px",
              paddingBottom: "25px",
              borderBottom: "1px solid #d1dce6",
            }}
          >
            <img
              src={
                weather.current.condition.icon?.startsWith("http")
                  ? weather.current.condition.icon
                  : `https:${weather.current.condition.icon}`
              }
              alt={weather.current.condition.text}
              style={{
                width: "110px",
                height: "110px",
                objectFit: "contain",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "75px",
                  fontWeight: "300",
                  color: "#1e3a5f",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {weather.current.temp_c}°
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#6b7c93",
                  fontWeight: "500",
                }}
              >
                {weather.current.condition.text}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  color: "#5eb3e4",
                }}
              >
                💧
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7c93",
                    marginBottom: "4px",
                  }}
                >
                  Humidity
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#1e3a5f",
                  }}
                >
                  {weather.current.humidity}%
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  color: "#5eb3e4",
                }}
              >
                🍃
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7c93",
                    marginBottom: "4px",
                  }}
                >
                  Wind Speed
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#1e3a5f",
                  }}
                >
                  {weather.current.wind_kph} km/h
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  color: "#5eb3e4",
                }}
              >
                🔆
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7c93",
                    marginBottom: "4px",
                  }}
                >
                  UV Index
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#1e3a5f",
                  }}
                >
                  {weather.current.uv}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  color: "#5eb3e4",
                }}
              >
                🕛
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7c93",
                    marginBottom: "4px",
                  }}
                >
                  Time
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#1e3a5f",
                  }}
                >
                  {weather.location.localtime.split(" ")[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
