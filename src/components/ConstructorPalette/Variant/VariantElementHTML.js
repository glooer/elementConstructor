import React from 'react';
import Component from './VariantBase'

export default class VariantElementHTML extends Component {

	getPropsList() {
		return {
			'html': {
				'name': 'Код',
				'type': 'textarea',
				'value': '<h3>Hello!</h3>',
				'defaultValue': '&lt;h3&gt;Hello!&lt;/h3&gt;'
			},
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
		};
	}

	getClassName() {
		return 'VariantElementHTML'
	}

	renderUnsaveHTML() {
		return { __html: this.deepGetParam('html') }
	}

	renderElement() {
		return (
			<div style={ this.inlineStyleToObject(this.deepGetParam('style')) } dangerouslySetInnerHTML={ this.renderUnsaveHTML() }></div>
		);
	}
}
