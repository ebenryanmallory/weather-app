import React, { Component } from 'react';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
import AlgoliaPlaces from 'algolia-places-react';

Amplify.configure(awsmobile);

function Template(props) {
  return <div><h1>{props.json.name}</h1><div>{props.temp} °C</div><div>{props.weather}</div></div>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      json: [],
      error: null,
      city: '',
      temp: [],
      weather: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputCleared = this.inputCleared.bind(this);
  }
  handleChange(suggestion) {
    this.setState({city: suggestion.name});
    this.getWeatherJSON();
  }
  inputCleared() {
    console.log('Input has been cleared');
    this.setState({isLoading: true,
                   city: ''});
  }
  getWeatherJSON() {
    let apiName = 'apid9c2b358';
    let path = '/route/' + this.state.city;
    let myInit = {
      headers: {},
      response: false,
      queryStringParameters: {
        // name: 'param'
      }
    }
    API.get(apiName, path, myInit).then(response => {
        this.setState({                                                        
          json: response,
          temp: response.main.temp,
          weather: response.weather[0].main,
          isLoading: false,
        });
        }).catch(error => {
          this.setState({ error, isLoading: false })
        });
    }

  componentDidMount() {
    // this.getWeatherJSON();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
          <div>
          <AlgoliaPlaces
            placeholder='Type in your city:'

            options={{
              appId: 'plNORUJT35UB',
              apiKey: '29a7a93f9cc47a568640d78d8d3cd6c7',
              language: 'en',
              countries: ['us'],
              type: 'city',
            }}

            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
              this.handleChange(suggestion)}

            onClear={() => 
              this.inputCleared()}

            onError={({ message }) => 
              console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
          />
      
        </div>
        <hr />
        <div>
        {!isLoading ? (
          <Template json={this.state.json} temp={this.state.temp} weather={this.state.weather} />
          ) : (
            <p>Choose location</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
