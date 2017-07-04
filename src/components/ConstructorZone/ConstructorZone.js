import React, { Component } from 'react';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.state = {
			zone: [
				[
					{
						"classContainer": "col-lg-2",
						"component": {
							"name": "VariantElementText",
							"params": {
								"text": "logo"
							}
						}
					},
					{
						"classContainer": "col-lg-8",
						"component": {
								"name": "VariantElementText",
								"params": {
									"text": "search"
								}
						}
					},
					{
						"classContainer": "col-lg-2",
						"component": {
								"name": "VariantElementText",
								"params": {
									"text": "phone"
								}
						}
					},

				],
				[
					{
						"classContainer": "col-lg-12",
						"component": {
							"name": "VariantElementText",
							"params": {
								"text": "sections"
							}
						}
					}
				],
				[
					{
						"classContainer": "col-lg-12",
						"component": {
							"name": "VariantElementText",
							"params": {
								"src": "https://placehold.it/200x200",
								"text": "image"
							}
						}
					}
				],
				[
					{
						"classContainer": "col-lg-4",
						"rows": [
							[
								{
									"classContainer": "col-lg-12",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "category"
										}
									}
								},
								{
									"classContainer": "col-lg-12",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "news"
										}
									}
								}
							],

						]
					},
					{
						"classContainer": "col-lg-8",
						"rows": [
							[
								{
									"classContainer": "col-lg-6",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								},
								{
									"classContainer": "col-lg-6",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								},
								{
									"classContainer": "col-lg-6",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								},
							],
							[
								{
									"id": "42",
									"classContainer": "col-lg-8",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								},
								{
									"id": "5234",
									"classContainer": "col-lg-6",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								},
							]
						]
					}
				]
			]
		}

		this.searchIterator = this.getMaxId(this.state.zone) + 1 || 1;
		this.state.zone = this.setKeysInside(this.state.zone);

		this.search = null;
	}


	setKeysInside(state) {
		if (Array.isArray(state)) {
			state.map((item) => {
				return this.setKeysInside(item)
			})
		} else if (state.rows) {
			state.rows.map(item => {
				return this.setKeysInside(item)
			})
		} else {
			if (!state.id) {
				state.id = this.searchIterator++;
			}
		}

		return state;
	}

	setKeysZone() {
		this.searchIterator = this.getMaxId(this.state.zone)

		this.setState(prevState => {
			prevState.zone = this.setKeysInside(prevState.zone)
			return prevState;
		})

		// this.forceUpdate()
	}

	getMaxId(state, res = 1) {
		if (Array.isArray(state)) {
			state.forEach((item) => {
				res = this.getMaxId(item, res)
			})
		} else if (state.rows) {
			state.rows.forEach(item => {
				res = this.getMaxId(item, res)
			})
		}

		return !res || res < state.id ? state.id : res;
	}


	recursiveSearch(state, id, element = null) {
		var localElement = null;

		if (element) {
			return element;
		}

		if (Array.isArray(state)) {
			state.forEach(item => {
				localElement = this.recursiveSearch(item, id)
				if (localElement && localElement.id == id) {
					element = localElement
				}
			})
		} else if (state.rows) {
			state.rows.forEach(item => {
				localElement = this.recursiveSearch(item, id)
				if (localElement && localElement.id == id) {
					element = localElement
				}
			})
		} else if (state.id == id) {
			return state
		}

		return element;
	}


	getElementById(id) {
		return this.recursiveSearch(this.state.zone, id)

	}

	updateElementById(id, component) {

	}

	changeText(id, text) {

	}

	click() {
		// this.setState(prevState => {
		// 	prevState.zone[0][0].component.params.text = "omg!"
		// 	prevState.zone[0][1].component.params.text = "wat!"
		// 	return prevState;
		// })

		console.log(this.getElementById("42"))
		console.log(this.search);

	}

	variantElementFactory(element) {
		if (!element.component) {
			return
		}
		switch (element.component.name) {
			case 'VariantElementText':
				return <VariantElementText data={element.component} />
		}
	}

	variantElementRender(component) {
		return (
			<div key={component.id} className={ component.classContainer + ' qwe-' + component.id + ' text' + component.component.params.text }>
				{ this.variantElementFactory(component) }
			</div>
		);
	}

	variantElementContainerRender(components) {

		return (
			<div className="row constructor-drop-zone__container" ref={this.props.dragula}>
				{ components.map((row) => {
					if (row.rows) {
						return (
							<div className={ row.classContainer }>
								{ row.rows.map(component => {
									return this.variantElementContainerRender(component);
								}) }
							</div>
						)
					}

					if (row.component) {
						return this.variantElementRender(row)
					}
				}) }
			</div>
		)
	}

	render() {


		return (
			<div className="col-lg-8 constructor-zone__container">
				<div className="constructor-drop-zone__container">
					{ this.state.zone.map(element => {
						return this.variantElementContainerRender(element)
					}) }
				</div>
				<button onClick={ () => this.changeText(42, 'newText!') } >test</button>
				<button onClick={ () => this.click() } >test</button>
			</div>
		)
	}
}
