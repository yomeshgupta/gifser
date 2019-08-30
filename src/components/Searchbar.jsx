import React from 'react';

const Searchbar = ({ query, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				title="Enter Search Query"
				placeholder="What needs to be searched?"
				onChange={onChange}
				value={query}
			/>
			<input type="submit" value="Search" />
		</form>
	);
};

export default Searchbar;
