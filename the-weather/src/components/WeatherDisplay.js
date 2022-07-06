import {Component} from "react";

export class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null,
        }
    }
    componentDidMount() {
        const zip = this.props.zip || '94303';
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
        fetch(URL)
            .then((res) => {
                return res.json();
            })
            .then((weatherData) => {
                this.setState({weatherData})
            })
    }

    render() {
        return (<>
            <div>WeatherDisplay</div>
            {!this.state.weatherData && <div>Loading...</div>}
            {this.state.weatherData && <div>
                <div>{this.state.weatherData.name}</div>
                <img src={`http://openweathermap.org/img/w/${this.state.weatherData.weather[0].icon}.png`}
                     alt={this.state.weatherData.description} />
            </div>}

        </>)
    }
}
