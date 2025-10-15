import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./App.css";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/weather" />} />
        <Route path="/weather" element={<WeatherDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
