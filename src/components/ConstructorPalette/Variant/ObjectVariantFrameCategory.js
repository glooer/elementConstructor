// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameCategory extends Component {

	getPropsList() {
		return {
			'componentUrl': {
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
		return 'ObjectVariantFrameCategory'
	}

	getDefaultComponentName() {
		return 'Фрейм компонента категорий';
	}

}
