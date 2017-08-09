// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameBasketWat extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'type': 'private',
				'name': 'Адрес компонента',
				'value': 'http://retava.ru/shopsite/test/widget'
			},
			'componentCountNews': {
				'name': 'Количество новостей',
				'value': 3
			}
		};
	}

	getClassName() {
		return 'ObjectVariantFrameBasketWat'
	}

	getDefaultComponentName() {
		return 'Фрейм компонента корзины';
	}

}
