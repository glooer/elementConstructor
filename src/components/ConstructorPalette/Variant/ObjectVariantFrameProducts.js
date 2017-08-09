// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameProducts extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'type': 'private',
				'name': 'Адрес компонента',
				'value': 'http://retava.ru/shopsite/test/widget'
			},
			'componentCountNews': {
				'name': 'Количество товаров',
				'value': 42
			}
		};
	}

	getClassName() {
		return 'ObjectVariantFrameProducts'
	}

	getDefaultComponentName() {
		return 'Фрейм компонента товаров';
	}

}
