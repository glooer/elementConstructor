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
			'fontSize': {
				'name': 'размер шрифта',
				'value': '1em'
			},
			'style': {
				'name': 'Стиль',
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

	inlineStryleToObject(str) {
		let res = {};
		let regexp = /([\w-]+)\s*:\s*([^;]+)\s*;?/g
		let iterator;
		while (iterator = regexp.exec(str)) {
			res[iterator[1]] = iterator[2];
		}

		return res;
	}

	renderElement() {
		return (
			<div style={ this.inlineStryleToObject(this.deepGetParam('style')) }>
				{ this.deepGetParam('text') }
			</div>
		);
	}
}
