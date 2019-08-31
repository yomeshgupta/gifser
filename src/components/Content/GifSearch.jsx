import React, { Component, Fragment } from 'react';

import Searchbar from './Searchbar';
import Grid from './Grid/index';
import { SOURCE_API, API_KEY, RESPONSE_LIMIT, DEFAULT_TAB } from '../../consts/consts';

class GifSearch extends Component {
	state = {
		query: '',
		results: [],
		isLoading: false,
		hasMore: true,
		totalPages: null,
		offset: 0,
		currentTab: DEFAULT_TAB
	};

	fetchGifs = (params = {}) => {
		const { query = this.state.query, processing, offset } = params;

		const url = new URL(SOURCE_API);

		url.search = new URLSearchParams({
			api_key: API_KEY,
			q: query,
			offset,
			limit: RESPONSE_LIMIT
		});

		return fetch(url)
			.then(response => response.json())
			.then(response => processing(response));
	};

	searchProcessing = query => {
		this.setState({ isLoading: true });

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
				offset: offset === 0 ? 19 : offset + 1,
				isLoading: false
			});
		}

		return this.fetchGifs({
			query,
			offset,
			processing
		});
	};

	render() {
		const { results, query, isLoading } = this.state;

		return (
			<Fragment>
				<Searchbar query={query} onSearch={this.searchProcessing} />
				{isLoading ? <div>Loading...</div> : <Grid items={results} />}
			</Fragment>
		);
	}
}

export default GifSearch;
