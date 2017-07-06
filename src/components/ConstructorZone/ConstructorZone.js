import React, { Component } from 'react';
import $ from 'jquery';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.state = {
			zone: {
				"classContainer": "col-lg-12",
				"rows": [
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
		}

		this.searchIterator = this.getMaxId(this.state.zone) + 1 || 1;
		this.state.zone = this.setKeysInside(this.state.zone);

		this.search = null;
	}

	insertElementAfter() {

	}

	getNextIteratorId() {
		return this.searchIterator++;
	}

	swapElement(element1, element2) {

	}

	searchElementAndDeleteById(element_id, prevState) {
		return this.stateUpdateElementById(element_id, null, prevState)
	}

	deleteElementById(element_id) {
		this.setState(prevState => {
			prevState.zone = this.searchElementAndDeleteById(element_id, prevState.zone);
			console.log(prevState.zone);
			return prevState;
		})
	}

	moveElement() {

	}

	createAndInsertElementToRow(element_name, container_id, insertBefore = undefined) {
		let new_component = {
			id: this.getNextIteratorId(),
			classContainer: 'col-lg-12',
			component: {
				name: element_name,
				params: {
					text: '123'
				}
			}
		};

		this.insertComponentToRow(new_component, container_id, insertBefore)
	}

	insertComponentToRow(component, container_id, insertBefore = undefined) {
		let container_offset;
		[container_id, container_offset] = container_id.split(/_/);
		container_offset = Number(container_offset);

		let row = this.getElementById(container_id);

		let ins = row.rows[container_offset].reduce((acc, val, i) => {
			return val.id == insertBefore ? i : acc;
		}, row.rows[container_offset].length)

		row.rows[container_offset].splice(ins, 0, component)


		this.updateElementById(container_id, row);
	}

	getRowWithNewComponent(component, container_id, insertBefore) {

	}

	updateElementById(id, component) {
		this.setState(prevState => {
			prevState.zone = this.stateUpdateElementById(id, component, prevState.zone);
			return prevState;
		})

		// this.setState(prevState => prevState)
		this.forceUpdate();
	}

	stateUpdateElementById(id, component, prevState) {
		if (prevState.id) {
			if (prevState.id == id) {
				prevState = component;
				return prevState;
			}
		}

		if (Array.isArray(prevState)) {
			prevState = prevState.map(element => {
				return this.stateUpdateElementById(id, component, element)
			}).filter(z => !!z)
		} else if (prevState.rows) {
			prevState.rows = prevState.rows.map(element => {
				return this.stateUpdateElementById(id, component, element)
			})
		}


		return prevState;
	}


	setKeysInside(state) {
		if (Array.isArray(state)) {
			state.map((item) => {
				return this.setKeysInside(item)
			})
		} else if (state.rows) {
			state.id = this.getNextIteratorId();
			state.rows.map(item => {
				return this.setKeysInside(item)
			})
		} else {
			if (!state.id) {
				state.id = this.getNextIteratorId();
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

		return !res || res < state.id ? Number(state.id) : res;
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
			// мы же можем искать и по строке
			if (state.id == id) {
				element = state
			} else {
				state.rows.forEach(item => {
					localElement = this.recursiveSearch(item, id)
					if (localElement && localElement.id == id) {
						element = localElement
					}
				})
			}

		} else if (state.id == id) {
			return state
		}

		return element;
	}

	getCurrentState() {
		return this.state.zone;
	}

	getElementById(id, prevState = this.getCurrentState()) {
		return $.extend(true, {}, this.recursiveSearch(prevState, id))
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
				return <VariantElementText data={element} />
			case 'VariantElementImg':
				return <VariantElementImg data={element} />
		}
	}

	variantElementRender(component) {
		return this.variantElementFactory(component) ;
	}

	variantElementContainerRender(components, i = null) {

		return (
			<div data-element-id={ i } data-type="row" className="row constructor-drop-zone__container" ref={this.props.dragula}>
				{ components.map((row) => {
					if (row.rows) {
						return (
							<div data-element-id={ row.id } data-type={ 'row' } className={ row.classContainer }>
								{ row.rows.map((component, i) => {
									return this.variantElementContainerRender(component, `${row.id}_${i}`);
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
					{ this.variantElementContainerRender([this.state.zone]) }
				</div>
				<button onClick={ () => {
					this.deleteElementById("5234")
				} }>тест!</button>
			</div>
		)
	}
}
