import React from 'react';
import PropTypes from 'prop-types';

import Common from './Common';

const Loader = props => (
	<Common {...props} src="/public/assets/images/loader.gif" alt="Loading..." classNames="loader" />
);

Loader.propTypes = { message: PropTypes.string };
Loader.defaultProps = { message: null };

export default Loader;
