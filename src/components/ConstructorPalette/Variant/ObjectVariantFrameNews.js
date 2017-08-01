// import React from 'react';
import Component from './ObjectVariantFrameBase'

export default class ObjectVariantFrameNews extends Component {

	getPropsList() {
		return {
			'componentUrl': {
				'type': 'private',
				'name': 'Адрес компонента',
				'value': 'http://localhost:3000/componentNews.html'
			},
			'componentCountNews': {
				'name': 'Количество новостей',
				'value': 3
			}
		};
	}

	getClassName() {
		return 'ObjectVariantFrameNews'
	}

	getDefaultComponentName() {
		return 'Фрейм компонента новостей';
	}

}
