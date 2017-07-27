import React from 'react';
import Component from './VariantBase'

export default class VariantElementImg extends Component {

	constructor() {
		super()
		this.deepGetParam = this.deepGetParam.bind(this)
	}

	getPropsList() {
		return {
			'src': {
				'name': 'картинка',
				'value': '/'
			},
			'alt': {
				'name': 'alt',
				'value': ''
			},
			'className': {
				'name': 'имя класса',
				'value': '',
				'defaultValue': 'img-thumbnail'
			}
		};
	}

	renderElement() {
		return (
			<img
				className={ this.deepGetParam('className') }
				src={ this.deepGetParam('src', '/') }
				alt={ this.deepGetParam('alt') }
			/>
		)
	}
}
