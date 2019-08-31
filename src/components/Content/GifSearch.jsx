import React, { Component, Fragment } from 'react';

import Searchbar from './Searchbar';
import Grid from './Grid/index';
import { fetchGifs } from '../../utils';
import { SOURCE_API, GIF_SEARCH_CONTROLS, RESPONSE_LIMIT } from '../../consts/consts';

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
						offset: state.offset === 0 ? RESPONSE_LIMIT : state.offset + RESPONSE_LIMIT + 1,
						isLoading: false
					};
				});
			})
			.catch(() => this.setState({ isLoading: false, isError: true }));
	};

	fetchMore = () => {
		const { query, offset } = this.state;

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

				const hasMore = !!(count + offset < total_count);

				this.setState(state => {
					return {
						results: state.results.concat(data),
						offset: state.offset + RESPONSE_LIMIT + 1,
						hasMore
					};
				});
			})
			.catch(() => this.setState({ isError: true }));
	};

	render() {
		const { results, query, isLoading } = this.state;

		return (
			<Fragment>
				<Searchbar query={query} onSearch={this.searchProcessing} />
				<p className="sub-text">
					With great power there must also come -- great responsibility. This can't be more true than here!
					You have the power to search, play and download all the GIFs in the world. Wisely use it, my friend.
				</p>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<Grid items={results} controls={GIF_SEARCH_CONTROLS} fetchMore={this.fetchMore} />
				)}
			</Fragment>
		);
	}
}

export default GifSearch;
