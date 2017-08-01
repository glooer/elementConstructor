import React from 'react';
import Component from './VariantBase'

export default class VariantElementInput extends Component {

	getClassName() {
		return 'VariantElementInput'
	}

	renderElement() {
		return (
			<input className="form-control"/>
		)
	}
}
