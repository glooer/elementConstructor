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

	getDefaultComponentName() {
		return 'Поисковая строка';
	}

	renderElement() {
		return (
			<div className="input-group">
				<span className="input-group-addon">
					<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
				</span>
	      <input type="text" className="form-control" placeholder="Search for..." />
	      <span className="input-group-btn">
	        <button className="btn btn-default" type="button">Поиск!</button>
	      </span>
	    </div>
		);
	}
}
