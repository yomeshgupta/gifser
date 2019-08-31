import React from 'react';
import PropTypes from 'prop-types';

const Common = ({ message, src, alt, classNames, ...rest }) => (
	<div className={`empty-state ${classNames}`} {...rest}>
		<img src={src} alt={alt} />
		<h2>{message}</h2>
	</div>
);

Common.propTypes = {
	message: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	classNames: PropTypes.string
};

Common.defaultProps = {
	message: '',
	alt: 'Image here',
	classNames: ''
};

export default Common;
