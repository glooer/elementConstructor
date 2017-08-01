import React from 'react';
import Component from './VariantBase'

export default class VariantElementImg extends Component {

	constructor() {
		super()
		this.deepGetParam = this.deepGetParam.bind(this)
	}

	getClassName() {
		return 'VariantElementImg'
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
			},
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
		};
	}

	renderElement() {
		return (
			<img
				style={ this.inlineStyleToObject(this.deepGetParam('style')) }
				className={ this.deepGetParam('className') }
				src={ this.deepGetParam('src', '/') }
				alt={ this.deepGetParam('alt') }
			/>
		)
	}
}
