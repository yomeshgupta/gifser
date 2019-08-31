import React, { Component, Fragment } from 'react';

import Grid from './Grid/index';
import { fetchGifs } from '../../utils';
import { TRENDING_SOURCE_API, GIF_SEARCH_CONTROLS } from '../../consts/consts';

class Trending extends Component {
	state = {
		isLoading: true,
		isError: true,
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
							offset: state.offset === 0 ? 19 : state.offset + 1,
							isLoading: false
						};
					});
				})
				.catch(() => this.setState({ isError: true, isLoading: false }));
		}
	}

	render() {
		const { isLoading, results } = this.state;

		return (
			<Fragment>
				{isLoading ? <div>Loading...</div> : <Grid items={results} controls={GIF_SEARCH_CONTROLS} />}
			</Fragment>
		);
	}
}

export default Trending;
