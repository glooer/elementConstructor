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
	}

	renderInputGroup(key, value) {
		return (
			<div className="form-group">
				<label>{ key }</label>
				<input type="text" className="form-control" defaultValue={ value } />
			</div>
		)
	}

	render() {
		let props = this.state.currentElementProps

		return (
			<div className="col-lg-2">
				<h3>Текущий номер элемента: { this.state.currentElementId }</h3>
				<div>
					{ Object.keys(props).map(key => {
							let value = props[key]
							return this.renderInputGroup(key, value);
						})
					}
				</div>
				<div className="form-group">
					<button className="btn btn-info">Сохранить</button>
				</div>
			</div>
		)
	}
}
