import React from 'react';
import Component from './VariantBase'
import axios from 'axios';
import queryString from 'query-string';
import { Map } from 'immutable';

export default class ObjectVariantFrameBase extends Component {

	constructor() {
		super();

		this.state = {
			data: {},
			ajax: {
				url: null,
				response: undefined,
				is_work: false
			}
		}
	}

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
		return 'Фрейм компонента';
	}

	renderUnsaveHTML(url) {

		const ajax = this.state.ajax;
		let html = 'Подождите...'
		if (ajax.url === url) {
			return { __html: ajax.response };
		}

		if (ajax.is_work) {
			return { __html: html }
		}



		axios.get(url).then(res => {
			let url1 = url;

			this.setState(prevState => {
				prevState.ajax = {
					url: url1,
					response: res.data,
					is_work: false
				}
				return prevState;
			})
		}).catch(thrown => {
			let url1 = url;

			this.setState(prevState => {
				prevState.ajax = {
					url: url1,
					response: 'Неверный url',
					is_work: false
				}
				return prevState;
			})
		})

		return { __html: "Подождите.." }
	}

	renderElement() {
		if (this.deepGetParam('componentUrl')) {
			let component_params = Map(this.deepGetAllParams());
			component_params = component_params.delete('componentUrl');

			let url = this.deepGetParam('componentUrl');
			url = url + (/\?/.test(url) ? '&' : '?') + queryString.stringify(component_params.toObject());

			return (
				<div dangerouslySetInnerHTML={ this.renderUnsaveHTML(url) }></div>
			)
		}

		if (this.state.response) {
			return this.state.response;
		}

		return (
			<div>{ this.getDefaultComponentName() }</div>
		);
	}
}
