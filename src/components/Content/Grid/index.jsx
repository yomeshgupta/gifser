import React, { Fragment } from 'react';

import Empty from '../shared/Empty';
import GridItem from './GridItem';

const Grid = ({ items, controls = null, fetchMore = null, hasMore = false }) => {
	if (!items.length) return <Empty />;

	return (
		<Fragment>
			<div className="grid">
				{items.map(item => {
					return <GridItem item={item} key={`${item.id}-${item.slug}`} controls={controls} />;
				})}
			</div>
			{fetchMore && hasMore ? (
				<div className="row">
					<button onClick={fetchMore} id="load-more">
						Load More
					</button>
				</div>
			) : null}
		</Fragment>
	);
};

export default Grid;
