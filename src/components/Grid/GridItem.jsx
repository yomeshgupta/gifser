import React, { Component } from 'react';
import { url } from 'inspector';

class GridItem extends Component {
	render() {
		const { gif } = this.props;
		const {
			images: { original = {}, hd = {} }
		} = gif;

		return (
			<div className="item">
				<div className="image" style={{ background: url(original.url) }}></div>
				<div className="controls">Buttons</div>
			</div>
		);
	}
}

export default GridItem;
