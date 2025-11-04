import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="container">
      <header className="app-header">
        <h1>⛅Weather Forecast Site</h1>
      </header>
      <WeatherCard />
    </div>
  );
}
export default App;
