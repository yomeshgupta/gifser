import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Empty from '../shared/Empty';
import GridItem from './GridItem';

const Grid = ({ items, controls, fetchMore, hasMore }) => {
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

Grid.propTypes = {
	items: PropTypes.array.isRequired,
	controls: PropTypes.object,
	fetchMore: PropTypes.func,
	hasMore: PropTypes.bool
};

Grid.defaultProps = {
	fetchMore: null,
	controls: null,
	hasMore: false
};

export default Grid;
