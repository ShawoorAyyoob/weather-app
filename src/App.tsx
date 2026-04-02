import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<WeatherCard/>}></Route>
        {/* <Route path="/about" element={<About/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/forecast" element={<Forecast/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
