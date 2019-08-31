import React, { Component, Fragment } from 'react';

import Grid from './Grid/index';
import Loader from './shared/Loader';
import { fetchGifs } from '../../utils';
import { TRENDING_SOURCE_API, GIF_SEARCH_CONTROLS, RESPONSE_LIMIT } from '../../consts/consts';

class Trending extends Component {
	state = {
		isLoading: true,
		isError: false,
		hasMore: true,
		totalPages: null,
		offset: 0,
		results: []
	};

	componentDidMount() {
		const { isLoading, offset } = this.state;
		if (isLoading) {
			return fetchGifs({
				data: {
					offset
				},
				API_URL: TRENDING_SOURCE_API
			})
				.then(response => {
					const { offset } = this.state;
					const { data, pagination } = response;
					const { total_count, count } = pagination;

					const totalPages = parseInt(total_count / count);
					const hasMore = !!(offset < total_count);

					this.setState(state => {
						return {
							results: data,
							totalPages,
							hasMore,
							offset: state.offset === 0 ? RESPONSE_LIMIT : state.offset + RESPONSE_LIMIT + 1,
							isLoading: false
						};
					});
				})
				.catch(() => this.setState({ isError: true, isLoading: false }));
		}
	}

	fetchMore = () => {
		const { offset } = this.state;

		return fetchGifs({
			data: {
				offset
			},
			API_URL: TRENDING_SOURCE_API
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
		const { isLoading, results, hasMore } = this.state;

		return (
			<Fragment>
				<p className="sub-text">
					So, you are here. Want to see the trend? This section will always give you the latest and greatest
					GIFs in the world. Get ready to be blown away, my friend.
				</p>

				{isLoading ? (
					<Loader />
				) : (
					<Grid items={results} controls={GIF_SEARCH_CONTROLS} fetchMore={this.fetchMore} hasMore={hasMore} />
				)}
			</Fragment>
		);
	}
}

export default Trending;
