import React from 'react';

import GridItem from './GridItem';

const Grid = ({ items, controls = null }) => {
	if (!items.length) return <div>Seems like kind of empty here!</div>;

	return (
		<div className="grid">
			{items.map(item => {
				return <GridItem item={item} key={item.id} controls={controls} />;
			})}
		</div>
	);
};

export default Grid;
