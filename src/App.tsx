import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchWeather from "./components/SearchWeather";

function App() {
  const[city, setCity] = useState("");
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Weather App</h2>
        <SearchWeather  />
      {city && <WeatherCard />}
      </div>
    </>
  );
}
export default App;