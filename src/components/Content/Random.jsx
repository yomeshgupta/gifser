import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';

import GridItem from './Grid/GridItem';
import Empty from './shared/Empty';
import Error from './shared/Error';
import Loader from './shared/Loader';
import { fetchGifs } from '../../utils';
import { RANDOM_SOURCE_API, GIF_SEARCH_CONTROLS } from '../../consts/consts';

class Random extends Component {
	state = {
		isLoading: true,
		isError: false,
		result: null
	};

	componentDidMount() {
		this.fetchGif();
	}

	fetchGif = () => {
		return fetchGifs({
			data: {},
			API_URL: RANDOM_SOURCE_API
		})
			.then(response => {
				const { data } = response;

				this.setState(state => {
					return {
						result: data,
						isLoading: false
					};
				});
			})
			.catch(() => this.setState({ isError: true, isLoading: false }));
	};

	refreshGif = () => {
		this.setState({ isLoading: true, isError: false });
		this.fetchGif();
	};

	renderContent = () => {
		const { isLoading, isError, result } = this.state;
		const { toggleOverlay } = this.props;

		if (isLoading) return <Loader />;
		else if (isError) return <Error />;
		else if (!result) return <Empty message="Seems kind of empty here!" />;

		return (
			<Fragment>
				<GridItem item={result} controls={GIF_SEARCH_CONTROLS} toggleOverlay={toggleOverlay} />
				<section className="row">
					<button onClick={this.refreshGif} id="load-more" aria-label="Refresh">
						Refresh
					</button>
				</section>
			</Fragment>
		);
	};

	render() {
		return (
			<section id="random-section">
				<p className="sub-text">
					Ohh! You don't want to be here. This is the Dark Side, young Luke. This is the section which will
					always give you the most random available GIF in the world. Tread carefully.
				</p>
				{this.renderContent()}
			</section>
		);
	}
}

Random.props = {
	toggleOverlay: Proptypes.func.isRequired
};

export default Random;
