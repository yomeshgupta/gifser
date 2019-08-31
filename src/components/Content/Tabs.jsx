import React from 'react';

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

export default Tabs;
