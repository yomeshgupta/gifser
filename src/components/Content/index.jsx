import React, { Component } from 'react';

import Tabs from './Tabs';
import GifSearch from './GifSearch';
import { DEFAULT_TAB, TAB_KEYS } from '../../consts/consts';

class Content extends Component {
	state = {
		currentTab: DEFAULT_TAB
	};

	selectTab = tab => {
		this.setState({
			currentTab: tab
		});
	};

	renderTabContent = () => {
		const { currentTab } = this.state;

		switch (currentTab) {
			default:
			case TAB_KEYS.HOME:
				return <GifSearch />;
			case TAB_KEYS.TRENDING:
				return <Trending />;
			case TAB_KEYS.RANDOM:
				return <Random />;
		}
	};

	render() {
		const { currentTab } = this.state;

		return (
			<div className="content-wrapper">
				<div className="content">
					<Tabs activeView={currentTab} onClick={this.selectTab} />
					{this.renderTabContent()}
				</div>
			</div>
		);
	}
}

export default Content;
