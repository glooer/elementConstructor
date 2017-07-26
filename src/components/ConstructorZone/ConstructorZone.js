import React, { Component } from 'react';
// import $ from 'jquery';
import ConstructorZoneStruct from './ConstructorZoneStruct';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'
import VariantElementContainer from '../ConstructorPalette/Variant/VariantElementContainer'

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.zoneStruct = new ConstructorZoneStruct;
		this.state = {
			zone: this.zoneStruct.setKeysInside(this.zoneStruct.getStruct())
		}

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
		this.dropZoneClickHander = this.dropZoneClickHander.bind(this)
	}

	forceUpdateZone() {
		this.setState(prevState => {
			prevState.zone = this.zoneStruct.getStruct();
			return prevState;
		})

		// почему то состояние не обновляется сразу, точнее само состояние обновляется но дом нет.
		// в чем проблема я не знаю,
		// возможно если знать рекат по лучше это очевидно, но не сейчас
		setTimeout(() => {
			this.forceUpdate()
		}, 0)
	}


	deleteElementById(element_id) {
		if (element_id.toString().match(/_/)) {
			this.zoneStruct.deleteZoneById(element_id)
		} else {
			this.zoneStruct._searchElementAndDeleteById(element_id)
		}
		this.forceUpdateZone();
	}

	deleteZoneById(zone_id) {
		this.zoneStruct.deleteZoneById(zone_id);
		this.forceUpdateZone();
	}

	moveElement(id, container_id, insert_before = undefined) {
		console.log(arguments);
		this.zoneStruct._moveElement(id, container_id, insert_before)
		this.forceUpdateZone();
	}

	updateElementById(id, component) {
		this.zoneStruct._stateUpdateElementById(id, component);
		this.forceUpdateZone();
	}

	getCurrentState() {
		return this.state.zone;
	}

	createAndInsertElementToRow(element_name, container_id, insert_before = undefined) {
		this.zoneStruct._createAndInsertElementToRow(element_name, container_id, insert_before)
		this.forceUpdateZone();
	}

	updatePropsById(id, props) {
		this.zoneStruct.updatePropsById(id, props);
		this.forceUpdateZone();
	}

	click() {
		console.log(this.state);
	}

	setStateToPropertyObject(id) {
		let element = this.zoneStruct.getElementById(id)
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

	dropZoneClickHander(event) {
		if (event.currentTarget != event.target) {
			return;
		}

		let id = event.target.dataset.elementId;
		this.props.onChangeCurrentRowForChangeProperty(id)
	}

	variantElementContainerRender(components, i = null) {
		return (
			<div data-element-id={ i } data-type="row" className="row constructor-drop-zone__container" ref={this.props.dragula} onClick={ this.dropZoneClickHander }>
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
					this.deleteZoneById("5235_0")
				} }>deleteZone</button>
			</div>
		)
	}
}
