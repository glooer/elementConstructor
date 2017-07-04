import React, { Component } from 'react';

export default class VariantElementText extends Component {
	constructor(props) {
		super(props)

		var value;
		try {
			value = this.props.data.params.text
		} catch (e) {}

		this.state = {
			data: {
				value: value
			}
		}


	}

	componentWillReceiveProps() {
		var value;
		try {
			value = this.props.data.params.text
		} catch (e) {}

		this.setState((prevState) => {
			prevState.data.value = value

			return prevState;
		})
	}


	render() {
		return (
			<div className="variant-element__container">
				<div className="variant-element-text">
					{ this.state.data.value }
				</div>
			</div>
		)
	}
}
