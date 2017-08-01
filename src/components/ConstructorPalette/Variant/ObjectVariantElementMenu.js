import React from 'react';
import Component from './VariantBase'

export default class ObjectVariantElementMenu extends Component {

	getPropsList() {
		return {
			'links': {
				'name': 'Элементы',
				'value': null,
				'defaultValue': "",
				'type': 'json_list'
			},
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
		};
	}

	getClassName() {
		return 'ObjectVariantElementMenu'
	}

	getDefaultComponentName() {
		return 'Меню';
	}

	renderElement() {
		let links = this.deepGetParam('links');

		if (!links) {
			return (
				<div>
					{ this.getDefaultComponentName() }
				</div>
			)
		}

		links = JSON.parse(links);

		return (
			<ul className="list-inline" style={ this.inlineStyleToObject(this.deepGetParam('style')) }>
				{
					links.map(v => {
						return (
							<li>
								<a href={ v.link }>{ v.name }</a>
							</li>
						)
					})
				}
			</ul>

		);
	}
}
