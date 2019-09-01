import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';

import Searchbar from './Searchbar';
import Grid from './Grid/index';
import Empty from './shared/Empty';
import Error from './shared/Error';
import Loader from './shared/Loader';
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

	fetchGifsWrapper = ({ query, offset, loadMore = false }) => {
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
				const hasMore = !!(count + offset < total_count);

				this.setState(state => {
					return {
						results: loadMore ? state.results.concat(data) : data,
						totalPages,
						query,
						hasMore,
						offset: state.offset === 0 ? RESPONSE_LIMIT : state.offset + RESPONSE_LIMIT + 1,
						isLoading: false,
						isError: false
					};
				});
			})
			.catch(() => this.setState({ isLoading: false, isError: true }));
	};

	searchProcessing = query => {
		this.setState({ isLoading: true });
		const { offset } = this.state;

		this.fetchGifsWrapper({
			query,
			offset
		});
	};

	fetchMore = () => {
		const { query, offset } = this.state;

		this.fetchGifsWrapper({
			query,
			offset,
			loadMore: true
		});
	};

	renderContent() {
		const { isLoading, isError, results, hasMore } = this.state;
		const { toggleOverlay } = this.props;

		if (isLoading) return <Loader />;
		else if (isError) return <Error />;
		else if (!results.length)
			return <Empty message="Seems kind of empty here! Try searching/changing your query!" />;

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
		const { query } = this.state;

		return (
			<Fragment>
				<Searchbar query={query} onSearch={this.searchProcessing} />
				<p className="sub-text">
					With great power there must also come -- great responsibility. This can't be more true than here!
					You have the power to search, play and download all the GIFs in the world. Wisely use it, my friend.
				</p>
				{this.renderContent()}
			</Fragment>
		);
	}
}

GifSearch.props = {
	toggleOverlay: Proptypes.func.isRequired
};

export default GifSearch;
