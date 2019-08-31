import React, { Component, Fragment } from 'react';

import GridItem from './Grid/GridItem';
import { fetchGifs } from '../../utils';
import { RANDOM_SOURCE_API, GIF_SEARCH_CONTROLS, RESPONSE_LIMIT } from '../../consts/consts';

class Random extends Component {
	state = {
		isLoading: true,
		isError: true
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
		this.setState({ isLoading: true });
		this.fetchGif();
	};

	render() {
		const { isLoading, result } = this.state;

		return (
			<div id="random-section">
				<p className="sub-text">
					Ohh! You don't want to be here. This is the Dark Side, young Luke. This is the section which will
					always give you the most random available GIFs in the world. Tread carefully.
				</p>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<Fragment>
						<GridItem item={result} controls={GIF_SEARCH_CONTROLS} />
						<div className="row">
							<button onClick={this.refreshGif} id="load-more">
								Refresh
							</button>
						</div>
					</Fragment>
				)}
			</div>
		);
	}
}

export default Random;
