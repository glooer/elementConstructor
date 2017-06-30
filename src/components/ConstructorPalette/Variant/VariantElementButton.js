import React, { Component } from 'react';

export default class VariantElementButton extends Component {
	constructor() {
		super()

		this.state = {
			value: Math.random()
		}

		this.testHandels = this.testHandels.bind(this)
	}

	testHandels() {
		this.setState(prevState => ({
			value: Math.random()
		}))
	}

	render() {
		return (
			<div className="variant-element__container">
				<div className="variant-element-button">
					<button className="btn btn-secondary" onClick={this.testHandels}>{ this.state.value }</button>
				</div>
			</div>
		)
	}
}
