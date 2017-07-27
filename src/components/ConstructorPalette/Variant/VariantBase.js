import React from 'react';

export default class Component extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		}

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
		this.renderElement = this.renderElement.bind(this)
	}

	getDefaultPropsList() {
		return this.getPropsList();
	}

	getPropsList() {
		return {};
	}

	deepGetParam(param_name, default_value = null) {
		// довольно дорогая операция поиска значения по умолчанию, если что отключай его первой
		// по сути нужна что бы красиво устанавливать значения по умолчанию.
		if (!default_value) {
			default_value = this.getPropsList()[param_name].defaultValue;
		}

		return this.deepGet(this.state, ['raw', 'component', 'params', param_name], default_value);
	}

	// http://adripofjavascript.com/blog/drips/making-deep-property-access-safe-in-javascript.html
	deepGet(obj, props, default_value) {
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

	componentWillReceiveProps() {
		let value, classContainer, id;
		try {
			value = this.props.data.component.params.text
			classContainer = this.props.data.classContainer
			id = this.props.data.id
		} catch (e) {}

		this.setState((prevState) => {
			prevState.data.value = value
			prevState.data.classContainer = classContainer || 'col-lg-12'
			prevState.data.id = id;
			prevState.raw = this.props.data

			return prevState;
		})
	}

	// если ты дурачок и не соблюдаешь соглашение о именовании классов (они всегда должны быть с большой буквы) то сорян.
	classNameToCss() {
		return this.constructor.name.replace(/[A-Z]/g, v => '-' + v.toLowerCase()).slice(1)
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
			<div key={ this.state.data.id } onClick={ this.setStateToPropertyObject } data-element-name={ this.constructor.name } data-element-id={ this.state.data.id } className={ this.state.data.classContainer }>
				<div className={ "variant-element__container" + (this.deepGet(this.state, ['raw', 'is_active']) ? ' active' : '') }>
					<div className={ this.classNameToCss() }>
						{ this.renderElement() }
					</div>
				</div>
			</div>
		)
	}
}
