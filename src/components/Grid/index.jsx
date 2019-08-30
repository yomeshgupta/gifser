import React, { Component } from 'react';

import GridItem from './GridItem';
import { generateRandomNumber } from '../../utils';
class Grid extends Component {
	render() {
		const { gifs } = this.props;

		if (!gifs.length) return <div>Seems like kind of empty here!</div>;

		return (
			<div className="grid">
				{gifs.map(gif => {
					return <GridItem gif={gif} key={gif.id} classNames={`grid-item-${generateRandomNumber(3)}`} />;
				})}
			</div>
		);
	}
}

export default Grid;
