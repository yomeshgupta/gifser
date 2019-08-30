import React, { Component } from 'react';

class Grid extends Component {
	render() {
		const { gifs } = this.props;

		if (!gifs.length) return <div>Seems like kind of empty here!</div>;

		return (
			<div className="items">
				{gifs.map(gif => (
					<GridItem gif={gif} key={gif.id} />
				))}
			</div>
		);
	}
}

export default Grid;
