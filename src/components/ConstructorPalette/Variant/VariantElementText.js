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
				'value': '1em'
			},
			'textAlign': {
				'name': 'положение текста',
				'value': 'left'
			}
		};
	}

	renderElement() {
		return (
			<div style={{
				fontSize: this.deepGet(this.state, ['raw', 'component', 'params', 'fontSize'], '10px'), //this.state.raw.component.params.fontSize
				textAlign: this.deepGet(this.state, ['raw', 'component', 'params', 'textAlign'], '10px'), //this.state.raw.component.params.fontSize
			}}>
				{ this.state.data.value }
			</div>
		);
	}
}
