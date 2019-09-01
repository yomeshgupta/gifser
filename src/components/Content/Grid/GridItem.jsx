import React, { Component } from 'react';
import Proptypes from 'prop-types';

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
		const { renderImage } = this.props;
		return renderImage ? (
			<img src={url} style={{ display }} alt="Gif" role="img" />
		) : (
			<div className="image" style={{ backgroundImage: `url(${url})`, display }} role="img"></div>
		);
	}

	renderControls(item, controls) {
		const { paused } = this.state;
		const {
			images: { original = {} }
		} = item;
		const { toggleOverlay } = this.props;
		return (
			<section className="controls">
				{controls.zoom && toggleOverlay ? (
					<button
						onClick={() =>
							toggleOverlay(
								<GridItem
									item={item}
									key={`${item.id}-${item.slug}`}
									controls={controls}
									toggleOverlay={null}
									renderImage={true}
								/>
							)
						}
						title="Zoom Gif"
						aria-label="Zoom Gif"
					>
						<svg
							viewBox="0 0 32 32"
							className="icon icon-search-plus"
							viewBox="0 0 32 32"
							aria-hidden="true"
						>
							<path d="M27 24.57l-5.647-5.648a8.892 8.892 0 0 0 1.522-4.984C22.875 9.01 18.867 5 13.938 5 9.01 5 5 9.01 5 13.938c0 4.929 4.01 8.938 8.938 8.938a8.887 8.887 0 0 0 4.984-1.522L24.568 27 27 24.57zm-13.062-4.445a6.194 6.194 0 0 1-6.188-6.188 6.195 6.195 0 0 1 6.188-6.188 6.195 6.195 0 0 1 6.188 6.188 6.195 6.195 0 0 1-6.188 6.188zm3.755-7.217h-2.726v-2.725h-2.062v2.725H10.18v2.062h2.725v2.725h2.062V14.97h2.726v-2.062z" />
						</svg>
					</button>
				) : null}
				{controls.play ? (
					paused ? (
						<button onClick={this.togglePaused} title="Play Gif" aria-label="Play Gif">
							<svg viewBox="0 0 32 32" className="icon icon-play" viewBox="0 0 32 32" aria-hidden="true">
								<path d="M10.968 23V9l12.762 7-12.762 7z" />
							</svg>
						</button>
					) : (
						<button onClick={this.togglePaused} title="Pause Gif" aria-label="Pause Gif">
							<svg viewBox="0 0 32 32" className="icon icon-pause" viewBox="0 0 32 32" aria-hidden="true">
								<path d="M18.432 7.5h4.547v17h-4.547zM9.022 7.5h4.545v17H9.022z" />
							</svg>
						</button>
					)
				) : null}
				{controls.download ? (
					<button title="Download Gif">
						<a href={original.url} target="_blank" title="Link to download gif" aria-label="Download Gif">
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
			</section>
		);
	}

	render() {
		const { item, classNames, controls, renderImage } = this.props;
		const { paused } = this.state;
		const {
			images: { original = {}, hd = {}, original_still = {} }
		} = item;

		return (
			<section className={`item ${classNames} ${renderImage ? 'overlay-item' : ''}`}>
				{this.renderImage(original_still.url, paused === true ? 'block' : 'none')}
				{this.renderImage(original.webp, paused === true ? 'none' : 'block')}
				{this.renderControls(item, controls)}
			</section>
		);
	}
}

GridItem.props = {
	item: Proptypes.node.isRequired,
	controls: Proptypes.object.isRequired,
	classNames: Proptypes.string,
	toggleOverlay: Proptypes.func,
	renderImage: Proptypes.bool
};

GridItem.defaultProps = {
	classNames: '',
	renderImage: false
};

export default GridItem;
