import React, { Component } from 'react';

class Searchbar extends Component {
	state = {
		query: ''
	};

	updateQuery = e => {
		const { target: { value = '' } = {} } = e;
		this.setState({ query: value });
	};

	searchWrapper = e => {
		e.preventDefault();
		const { onSearch } = this.props;
		const { query } = this.state;

		if (!query || !query.trim().length) return alert('Please enter search query.');

		return onSearch(query);
	};

	render() {
		const { query } = this.state;

		return (
			<form onSubmit={this.searchWrapper} role="form">
				<input
					type="text"
					title="Enter Search Query"
					placeholder="What needs to be searched?"
					onChange={this.updateQuery}
					value={query}
					aria-label={query}
				/>
				<input type="submit" value="Search" aria-label="Search" />
			</form>
		);
	}
}

export default Searchbar;
