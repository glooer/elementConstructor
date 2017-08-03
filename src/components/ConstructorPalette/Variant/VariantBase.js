import React from 'react';
import HelperCss from '../../../helpers/css';

export default class Component extends React.Component {
	constructor(props) {
		super(props);

		let params = this.getPropsDefaultParams()

		this.state = {
			data: {
				value: params.value,
				classContainer: params.classContainer,
				id: params.id
			}
		}

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
		this.renderElement = this.renderElement.bind(this)
	}

	getCommonPropsList() {
		return {
			'style': {
				'name': 'Стиль',
				'type': 'textarea',
				'value': ''
			},
			'col-lg': {
				'name': 'Большие устройства – Настольные компьютеры (≥1200px)',
				'type': 'select',
				'value': 'col-xs-12',
				'defaultValue': {
					'col-lg-1': '1/12',
					'col-lg-2': '2/12',
					'col-lg-3': '3/12',
					'col-lg-4': '4/12',
					'col-lg-5': '5/12',
					'col-lg-6': '6/12',
					'col-lg-7': '7/12',
					'col-lg-8': '8/12',
					'col-lg-9': '9/12',
					'col-lg-10': '10/12',
					'col-lg-11': '11/12',
					'col-lg-12': '12/12',
				}
			},
			'col-md': {
				'name': 'Средние устройства – Ноутбуки (≥992px)',
				'type': 'select',
				'value': 'col-xs-12',
				'defaultValue': {
					'col-md-1': '1/12',
					'col-md-2': '2/12',
					'col-md-3': '3/12',
					'col-md-4': '4/12',
					'col-md-5': '5/12',
					'col-md-6': '6/12',
					'col-md-7': '7/12',
					'col-md-8': '8/12',
					'col-md-9': '9/12',
					'col-md-10': '10/12',
					'col-md-11': '11/12',
					'col-md-12': '12/12',
				}
			},
			'col-sm': {
				'name': 'Малеьнокие устройства – Планшеты (≥768px)',
				'type': 'select',
				'value': 'col-xs-12',
				'defaultValue': {
					'col-sm-1': '1/12',
					'col-sm-2': '2/12',
					'col-sm-3': '3/12',
					'col-sm-4': '4/12',
					'col-sm-5': '5/12',
					'col-sm-6': '6/12',
					'col-sm-7': '7/12',
					'col-sm-8': '8/12',
					'col-sm-9': '9/12',
					'col-sm-10': '10/12',
					'col-sm-11': '11/12',
					'col-sm-12': '12/12',
				}
			},
			'col-xs': {
				'name': 'Очень маленькие устройства – Телефоны (<768px)',
				'type': 'select',
				'value': 'col-xs-12',
				'defaultValue': {
					'col-xs-1': '1/12',
					'col-xs-2': '2/12',
					'col-xs-3': '3/12',
					'col-xs-4': '4/12',
					'col-xs-5': '5/12',
					'col-xs-6': '6/12',
					'col-xs-7': '7/12',
					'col-xs-8': '8/12',
					'col-xs-9': '9/12',
					'col-xs-10': '10/12',
					'col-xs-11': '11/12',
					'col-xs-12': '12/12',
				}
			}
		}
	}

	getDefaultPropsList() {
		return Object.assign({}, this.getCommonPropsList(), this.getPropsList());
	}

	getStructElement(element_name) {
		let element_params = this.getPropsList();

		for (var item in element_params) {
			element_params[item] = element_params[item].value;
		}

		return {
			id: null,
			classContainer: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
			component: {
				name: element_name,
				params: element_params
			}
		};
	}

	getPropsList() {
		return {};
	}

	deepGetParam(param_name, default_value = null) {
		// довольно дорогая операция поиска значения по умолчанию, если что отключай его первой
		// по сути нужна что бы красиво устанавливать значения по умолчанию.

		if (!default_value) {
			default_value = this.getDefaultPropsList()[param_name].defaultValue;
		}

		return this.deepGet(this.state, ['raw', 'component', 'params', param_name], default_value);
	}

	deepGetAllParams(default_value = {}) {
		return this.deepGet(this.state, ['raw', 'component', 'params'], default_value);
	}

	// http://adripofjavascript.com/blog/drips/making-deep-property-access-safe-in-javascript.html
	deepGet(obj, props, default_value = '') {
		// If we have reached an undefined/null property
		// then stop executing and return the default value.
		// If no default was provided it will be undefined.
		if (obj === undefined || obj === null) {
			return default_value;
		}

		// If the path array has no more elements, we've reached
		// the intended property and return its value
		if (props.length === 0) {
			return obj;
		}

		// Prepare our found property and path array for recursion
		var foundSoFar = obj[props[0]];
		var remainingProps = props.slice(1);

		return this.deepGet(foundSoFar, remainingProps, default_value);
	}

	getPropsDefaultParams() {
		return {
			value: this.deepGet(this.props, ['data', 'component', 'params', 'text']),
			classContainer: this.deepGet(this.props, ['data', 'classContainer']),
			id: this.deepGet(this.props, ['data', 'id'])

		}
	}

	componentWillReceiveProps() {
		this.setState((prevState) => {
			let params = this.getPropsDefaultParams()
			prevState.data.value = params.value
			prevState.data.classContainer = params.classContainer || 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
			prevState.data.id = params.id;
			prevState.raw = this.props.data;
			return prevState;
		})
	}

	// если ты дурачок и не соблюдаешь соглашение о именовании классов (они всегда должны быть с большой буквы) то сорян.
	classNameToCss(class_name) {
		return class_name.replace(/[A-Z]/g, v => '-' + v.toLowerCase()).slice(1)
	}

	getClassName() {
		return this.constructor.name;
	}

	inlineStyleToObject(style) {
		return HelperCss.inlineStyleToObject(style)
	}

	renderElement() {
		return null;
	}

	// устанавливаем структуру объекта по которому кликнули в объект свойств (что бы можно было его изменять)
	setStateToPropertyObject(event) {
		let id = event.currentTarget.dataset.elementId;

		if (!id) { // если идшник ещё не присвоен, вероятно это компонент из палитры, по этому ничего с ним не делаем.
			return;
		}

		this.props.setStateToPropertyObject(id)
	}

	render() {
		return (
			<div key={ this.state.data.id || Math.random() } onClick={ this.setStateToPropertyObject } data-element-name={ this.getClassName() } data-element-id={ this.state.data.id } className={ this.state.data.classContainer }>
				<div className={ "variant-element__container" + (this.deepGet(this.state, ['raw', 'is_active']) ? ' active' : '') }>
					<div className={ this.classNameToCss(this.getClassName()) }>
						{ this.renderElement() }
					</div>
				</div>
			</div>
		)
	}
}
