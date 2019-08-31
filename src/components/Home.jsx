import React, { Fragment } from 'react';

import Header from './Header';
import Content from './Content/index';
import Footer from './Footer';

const Home = () => {
	return (
		<Fragment>
			<Header />
			<Content />
			<Footer />
		</Fragment>
	);
};

export default Home;
