import React from 'react'
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "87fc5b4128760a9dffd742cf8871dbc8"


class App extends React.Component {

    state = {
        city: undefined,
        country: undefined,
        description: undefined,
        error: undefined,
        humidity: undefined,
        temperature: undefined,
    }

    getWeather = async (e) => {
        e.preventDefault();
        const country = e.target.elements.country.value
        const city = e.target.elements.city.value
        const apiCall = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${ city },${ country }&appid=${ API_KEY }`
        )
        const data = await apiCall.json()
        
        if (city && country) {
            console.log(data)
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
            }) 
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter values.",
            }) 
        }
    }

    render() {
        return (

            <div>
                <Title />
                <Form getWeather={ this.getWeather } /> 
                <Weather state={this.state} />
            </div>
        )
    }
}
     
export default App