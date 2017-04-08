import React from 'react';
import ReactDOM from 'react-dom';

const cities = {
	'Boston': {city:'Boston', state:'MA'},
	'New York': {city:'New York', state:'NY'},
	'Detroit': {city:'Detroit', state:'MI'},
	'Providence': {city:'Providence', state:'RI'},
	'Houston': {city:'Houston', state:'Texas'},
	'Los Angeles': {city:'Los Angeles', state:'CA'},
};

class App extends React.Component {

	state = {
		selection: cities['Boston']
	}

	selectCity = (event) => {
		const city = event.target.value;
		this.setState({selection:cities[city]})
	}

	getWeather = (cityObj) => {
		const cityUrl = cityObj.city.replace(/\s/g, "_");
		$.ajax({
			url : `http://api.wunderground.com/api/c2abc6edde56df60/forecast10day/q/${cityObj.state}/${cityUrl}.json`,
			dataType : "jsonp",
			success : function(parsed_json) {
				console.log(parsed_json);
			},
			error: function() {
				console.error(arguments);
			}
		});
	}

	render() {
		return(
			<div>
				<h1>Weather App</h1>
				<br/>
				<h3>Select City</h3>
				<select className='form-control' onChange={this.selectCity}>
					{Object.keys(cities).map(function(city) {
						const state = cities[city]['state'];
						return( <option value={city} key={city}>{city}, {state}</option> )
					}, this)}
				</select>
				<br/>
				<h3>Weather for {this.state.selection.city}, {this.state.selection.state}</h3>
				<div className='well'>
					Weather goes here
					{this.getWeather(this.state.selection)}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));