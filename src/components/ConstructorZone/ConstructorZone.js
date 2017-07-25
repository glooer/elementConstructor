import React, { Component } from 'react';
// import $ from 'jquery';
import ConstructorZoneStruct from './ConstructorZoneStruct';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.zoneStruct = new ConstructorZoneStruct;
		this.state = {
			zone: this.setKeysInside(this.zoneStruct.getStruct())
		}

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
	}



	// getNextIteratorId() {
	// 	return this.searchIterator++;
	// }

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

	getNewComponent(...args) {
		return this.zoneStruct.getNewComponent(...args)
	}

	createAndInsertElementToRow(element_name, container_id, insertBefore = undefined) {
		let new_component = this.getNewComponent(element_name);
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

	stateUpdateElementById(...args) {
		return this.zoneStruct.stateUpdateElementById(...args);
	}


	setKeysInside(...args) {
		return this.zoneStruct.setKeysInside(...args);
		// if (Array.isArray(state)) {
		// 	state.map((item) => {
		// 		return this.setKeysInside(item)
		// 	})
		// } else if (state.rows) {
		// 	state.id = this.getNextIteratorId();
		// 	state.rows.map(item => {
		// 		return this.setKeysInside(item)
		// 	})
		// } else {
		// 	if (!state.id) {
		// 		state.id = this.getNextIteratorId();
		// 	}
		// }
		//
		// return state;
	}

	setKeysZone() {
		this.searchIterator = this.getMaxId(this.state.zone)

		this.setState(prevState => {
			prevState.zone = this.setKeysInside(prevState.zone)
			return prevState;
		})
	}

	getMaxId(...args) {
		return this.zoneStruct.getMaxId(...args)
	}

	recursiveSearch(...args) {
		return this.zoneStruct.recursiveSearch(...args)
	}

	getCurrentState() {
		return this.state.zone;
	}

	getElementById(...args) {
		return this.zoneStruct.getElementById(...args);
		// let element = $.extend(true, {}, this.recursiveSearch(prevState, id))
		//
		// return $.isEmptyObject(element) ? null : element
	}

	updatePropsById(id, props) {
		let element = this.getElementById(id, this.getCurrentState());

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
		console.log(id);
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
