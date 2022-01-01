import React, { Component } from "react";
import { getWeatherData } from "../../services/OwpService";
import Search from "../Search/Search";
import Weather from "./Weather";
import axios from "axios";
import { get } from "lodash";

class WeatherMain extends Component {
  constructor(props) {
    super(props);

    // Initialisation du state
    // Avant même l'affichage du composant
    this.state = {
      searchTerm: "",
      error: "",
      city: "",
      icon: "",
      temperature: "",
      status: "",
      loading: true,
      displayWeatherCard: false,
      latitude : null,
      longitude : null ,
      userAddress: null
    };

    this.getLocation = this.getLocation.bind(this)


    this.getCoordinates = this.getCoordinates.bind(this)


  



    // you still have to handle rejction errors
  






  }


   getLocation = async e => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

   

   const response =  await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=33.99825045104792&lon=-6.853202483543013&appid=a7e8689c16bddca198ae1d762f5049cd')
 
  

    setTimeout(() => {
        this.setState({
          
          searchTerm : response.data.name,
          displayWeatherCard: true,
          loading: false,
        });

        this.search()
      }, 1400);

     
    

    
    
    



  

  }


  getCoordinates = (position)=>{

    console.log(position)

    this.setState(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    )

  }
  updateSearchValue = e => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    this.setState({
      searchTerm: searchTerm
    });
  };

  enterKeySearch = e => {
    if (e.key === "Enter") {
      this.search(e);
    }
  };

  search = async e => {
    this.setState({ displayWeatherCard: true, loading: true });
    console.log("Mon terme de recherche est : ", this.state.searchTerm);

    try {
      const data = await getWeatherData(this.state.searchTerm);

      console.log("Mes données dans search", data);

      setTimeout(() => {
        this.setState({
          city: data.name,
          icon: data.weather[0].id,
          temperature: data.main.temp,
          status: data.weather[0].description,
          loading: false,
          displayWeatherCard: true,
          error: ""
        });
      }, 1400);
    } catch (err) {
      this.setState({
        loading: false,
        displayWeatherCard: false,
        error: err.response.data.message
      });
    }
  };

  render = () => {
    const { city, icon, temperature, status } = this.state;

    return (
      <>
        <Search
          error={this.state.error}
          handleSubmit={this.search}
          searchValue={this.state.searchTerm}
          updateValue={this.updateSearchValue}
          handleKeyDown={this.enterKeySearch}
          textPlaceholder="Rechercher une ville..."
        />
        <Weather
          loading={this.state.loading}
          display={this.state.displayWeatherCard}
          city={city}
          icon={icon}
          status={status}
          temperature={temperature}
        />



        <button onClick={this.getLocation} style={{'position':'absolute', 'top':"8px" , "background":"transparent" , "color":"white" , "border":"none" , "outlineWidth":"0" }} >Use Your Location</button>
        



      </>
    );
  };
}

export default WeatherMain;
