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

function getWeather (component, cityObj) {
	const cityUrl = cityObj.city.replace(/\s/g, "_");
	$.ajax({
		url : `http://api.wunderground.com/api/c2abc6edde56df60/forecast10day/q/${cityObj.state}/${cityUrl}.json`,
		dataType : "jsonp",
		success : function(result) {
			const tenDayArray = result.forecast.txt_forecast.forecastday;
			component.setState({
				selection: cityObj,
				tenDay: tenDayArray
			});
		},
		error: function() {
			console.error(arguments);
		}
	});
}

class App extends React.Component {

	state = {
		selection: cities['Boston'],
		tenDay: ''
	}

	componentWillMount () {
		getWeather(this, this.state.selection)
	}

	selectCity = (event) => {
		const city = event.target.value;
		getWeather(this, cities[city])
	}

	render() {
		const tenDayArray = this.state.tenDay;
		const today = (tenDayArray) ? tenDayArray.shift() : null;
		const renderWeather = (!tenDayArray) ? null :
			<div>
				<h4>Today({today.title})</h4>
				<h6>{today.fcttext}</h6>
				<hr/>
				{tenDayArray.map(function(data){
					return(
						<div key={data.period}>
							<h4>{data.title}</h4>
							<h6>{data.fcttext}</h6>
							<hr/>
						</div>
					)
				})}
			</div>
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
				<h3>10 Day Weather for {this.state.selection.city}, {this.state.selection.state}</h3>
				<div className='well'>
					{renderWeather}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));







