import React from 'react';
import ReactDOM from 'react-dom';

const cities = [
	{city:'Boston', state:'MA'},
	{city:'New York', state:'NY'},
	{city:'Detroit', state:'MI'},
	{city:'Providence', state:'RI'},
	{city:'Houston', state:'Texas'},
	{city:'Los Angeles', state:'CA'},
];

class App extends React.Component {

	state = {
		selection: {city:'Boston', state:'MA'}
	}

	selectCity = (event) => {
		let value = event.target.value;
		const cityArray = value.split(', ');
		this.setState({selection:{city:cityArray[0], state:cityArray[1]}})
	}

	getWeather = (city) => {
		city.city = city.city.replace(/\s/g, "_");
		$.ajax({
			url : `http://api.wunderground.com/api/c2abc6edde56df60/forecast10day/q/${city.state}/${city.city}.json`,
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
					{cities.map(function(city, index) {
						return( <option id={index} key={index}>{city.city}, {city.state}</option> )
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