
import $ from 'jquery';
import ZoneData from './ConstructorZoneStructData'
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'
import VariantElementContainer from '../ConstructorPalette/Variant/VariantElementContainer'

export default class ConstructorZoneStruct {

	_searchElementAndDeleteById(element_id) {
		this.state.data = this.searchElementAndDeleteById(element_id, this.getStruct())
	}

	_createAndInsertElementToRow(element_name, container_id, insert_before) {
		let new_component = this.getNewComponent(element_name);
		this.insertComponentToRow(new_component, container_id, insert_before)
	}

	deleteZoneById(zone_id) {
		let zone_offset;

		[zone_id, zone_offset] = zone_id.split(/_/);

		if (!zone_offset) {
			console.log('не передан сдвиг (зона в другой зоне, не знаю вообще возможно ли такое, по этому пока заглушка).');
			return;
		}

		let zone = this.getElementById(zone_id)

		zone.rows.splice(zone_offset, 1);
		this._stateUpdateElementById(zone_id, zone);

	}

	insertComponentToRow(component, container_id, insert_before = undefined) {

		// если контейнера нет, то это корень
		// по этому просто добавляем новый массив
		// по нормальному так должна добавляться любая строка, но пока вот так.
		// это плохо, но пока я не знаю как сделать лучше.
		if (!container_id) {
			this.state.data.rows.push([]);
			return;
		}
		let row = this.getRowWithNewComponent(component, container_id, insert_before);
		container_id = container_id.split(/_/)[0];

		this._stateUpdateElementById(container_id, row);

	}

	_moveElement(id, container_id, insertBefore = undefined) {
		let element = this.getElementById(id);
		this._searchElementAndDeleteById(id);
		let component = this.getRowWithNewComponent(element, container_id, insertBefore);

		container_id = container_id.split(/_/)[0];

		this._stateUpdateElementById(container_id, component);
	}

	getRowWithNewComponent(component, container_id, insertBefore = undefined, prevState = this.getStruct()) {
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

	searchElementAndDeleteById(element_id, prevState) {
		return this.stateUpdateElementById(element_id, null, prevState);
	}

	getElementById(id, prevState = this.getStruct()) {
		let element = $.extend(true, {}, this.recursiveSearch(prevState, id))
		return $.isEmptyObject(element) ? null : element
	}

	updatePropsById(id, props) {
		let element = this.getElementById(id, this.getStruct());

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

		this._stateUpdateElementById(id, element)
	}

	_stateUpdateElementById(id, component) {
		this.state.data = this.stateUpdateElementById(id, component, this.getStruct())
	}

	stateUpdateElementById(id, component, prevState = this.getStruct()) {
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

	getNewRow() {
		return {
			id: this.getNextIteratorId(),
			classContainer: 'col-lg-12',
			rows: [
				[]
			]
		};
	}

	getNewComponent(element_name) {
		// создаем компонент,
		// т.к. создавать приходиться по названию, то выше есть объект перечисляющий названия.

		// если компонент это контейнер, то у него немного другая страктура
		if (element_name == 'VariantElementContainer') {
			return this.getNewRow();
		}

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
			VariantElementText:				VariantElementText,
			VariantElementImg:				VariantElementImg,
			VariantElementContainer:	VariantElementContainer
		}
	}

	getComponentObjectByName(element_name) {
		let componentList = this.componentList();
		return new componentList[element_name];
	}

	constructor() {
		this.state = {
			data: ZoneData.data
		};

		this.searchIterator = this.getMaxId(this.getStruct()) + 1 || 1;
	}


}
