import React, { Component } from 'react';

export default class VariantElementText extends Component {
	constructor() {
		super()

		this.state = {
			value: Math.random()
		}
	}

	render() {
		return (
			<div className="variant-element__container">
				<div className="variant-element-text">
					{ this.state.value }
				</div>
			</div>
		)
	}
}
