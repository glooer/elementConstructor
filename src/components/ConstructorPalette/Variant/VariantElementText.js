import React from 'react';
import Component from './VariantBase'

export default class VariantElementText extends Component {

	getPropsList() {
		return {
			'text': {
				'name': 'текст',
				'value': 'Simple Text'
			},
			'fontSize': {
				'name': 'размер шрифта',
				'value': '10px'
			}
		};
	}

	renderElement() {
		return (
			<div>
				{ this.state.data.value }
			</div>
		);
	}
}
