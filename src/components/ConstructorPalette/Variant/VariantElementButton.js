import React from 'react';
import Component from './VariantBase'

export default class VariantElementButton extends Component {
	constructor() {
		super()

		this.testHandels = this.testHandels.bind(this)
	}

	testHandels() {
		this.setState(prevState => ({
			value: Math.random()
		}))
	}

	renderElement() {
		return (
			<button className="btn btn-secondary" onClick={ this.testHandels }>{ this.state.data.value }</button>
		)
	}

}
