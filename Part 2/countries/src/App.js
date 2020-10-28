import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SVG from 'react-inlinesvg'

const SubCityInfo = ({ showData }) => {
  return (
    <div>
      <h4>Capital</h4>
      <span>{showData.capital}</span>
      <h4>Population</h4>
      <span>{showData.population}</span>
      <h4>flag</h4>
      <SVG src={showData.flag}>
        <img src={showData.flag} alt="flag" />
      </SVG>
    </div>
  )
}

const SingleCity = ({ showCities }) => {
  return (
    <div>
      {showCities.map(citi =>
        <div key={citi.name}>
          <h2>{citi.name}</h2>
          <p>Capital : {citi.capital}</p>
          <p>Population : {citi.population}</p>
          <h3>Languages</h3>
          {citi.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
          <div>
            <SVG src={citi.flag}>
              <img src={citi.flag} alt="flag" />
            </SVG>
          </div>
        </div>)
      }
    </div>
  )
}

const App = () => {
  const [city, setCity] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [showData, setShowData] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCity(response.data)
      })
  }, [])

  const handleInput = (event) => {
    const input = event.target.value
    setInputVal(input)
    setShowData(null)
  }

  const showCities = city.filter(c => c.name.toLowerCase().includes(inputVal.toLowerCase()))
  return (
    <div>
      <p>find countries :<input type="text" onChange={(e) => handleInput(e)} /></p>
      {showCities.length === 1 ? <SingleCity showCities={showCities} /> : showCities.length > 10 ?
        "too many" :
        showCities.map(citi => <div key={citi.name}>{citi.name}
          <button onClick={() => setShowData(citi)}>show</button></div>)
      }
      {
        showData !== null ? <SubCityInfo showData={showData} /> : <div></div>
      }
    </div>
  )
}

export default App

