// import React from 'react';
import Component from './VariantBase'

export default class VariantElementContainer extends Component {

	getPropsList() {
		return {
			'styleContainer': {
				'name': 'Стиль',
				'value': ''
			},
		};
	}

	getStructElement() {
		return {
			id: null,
			classContainer: 'col-lg-12',
			styleContainer: '',
			rows: [
				[]
			]
		};
	}

	getClassName() {
		return 'VariantElementContainer'
	}

	renderElement() {
		return null
	}
}
