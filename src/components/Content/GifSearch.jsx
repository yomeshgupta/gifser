import React, { Component, Fragment } from 'react';

import Searchbar from './Searchbar';
import Grid from './Grid/index';
import { fetchGifs } from '../../utils';
import { SOURCE_API, GIF_SEARCH_CONTROLS } from '../../consts/consts';

class GifSearch extends Component {
	state = {
		query: '',
		results: [],
		isLoading: false,
		isError: false,
		hasMore: true,
		totalPages: null,
		offset: 0
	};

	searchProcessing = query => {
		this.setState({ isLoading: true });

		const { offset } = this.state;

		return fetchGifs({
			data: {
				q: query,
				offset
			},
			API_URL: SOURCE_API
		})
			.then(response => {
				const { data, pagination } = response;
				const { total_count, count } = pagination;

				const totalPages = parseInt(total_count / count);
				const hasMore = !!(offset < total_count);

				this.setState(state => {
					return {
						results: data,
						totalPages,
						query,
						hasMore,
						offset: state.offset === 0 ? 19 : state.offset + 1,
						isLoading: false
					};
				});
			})
			.catch(() => this.setState({ isLoading: false, isError: true }));
	};

	render() {
		const { results, query, isLoading } = this.state;

		return (
			<Fragment>
				<Searchbar query={query} onSearch={this.searchProcessing} />
				{isLoading ? <div>Loading...</div> : <Grid items={results} controls={GIF_SEARCH_CONTROLS} />}
			</Fragment>
		);
	}
}

export default GifSearch;
