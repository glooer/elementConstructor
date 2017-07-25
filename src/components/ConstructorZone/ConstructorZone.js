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

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
	}

	componentList() {
		return {
			VariantElementText: VariantElementText,
			VariantElementImg: VariantElementImg,
		}
	}

	getComponentObjectByName(element_name) {
		let componentList = this.componentList();
		return new componentList[element_name];
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

	moveElement(id, container_id, insertBefore = undefined) {
		let element = this.getElementById(id);
		this.setState(prevState => {
			prevState.zone = this.searchElementAndDeleteById(id, prevState.zone);
			let component = this.getRowWithNewComponent(element, container_id, insertBefore, prevState.zone)
			container_id = container_id.split(/_/)[0];
			prevState.zone = this.stateUpdateElementById(container_id, component, prevState.zone);
			return prevState;
		});
		setTimeout(() => {
			this.forceUpdate()
		}, 1)
	}

	createAndInsertElementToRow(element_name, container_id, insertBefore = undefined) {

		// создаем компонент,
		// т.к. создавать приходиться по названию, то выше есть объект перечисляющий названия.


		let element_params = this.getComponentObjectByName(element_name).getPropsList();

		for (var item in element_params) {
			element_params[item] = element_params[item].value;
		}

		let new_component = {
			id: this.getNextIteratorId(),
			classContainer: 'col-lg-12',
			component: {
				name: element_name,
				params: element_params
			}
		};

		this.insertComponentToRow(new_component, container_id, insertBefore)
	}



	insertComponentToRow(component, container_id, insertBefore = undefined) {
		let row = this.getRowWithNewComponent(component, container_id, insertBefore);
		container_id = container_id.split(/_/)[0];

		this.updateElementById(container_id, row);
	}

	getRowWithNewComponent(component, container_id, insertBefore = undefined, prevState = this.getCurrentState()) {
		let container_offset;
		[container_id, container_offset] = container_id.split(/_/);
		container_offset = Number(container_offset);

		let row = this.getElementById(container_id, prevState);

		let ins = row.rows[container_offset].reduce((acc, val, i) => {
			return val.id == insertBefore ? i : acc;
		}, row.rows[container_offset].length)

		row.rows[container_offset].splice(ins, 0, component)

		return row
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
		let element = $.extend(true, {}, this.recursiveSearch(prevState, id))

		return $.isEmptyObject(element) ? null : element
	}

	changeText(id, text) {

	}

	updatePropsById(id, props) {
		let element = this.getElementById(id);

		if (!element) {
			return;
		}

		if (props['classContainer']) {
			element.classContainer = props['classContainer'];
		}

		Object.keys(element.component.params).forEach(key => {
			if (props[key] !== undefined) {
				element.component.params[key] = props[key]
			}
		})

		this.updateElementById(id, element);
		// почему то состояние не обновляется сразу, точнее само состояние обновляется но дом нет.
		// в чем проблема я не знаю,
		// возможно если знать рекат по лучше это очевидно, но не сейчас
		setTimeout(() => {
			this.setState(e => e)
		}, 1)
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

	setStateToPropertyObject(id) {
		let element = this.getElementById(id)
		this.props.onChangeCurrentElementForChangeProperty(element)
	}

	variantElementFactory(element) {
		if (!element.component) {
			return
		}
		switch (element.component.name) {
			case 'VariantElementText':
				return <VariantElementText data={element} setStateToPropertyObject={ this.setStateToPropertyObject } />
			case 'VariantElementImg':
				return <VariantElementImg data={element} setStateToPropertyObject={ this.setStateToPropertyObject } />
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
					{ this.variantElementContainerRender([this.getCurrentState()]) }
				</div>
				<button onClick={ () => {
					console.log(this.getCurrentState());
				} }>тест!</button>
				<button onClick={ () => {
					this.moveElement("5234")
				} }>moveElement</button>
			</div>
		)
	}
}
