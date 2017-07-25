import React, { Component } from 'react';

export default class ConstructorProperty extends Component {

	constructor() {
		super();

		this.state = {
			currentElementId: 123,
			currentElementProps: {
				'text': '123',
				'col': 'reqw',
				'src': 'https://placehold.it/200x200'
			}
		}

		this.saveProps = this.saveProps.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		let key = event.target.dataset.elementPropsKey;
		let value = event.target.value

		this.setState(prevState => {
			prevState.currentElementProps[key] = value
			return prevState;
		})
	}

	renderInputGroup(key, value, name = key) {
		return (
			<div className="form-group">
				<label>{ name }</label>
				<input type="text" data-element-props-key={ key } className="form-control" onChange={ this.handleChange } value={ value } />
			</div>
		)
	}

	saveProps() {
		this.props.onChangeElementProps(this.state)
	}

	render() {
		let props = this.state.currentElementProps

		return (
			<div className="col-lg-2">
				<h3>Текущий номер элемента: { this.state.currentElementId }</h3>
				<div>
					{
						Object.keys(props).map(key => {
							let value = props[key]
							return this.renderInputGroup(key, value);
						})
					}
				</div>
				<div className="form-group">
					<button className="btn btn-info" onClick={ this.saveProps }>Сохранить</button>
				</div>
			</div>
		)
	}
}
