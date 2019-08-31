import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Empty from '../shared/Empty';
import GridItem from './GridItem';

const Grid = ({ items, controls, fetchMore, hasMore }) => {
	if (!items.length) return <Empty />;

	return (
		<Fragment>
			<section className="grid" role="grid">
				{items.map(item => {
					return <GridItem item={item} key={`${item.id}-${item.slug}`} controls={controls} />;
				})}
			</section>
			{fetchMore && hasMore ? (
				<section className="row">
					<button onClick={fetchMore} id="load-more" aria-label="Load More">
						Load More
					</button>
				</section>
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
