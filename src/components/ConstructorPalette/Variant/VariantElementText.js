import React, { Component } from 'react';

export default class VariantElementText extends Component {
	constructor(args) {
		super(args)

		var value;
		try {
			value = args.data.params.text
		} catch (e) {}
		console.log(args.data);

		this.state = {
			value: value
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
