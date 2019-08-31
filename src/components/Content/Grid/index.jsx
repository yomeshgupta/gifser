import React, { Fragment } from 'react';

import GridItem from './GridItem';

const Grid = ({ items, controls = null, fetchMore }) => {
	if (!items.length) return <div>Seems like kind of empty here!</div>;

	return (
		<Fragment>
			<div className="grid">
				{items.map(item => {
					return <GridItem item={item} key={`${item.id}-${item.slug}`} controls={controls} />;
				})}
			</div>
			<div className="row">
				<button onClick={fetchMore} id="load-more">
					Load More
				</button>
			</div>
		</Fragment>
	);
};

export default Grid;
