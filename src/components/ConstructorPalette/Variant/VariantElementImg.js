import React, { Component } from 'react';

export default class VariantElementImg extends Component {
	render() {
		return (
			<div className="variant-element__container">
				<div className="variant-element-img">
					<img src={'http://placehold.it/400x20&text=slide1'} />
				</div>
			</div>
		)
	}
}
