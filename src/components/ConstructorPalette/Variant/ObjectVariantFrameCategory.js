// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameCategory extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'name': 'Адрес компонента',
				'value': ''
			},
			'componentCountNews': {
				'name': 'Количество новостей',
				'value': 3
			}
		};
	}

	getDefaultComponentName() {
		return 'Фрейм компонента категорий';
	}

}
