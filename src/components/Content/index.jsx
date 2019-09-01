import React, { Component } from 'react';

import Tabs from './Tabs';
import GifSearch from './GifSearch';
import Trending from './Trending';
import Random from './Random';
import Overlay from './Overlay';
import { DEFAULT_TAB, TAB_KEYS } from '../../consts/consts';

class Content extends Component {
	state = {
		currentTab: DEFAULT_TAB,
		overlay: { show: false, content: null }
	};

	selectTab = tab => {
		this.setState({
			currentTab: tab
		});
	};

	toggleOverlay = (content = null) => {
		this.setState(state => {
			const { overlay } = state;
			return {
				overlay: {
					show: !overlay.show,
					content
				}
			};
		});
	};

	renderTabContent = () => {
		const { currentTab } = this.state;

		switch (currentTab) {
			default:
			case TAB_KEYS.HOME:
				return <GifSearch toggleOverlay={this.toggleOverlay} />;
			case TAB_KEYS.TRENDING:
				return <Trending toggleOverlay={this.toggleOverlay} />;
			case TAB_KEYS.RANDOM:
				return <Random toggleOverlay={this.toggleOverlay} />;
		}
	};

	render() {
		const { currentTab, overlay } = this.state;

		return (
			<section className="content-wrapper">
				<section className="content">
					<Tabs activeView={currentTab} onClick={this.selectTab} />
					{this.renderTabContent()}
				</section>
				<Overlay show={overlay.show} content={overlay.content} toggleOverlay={this.toggleOverlay} />
			</section>
		);
	}
}

export default Content;
