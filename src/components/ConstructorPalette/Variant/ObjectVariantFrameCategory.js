// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameCategory extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'name': 'Адрес компонента',
				'value': 'http://localhost:3000/componentCategory.html'
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
