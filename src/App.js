import React, { useState } from 'react'
import './App.css';

const api = {
  key: '474105e581c60b4ec8239c5aba634cfa',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  let date = String(new window.Date())
  date = date.slice(3,15)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [condition, setCondition] = useState([]);
  const [country, setCountry] = useState([]);

  function search(e) {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${e.target.value}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true)
        setWeather(result)
        setTemp(result.main.temp)
        setCondition(result.weather[0].main)
        setCountry(result.sys.country)
        e.target.value = ''
      },
      (error) => {
        setError(error);
      })
    }
  }
  
  return (
    <div className={(isLoaded === true) ? ((temp > 20) ? 'App warm' : 'App') : 'App'}>
      <main>
          <input type="text" placeholder="Search" className="search_bar" onKeyPress={search}/>
          {(error) ? (
            <div>
              <p>Erreur : {error.message}</p>
            </div>
          ) : (isLoaded === true) ? (
            <div>
              <p className="location">{weather.name}, {country}</p>
              <p className="date">{ date }</p>
              <p className="temp">{Math.round(temp)}°c</p>
              <div className="weather">{condition}</div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
