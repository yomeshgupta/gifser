import React, { Component, Fragment } from 'react';

class Home extends Component {
	state = {
		query: '',
		results: []
	};

	render() {
		const { query } = this.state;
		return (
			<Fragment>
				<Searchbar query={query} />
				<Grid />
			</Fragment>
		);
	}
}

export default Home;
