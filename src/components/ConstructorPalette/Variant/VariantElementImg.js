import React from 'react';
import Component from './VariantBase'

export default class VariantElementImg extends Component {

	constructor() {
		super()
		this.deepGetParam = this.deepGetParam.bind(this)
	}

	getClassName() {
		return 'VariantElementImg'
	}

	getPropsList() {
		return {
			'src': {
				'name': 'картинка',
				'value': '/'
			},
			'alt': {
				'name': 'alt',
				'value': ''
			},
			'className': {
				'name': 'имя класса',
				'value': '',
				'defaultValue': 'img-thumbnail'
			},
			'width': {
				'name': 'Ширина',
				'value': '',
				'defaultValue': ''
			},
			'height': {
				'name': 'Ширина',
				'value': '',
				'defaultValue': ''
			},

			'align': {
				'name': 'Выравнивание',
				'type': 'select',
				'value': 'initial',
				'defaultValue': {
					'initial': 'По умолчанию',
					'center': 'center',
					'left': 'left',
					'right': 'right',
				}
			},

			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
		};
	}

	render() {

		let element_class_name = this.classNameToCss(this.getClassName());

		switch (this.deepGetParam('align')) {
			case 'center':
				element_class_name += ' text-center'
				break;
			case 'right':
				element_class_name += ' text-right'
				break;
			default:
				break;
		}

		console.log(element_class_name);

		return (
			<div key={ this.state.data.id } onClick={ this.setStateToPropertyObject } data-element-name={ this.getClassName() } data-element-id={ this.state.data.id } className={ this.state.data.classContainer }>
				<div className={ "variant-element__container" + (this.deepGet(this.state, ['raw', 'is_active']) ? ' active' : '') }>
					<div className={ element_class_name }>
						{ this.renderElement() }
					</div>
				</div>
			</div>
		)
	}

	renderElement() {


		let css_style = this.inlineStyleToObject(this.deepGetParam('style'));

		return (
			<img
				style={ css_style }
				className={ this.deepGetParam('className') }
				src={ this.deepGetParam('src', '/') }
				alt={ this.deepGetParam('alt') }
				width={ this.deepGetParam('width') }
				height={ this.deepGetParam('height') }
			/>
		)
	}
}
