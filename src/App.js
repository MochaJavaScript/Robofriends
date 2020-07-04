import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from './actions'

import Cardlist from './Cardlist'; //the ../means leave the folder we are in (App.js is in the container folder), then at the level of folders, /components  means go into the components folder to the  /Cardlist  file.
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';

import './App.css';



const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
    }
}



class App extends Component {
	componentDidMount() {
		this.props.onRequestRobots();
	}
	


	render() {
		const { robots, searchField, onSearchChange, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
		 return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		 return (
		<div className='tc'>
		  <h1 classname='f1'>RoboFriends</h1>
		  <SearchBox searchChange={onSearchChange}/>
		  <Scroll>
		  { isPending ? <h1>Loading</h1> :
		  <ErrorBoundry>
		  	<Cardlist robots={filteredRobots} />
		  </ErrorBoundry>
	 	  } 
		  </Scroll>
		</div>
	);
  }
}	


export default connect(mapStateToProps, mapDispatchToProps)(App)