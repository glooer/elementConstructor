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
			<div style={{
				fontSize: this.deepGetParam('fontSize'), //this.state.raw.component.params.fontSize
				textAlign: this.deepGetParam('textAlign'), //this.state.raw.component.params.fontSize
			}}>
				{ this.deepGetParam('text') }
			</div>
		);
	}
}
