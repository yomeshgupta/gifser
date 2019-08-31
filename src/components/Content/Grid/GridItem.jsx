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

	renderControls(item, controls) {
		const { paused } = this.state;
		const {
			images: { original = {} }
		} = item;
		return (
			<div className="controls">
				{controls.play ? (
					paused ? (
						<button onClick={this.togglePaused} title="Play Gif">
							<svg viewBox="0 0 32 32" className="icon icon-play" viewBox="0 0 32 32" aria-hidden="true">
								<path d="M10.968 23V9l12.762 7-12.762 7z" />
							</svg>
						</button>
					) : (
						<button onClick={this.togglePaused} title="Pause Gif">
							<svg viewBox="0 0 32 32" className="icon icon-pause" viewBox="0 0 32 32" aria-hidden="true">
								<path d="M18.432 7.5h4.547v17h-4.547zM9.022 7.5h4.545v17H9.022z" />
							</svg>
						</button>
					)
				) : null}
				{controls.download ? (
					<button title="Download Gif">
						<a href={original.url} target="_blank">
							<svg
								viewBox="0 0 32 32"
								className="icon icon-arrow-bottom"
								viewBox="0 0 32 32"
								aria-hidden="true"
								data-href={original.mp4}
							>
								<path
									d="M14.496 5.975l-.001 14.287-6.366-6.367L6 16.021l10.003 10.004L26 16.029 23.871 13.9l-6.366 6.368V5.977z"
									data-href={original.mp4}
								/>
							</svg>
						</a>
					</button>
				) : null}
			</div>
		);
	}

	render() {
		const { item, classNames, controls } = this.props;
		const { paused } = this.state;
		const {
			images: { original = {}, hd = {}, original_still = {} }
		} = item;

		return (
			<div className={`item ${classNames}`}>
				{this.renderImage(original_still.url, paused === true ? 'block' : 'none')}
				{this.renderImage(original.webp, paused === true ? 'none' : 'block')}
				{this.renderControls(item, controls)}
			</div>
		);
	}
}

export default GridItem;
