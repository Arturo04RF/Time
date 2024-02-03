import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const App = () => {

  const [ciudad, setCiudad] = useState('Puebla');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [temperatura, setTemperatura] = useState(null);




  const getGeocodingData = async (ciudad, pais, limite) => {
    const api_key = '48488a408f5949c91376ac0bad1aeafd';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=${limite}&limit=5&appid=${api_key}`;

    try {
      const response = await fetch(url);
      //console.log(response);
      const data = await response.json();
      console.log(data)
      
      setCiudad(data[0].name);
      setLat(data[0].lat);
      setLon(data[0].lon);
    }
    catch (error) {
      console.log(error)
    }

  }


  const getWeatherData = async(lat, lon) => {
    const api_key = '48488a408f5949c91376ac0bad1aeafd';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    //}catch (error){
      //console.log(error);
    //}
    setTemperatura(data.main.temp); // Actualizamos el estado de temperatura
    } catch (error) {
      console.log(error);
    }

  }




  useEffect(() => {
    getGeocodingData('Puebla', 'MX', 2)
    getWeatherData(lat,lon)//invocamos de este lado las veriables de estado
  }, [])

  return (
    <>
      <div style={{ backgroundColor: 'rgb(24,55,178)', display: 'flex', justifyContent: 'center' }}>
        <div className='row'>
          <div className='col-xs-12 col-md-8 col-lg-6'>
            <div className='Tittle'>
              <h1 style={{ backgroundColor: 'rgb(24,55,178)', color: '#F7F4E8' }}>
                Pronostico personalizado 
              </h1>
              <p style={{ fontSize: '30px', color: 'rgb(137,161,254)'}}>
                 lat: {lat}, lon:{lon}
              </p>
              <div style={{ fontSize: '300px', display: 'flex', justifyContent: 'center', color: '#DAF3EA' }}>
                <FontAwesomeIcon icon={faSun} />
              </div>
            </div>
            <div>
              <p style={{ display: 'flex', justifyContent: 'center', fontSize: '40px', color: 'rgb(255,255,255)' }} >
                {ciudad}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', color: 'rgb(255,255,255)' }}>
              <p>
                La temperatura en tu region es:  {temperatura} grados fahrenheit
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App