import React from 'react';
import Component from './VariantBase'

export default class VariantElementText extends Component {
	renderElement() {
		return this.state.data.value;
	}
}
