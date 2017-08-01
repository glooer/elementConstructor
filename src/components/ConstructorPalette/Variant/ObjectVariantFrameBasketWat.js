// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameBasketWat extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'type': 'private',
				'name': 'Адрес компонента',
				'value': 'http://localhost:3000/componentBasket.html'
			},
			'componentCountNews': {
				'name': 'Количество новостей',
				'value': 3
			}
		};
	}

	getDefaultComponentName() {
		return 'Фрейм компонента корзины';
	}

}
