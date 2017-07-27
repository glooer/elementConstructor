import React, { Component } from 'react';

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

	setNewProps(obj) {
		this.setState(prevState => {
			prevState.currentElementId = obj.id;
			prevState.isRow = obj.isRow;
			let params = obj.component.params;
			params['classContainer'] = obj.classContainer;
			prevState.currentElementProps = params;
			prevState.default_params = obj.component.default_params;
			return prevState;
		});
	}

	saveProps() {
		this.props.onChangeElementProps(this.state)
	}

	deleteElement() {
		this.setState({
			currentElementId: null
		})
		this.props.onDeleteElementProps(this.state.currentElementId);
	}

	renderInputGroup(args) {
		return (
			<div className="form-group">
				<label>{ args.name || args.key }</label>
				<input type="text" data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } value={ args.value } />
			</div>
		)
	}

	getInputElement(args) {
		if (args.type === 'select') {
			return (
				<select data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } >
					{ args.defaultValue.map((val, i) => (
						<option>{ val }</option>
					)) }
				</select>
			)
		}

		if (args.type === 'textarea') {
			return (
				<textarea data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange }>{ args.value }</textarea>
			)
		}

		return (
			<input type="text" data-element-props-key={ args.key } className="form-control" onChange={ this.handleChange } value={ args.value } />
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
				<div className="col-lg-2">
					<h3>Элемент не выбран</h3>
				</div>
			);
		}

		return (
			<div className="col-lg-2">
				<h3>Текущий номер элемента: { this.state.currentElementId }</h3>
				<div>
					{
						Object.keys(props).map(key => {
							let obj = (this.state.default_params && this.state.default_params[key]) || {};
							obj.key = key;
							obj.value = props[key];

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
