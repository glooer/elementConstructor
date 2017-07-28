import React from 'react';
import Component from './VariantBase'

export default class VariantElementText extends Component {

	getPropsList() {
		return {
			'text': {
				'name': 'текст',
				'value': 'Simple Text',
				'defaultValue': 'Simple Text'
			},
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
			'textAlign': {
				'name': 'положение текста',
				'type': 'select',
				'value': '',
				'defaultValue': [
					'left', 'center', 'right'
				]
			}
		};
	}

	renderElement() {
		return (
			<div style={ this.inlineStyleToObject(this.deepGetParam('style')) }>
				{ this.deepGetParam('text') }
			</div>
		);
	}
}
