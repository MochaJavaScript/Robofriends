import React, { Component } from 'react';
import Cardlist from './Cardlist'; //the ../means leave the folder we are in (App.js is in the container folder), then at the level of folders, /components  means go into the components folder to the  /Cardlist  file.
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

 

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({ robots: users }));
		
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots, searchfield } = this.state;
		 const filteredRobots = robots.filter(robot => {
		 return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		 return !robots.length ?
		 <h1>Loading</h1> :
		(
		<div className='tc'>
		  <h1 classname='f1'>RoboFriends</h1>
		  <SearchBox searchChange={this.onSearchChange}/>
		  <Scroll>
		  <ErrorBoundry>
		  	<Cardlist robots={filteredRobots} />
		  </ErrorBoundry>
		  </Scroll>
		</div>
	);
  }
}	


export default App;