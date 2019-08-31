import React from 'react';
import PropTypes from 'prop-types';

import Common from './Common';

const Empty = props => <Common {...props} src="/public/assets/images/empty.png" alt="Seems Empty" />;

Empty.propTypes = { message: PropTypes.string };
Empty.defaultProps = { message: 'Seems like kind of empty here' };

export default Empty;
