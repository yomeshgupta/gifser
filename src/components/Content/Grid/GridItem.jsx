import React, { Component } from 'react';

class GridItem extends Component {
	state = {
		paused: false
	};

	togglePaused = () => {
		this.setState(state => ({
			paused: !state.paused
		}));
	};

	renderImage(url, display) {
		return <div className="image" style={{ backgroundImage: `url(${url})`, display }}></div>;
	}

	render() {
		const { gif, classNames } = this.props;
		const { paused } = this.state;
		const {
			images: { original = {}, hd = {}, original_still = {} }
		} = gif;

		return (
			<div className={`item ${classNames}`}>
				{this.renderImage(original_still.url, paused === true ? 'block' : 'none')}
				{this.renderImage(original.webp, paused === true ? 'none' : 'block')}
				<div className="controls">
					<button>Play</button>
					<button>Pause</button>
					<button>Download as Video</button>
					<button>Download as Gif</button>
				</div>
			</div>
		);
	}
}

export default GridItem;
