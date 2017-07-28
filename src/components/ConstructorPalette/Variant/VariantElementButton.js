import React from 'react';
import Component from './VariantBase'

export default class VariantElementButton extends Component {
	getPropsList() {
		return {
			'text': {
				'name': 'текст',
				'value': 'Simple Text',
				'defaultValue': 'Simple Text'
			},
		};
	}


	renderElement() {
		return (
			<button className="btn btn-secondary">{ this.deepGetParam('text') }</button>
		)
	}

}
