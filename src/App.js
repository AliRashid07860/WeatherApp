import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "54a416f1e4eccf0f824cb70e114a73b0";

const WeatherApp = () => {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather");
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchWeather();
  };


  return (
    <div className="weather-card">
      <h1 className="Heading">🌤️ Weather App</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-top">
          <div class="weather-left">
            <h3> {weather.name}</h3>
          </div>
          
           <div className="weather-right">

          <p>🌡️ {weather.main.temp} °C</p>

          <p> Feel like {weather.main.feels_like} °C  </p>
          <p>🌡️Max {weather.main.temp_max} °C || 🌡️Min {weather.main.temp_min} °C</p>
           </div>

        
        </div>

      )}
      {weather &&(
                <div class="bottom-forecast">
        <p>📍 {weather.weather[0].description}</p> <br/>
      <p className="wind-info">
  <span role="img" aria-label="wind" className="big-emoji">🌬️</span> 
  Wind: {weather.wind.speed} m/s
</p>
    </div>
      )}

      
    </div>
  
  );
};

export default WeatherApp;
