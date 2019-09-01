import React, { Component, Fragment } from 'react';

import Grid from './Grid/index';
import Loader from './shared/Loader';
import Error from './shared/Error';
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
		const { offset } = this.state;
		this.fetchGifsWrapper({
			offset
		});
	}

	fetchGifsWrapper = ({ offset, loadMore = false }) => {
		return fetchGifs({
			data: {
				offset
			},
			API_URL: TRENDING_SOURCE_API
		})
			.then(response => {
				const { data, pagination } = response;
				const { total_count, count } = pagination;

				const totalPages = parseInt(total_count / count);
				const hasMore = !!(count + offset < total_count);

				this.setState(state => {
					return {
						results: loadMore ? state.results.concat(data) : data,
						totalPages,
						hasMore,
						offset: state.offset === 0 ? RESPONSE_LIMIT : state.offset + RESPONSE_LIMIT + 1,
						isLoading: false,
						isError: false
					};
				});
			})
			.catch(() => this.setState({ isLoading: false, isError: true }));
	};

	fetchMore = () => {
		const { offset } = this.state;

		this.fetchGifsWrapper({
			offset,
			loadMore: true
		});
	};

	renderContent() {
		const { isLoading, isError, results, hasMore } = this.state;
		const { toggleOverlay } = this.props;

		if (isLoading) return <Loader />;
		else if (isError) return <Error />;

		return (
			<Grid
				items={results}
				controls={GIF_SEARCH_CONTROLS}
				fetchMore={this.fetchMore}
				hasMore={hasMore}
				toggleOverlay={toggleOverlay}
			/>
		);
	}

	render() {
		return (
			<Fragment>
				<p className="sub-text">
					So, you are here. Want to see the trend? This section will always give you the latest and greatest
					GIFs in the world. Get ready to be blown away, my friend.
				</p>
				{this.renderContent()}
			</Fragment>
		);
	}
}

export default Trending;
