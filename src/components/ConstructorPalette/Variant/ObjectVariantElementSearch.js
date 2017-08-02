import React from 'react';
import Component from './VariantBase'

export default class ObjectVariantElementSearch extends Component {

	getPropsList() {
		return {
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
		};
	}

	getClassName() {
		return 'ObjectVariantElementSearch'
	}

	getDefaultComponentName() {
		return 'Поисковая строка';
	}

	renderElement() {
		return (
			<div className="input-group" style={ this.inlineStyleToObject(this.deepGetParam('style')) }>
				<span className="input-group-addon">
					<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
				</span>
	      <input type="text" className="form-control" placeholder="Я ищу..." />
	      <span className="input-group-btn">
	        <button className="btn btn-default" type="button">Поиск!</button>
	      </span>
	    </div>
		);
	}
}
