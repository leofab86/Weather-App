import React from 'react';
import ReactDOM from 'react-dom';

const cities = ['Boston', 'New York', 'Detroit', 'Providence', 'Houston', 'Los Angelas'];

class App extends React.Component {

	state = {
		selection: 'Boston'
	}

	selectCity = (event) => {
		this.setState({selection:event.target.value})
	}

	render() {
		return(
			<div>
				<h1>Weather App</h1>
				<br/>
				<h3>Select City</h3>
				<select className='form-control' onChange={this.selectCity}>
					{cities.map(function(city, index) {
						return( <option key={index}>{city}</option> )
					}, this)}
				</select>
				<br/>
				<h3>Weather for {this.state.selection}</h3>
				<div className='well'>
					Weather goes here
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));