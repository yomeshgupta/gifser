import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ show, content, toggleOverlay, ...rest }) => {
	return show ? (
		<section className="overlay" {...rest}>
			<span onClick={toggleOverlay} role="button" aria-label="Close Button" className="overlay-close">
				<svg viewBox="0 0 32 32" class="icon icon-clear" viewBox="0 0 32 32" aria-hidden="true">
					<path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
				</svg>
			</span>
			{content}
		</section>
	) : null;
};

Overlay.propTypes = {
	show: PropTypes.bool.isRequired,
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
	toggleOverlay: PropTypes.func.isRequired
};

export default Overlay;
