import React from 'react';
import PropTypes from 'prop-types';

import { TABS } from '../../consts/consts';

function Tabs({ activeView, onClick }) {
	return (
		<ul className="tabs">
			{TABS.map(tab => (
				<li
					key={tab.id}
					className={`tab ${activeView === tab.value ? 'active' : ''}`}
					onClick={() => onClick(tab.value)}
				>
					{tab.name}
				</li>
			))}
		</ul>
	);
}

Tabs.propsType = {
	activeView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onClick: PropTypes.func
};

Tabs.defaultProps = {
	onClick: () => {}
};

export default Tabs;
