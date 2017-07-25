import React from 'react';
import Component from './VariantBase'

export default class VariantElementImg extends Component {

	getPropsList() {
		return {
			'src': {
				'name': 'картинка',
				'value': 'empty!'
			},
			'alt': {
				'name': 'alt',
				'value': ''
			}
		};
	}

	renderElement() {
		return (
			<img src={'/'} />
		)
	}
}
