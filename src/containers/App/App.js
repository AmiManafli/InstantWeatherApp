import React, { Component } from 'react';

// import { MoonLoader } from 'react-spinners';

import classes from './App.module.css';
import assetMapping from '../../assets/assetMapping.json';
import Card from '../../elements/Card/Card';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/SearchBar/SearchBar';
import WeatherDetails from '../../components/WeatherDetails/WeatherDetails';
import Preview from '../../components/Preview/Preview';
import ErrorNotice from '../../components/ErrorNotice/ErrorNotice';
import Loader from 'react-loader';


class App extends Component {

  state = {
    searchBarInput: '',
    weatherDetails: {
      temperature: null,
      description: ''
    },
    loading: false,
    error: false
  }

  // Update state with current search bar input
  searchBarHandler = (e) => {
    this.setState({
      searchBarInput: e.target.value
    })
  }

  // Reset state after clicking on Logo or Try Again button
  tryAgainHandler = () => {
    this.setState({
      searchBarInput: '',
      weatherDetails: {},
      error: false
    })
  }

  // Fetch weather information and update state
  setWeather = () => {
    const city = this.state.searchBarInput;
    const API_KEY = '8eb8cd758e9c53f0e0ad329bb2e20e7e';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    // const gpsURL = API_URL + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const URL = API_URL + `?q=${city}&appid=${API_KEY}&units=metric`;
    this.setState({
      weatherDetails: {},
      loading: true,
      error: false
    }, this.fetchWeatherFromAPI(URL));
  }


  getGPSLocation = (e) => {
    navigator.geolocation.getCurrentPosition(this.setWeatherByCoordinates, (error) => {
      this.setState({
        loading: false,
        error: true,
      });
    });
  }

  setWeatherByCoordinates = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_KEY = '8eb8cd758e9c53f0e0ad329bb2e20e7e';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const gpsURL = API_URL + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    // const URL = API_URL + `?q=${city}&appid=${API_KEY}&units=metric`;
    this.setState({
      searchBarInput: 'lat ' + Math.round(lat) + ', lon ' + Math.round(lon),
      weatherDetails: {},
      loading: true,
      error: false
    }, this.fetchWeatherFromAPI(gpsURL));
  }

  fetchWeatherFromAPI = (URL) => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      // If city exists, update weather details
      if(data.cod === 200) {
        this.setState({
          weatherDetails: {
            temperature: data.main.temp,
            description: data.weather[0].main
          },
          loading: false
        });
      } else {
        // If city doesn't exist, throw error
        throw data.cod
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({
        loading: false,
        error: true
      });
    });
  } 

  render() {

    // Conditionally render card content
    let cardContent = <Preview />;
    if (this.state.loading) {
      cardContent = <Loader scale={2.00} color='#333'/>;
    } else if (this.state.error) {
      cardContent = <ErrorNotice onClickHandler={this.tryAgainHandler} />
    } else if (this.state.weatherDetails.temperature && this.state.weatherDetails.description !== '') {
      // Display weather information if temperature and description exists
      cardContent = <WeatherDetails data={this.state.weatherDetails} />;
    }

   return (
      <div className={classes.AppWrapper}>
      <Header
          color={assetMapping.colors[
            // Set header color based on weather condition; if error, set color to red
            (this.state.error) ? "error" : this.state.weatherDetails.description
          ]}
          onClickHandler={this.tryAgainHandler} />
        <main className={classes.AppMain}>
          <SearchBar
            value={this.state.searchBarInput}
            onChangeHandler={this.searchBarHandler}
            onClickHandler={this.setWeather}
            getLocationHandler={this.getGPSLocation}
            error={this.state.error} />
          <Card>
            {cardContent}
          </Card>
        </main>
        <Footer onClickHandler={this.tryAgainHandler} />
      </div>
    );
  }
}

export default App;