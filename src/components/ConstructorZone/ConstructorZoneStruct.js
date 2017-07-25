
import $ from 'jquery';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'

export default class ConstructorZoneStruct {

	getElementById(id, prevState = this.getStruct()) {
		let element = $.extend(true, {}, this.recursiveSearch(prevState, id))

		return $.isEmptyObject(element) ? null : element
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

	getNewComponent(element_name) {
		// создаем компонент,
		// т.к. создавать приходиться по названию, то выше есть объект перечисляющий названия.
		let element_params = this.getComponentObjectByName(element_name).getPropsList();

		for (var item in element_params) {
			element_params[item] = element_params[item].value;
		}

		return {
			id: this.getNextIteratorId(),
			classContainer: 'col-lg-12',
			component: {
				name: element_name,
				params: element_params
			}
		};
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

	getNextIteratorId() {
		return this.searchIterator++;
	}

	getStruct() {
		return this.state.data
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

	constructor() {
		this.state = {
			data: {
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
		};

		this.searchIterator = this.getMaxId(this.getStruct()) + 1 || 1;
	}


}
