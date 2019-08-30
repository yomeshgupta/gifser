import React, { Component, Fragment } from 'react';

import Searchbar from './Searchbar';
import Grid from './Grid/index';
import { SOURCE_API, API_KEY } from '../consts/consts';

const INITIAL_STATE = {
	totalPages: null,
	currentPage: 0,
	hasMore: false
};
class Home extends Component {
	state = {
		query: '',
		results: [],
		isLoading: false,
		hasMore: true,
		totalPages: null,
		offset: 0
	};

	fetchGifs = (params = {}) => {
		const { INITIAL_STATE, query = this.state.query, processing } = params;

		if (INITIAL_STATE) this.setState(INITIAL_STATE);

		const url = new URL(SOURCE_API);

		url.search = new URLSearchParams({
			api_key: API_KEY,
			q: query
		});

		return fetch(url)
			.then(response => response.json())
			.then(response => processing(response));
	};

	searchProcessing = query => {
		const { offset } = this.state;
		const self = this;

		function processing(response) {
			const { data, pagination } = response;
			const { total_count, count } = pagination;

			const totalPages = parseInt(total_count / count);
			const hasMore = !!(offset < total_count);

			self.setState({
				results: data,
				totalPages,
				query,
				hasMore,
				offset: offset === 0 ? 26 : offset + 1,
				isLoading: false
			});
		}

		return this.fetchGifs({
			INITIAL_STATE: { ...INITIAL_STATE, isLoading: true },
			query,
			offset,
			processing
		});
	};

	render() {
		const { results, isLoading } = this.state;

		return (
			<Fragment>
				<Searchbar onSearch={this.searchProcessing} />
				{isLoading ? <div>Loading...</div> : <Grid gifs={results} />}
			</Fragment>
		);
	}
}

export default Home;
