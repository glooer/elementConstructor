import React from 'react';
import Component from './VariantBase'

export default class VariantElementImg extends Component {

	getPropsList() {
		return {
			'src': {
				'name': 'картинка',
				'value': 'http://placehold.it/300x300'
			},
			'alt': {
				'name': 'alt',
				'value': ''
			}
		};
	}

	renderElement() {
		return (
			<img src={ this.deepGet(this.state, ['raw', 'component', 'params', 'src'], '/') } />
		)
	}
}
