import React, { Component, Fragment } from 'react';

import Searchbar from './Searchbar';
import Grid from './Grid';
class Home extends Component {
	state = {
		query: '',
		results: [],
		isLoading: false
	};

	updateQuery = e => {
		const { target: { value = '' } = {} } = e;
		this.setState({ query: value });
	};

	fetchGifs = e => {
		e.preventDefault();
		console.log('Called');
	};

	render() {
		const { query } = this.state;
		return (
			<Fragment>
				<Searchbar query={query} onChange={this.updateQuery} onSearch={this.fetchGifs} />
				<Grid gifs={results} />
			</Fragment>
		);
	}
}

export default Home;
