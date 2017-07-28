import React, { Component } from 'react';
import RichInputList from './RichInputList'

export default class ConstructorProperty extends Component {

	constructor() {
		super();

		this.state = {
			isRow: false,
			currentElementId: null,
			currentElementProps: {}
		}

		this.saveProps = this.saveProps.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.deleteElement = this.deleteElement.bind(this)
	}

	handleChange(event) {
		let key = event.target.dataset.elementPropsKey;
		let value = event.target.value

		this.setState(prevState => {
			prevState.currentElementProps[key] = value
			return prevState;
		})

		setTimeout(() => {
			this.saveProps();
		}, 1)

	}

	parseBootstrapCols(str) {
		let res = {};

		let patterns = {
			'col-lg': /col-lg-\d+/,
			'col-md': /col-md-\d+/,
			'col-sm': /col-sm-\d+/,
			'col-xs': /col-xs-\d+/,
		}

		let temp;
		for (let pattern in patterns) {
			if (temp = str.match(patterns[pattern])) {
				res[pattern] = temp[0];
			} else {
				res[pattern] = null;
			}
		}

		return res;
	}

	setNewProps(obj) {
		this.setState(prevState => {
			prevState.currentElementId = obj.id;
			prevState.isRow = obj.isRow;
			let params = obj.component.params;
			params['classContainer'] = obj.classContainer;

			let bootstrapClasses = this.parseBootstrapCols(obj.classContainer)


			params['col-lg'] = bootstrapClasses['col-lg']; // Large devices Desktops (≥1200px)
			params['col-md'] = bootstrapClasses['col-md']; // Medium devices Desktops (≥992px)
			params['col-sm'] = bootstrapClasses['col-sm']; // Small devices Tablets (≥768px)
			params['col-xs'] = bootstrapClasses['col-xs']; //	Extra small devices Phones (<768px)
			prevState.currentElementProps = params;
			prevState.default_params = obj.component.default_params;
			return prevState;
		});
	}

	saveProps() {
		let bootstrapClasses = [
			this.state.currentElementProps['col-lg'],
			this.state.currentElementProps['col-md'],
			this.state.currentElementProps['col-sm'],
			this.state.currentElementProps['col-xs'],
		].filter(v => !!v);

		this.state.currentElementProps.classContainer = this.state.currentElementProps.classContainer.split(/ /).filter(v => !/col-(lg|md|sm|xs)-\d+/.test(v)).concat(bootstrapClasses).join(' ');

		this.props.onChangeElementProps(this.state)
	}

	deleteElement() {
		this.setState({
			currentElementId: null
		})
		this.props.onDeleteElementProps(this.state.currentElementId);
	}

	getInputElement(args) {
		if (args.type === 'json_list') {
			return (
				<RichInputList data-element-props-key={ args.key } safeData={ args.value } onChange={ this.handleChange }/>
			);
		}

		if (args.type === 'select') {

			// значения по умолчанию могут быть как объектом так и массивом
			// если пришел массив, то его значения становятся ключами

			if (Array.isArray(args.defaultValue)) {
				args.defaultValue = args.defaultValue.reduce((acc, val) => {
					acc[val] = val;
					return acc;
				}, {})
			}

			return (
				<select value={ args.value } data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } >
					{ Object.keys(args.defaultValue).map(val => (
						<option value={ val }>{ args.defaultValue[val] }</option>
					)) }
				</select>
			)
		}

		if (args.type === 'textarea') {
			return (
				<textarea data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } value={ args.value }></textarea>
			)
		}

		return (
			<input type={ 'text' } data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } value={ args.value } />
		)
	}

	renderInputElement(args) {
		return (
			<div className="form-group">
				<label>{ args.name || args.key }</label>
				{ this.getInputElement(args) }
			</div>
		)
	}

	render() {
		let props = this.state.currentElementProps;
		if (!this.state.currentElementId) {
			return (
				<div className="col-lg-2 constructor-propertys__container">
					<h3>Элемент не выбран</h3>
				</div>
			);
		}

		return (
			<div className="col-lg-2 constructor-propertys__container">
				<h3>Текущий номер элемента: { this.state.currentElementId }</h3>
				<div>
					{
						Object.keys(props).map(key => {
							let obj = (this.state.default_params && this.state.default_params[key]) || {};
							obj.key = key;
							obj.value = props[key] || "";

							return this.renderInputElement(obj);
						})
					}
				</div>
				<div className="form-group">
					<button className="btn btn-info" onClick={ this.saveProps }>Сохранить</button>
					<button className="btn btn-danger" style={ {marginLeft: '1rem'} } onClick={ this.deleteElement }>Удалить</button>
				</div>
			</div>
		)
	}
}
