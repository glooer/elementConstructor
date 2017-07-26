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
		}, 1)
	}


	deleteElementById(element_id) {
		this.zoneStruct._searchElementAndDeleteById(element_id)
		this.forceUpdateZone();
	}

	moveElement(id, container_id, insert_before = undefined) {
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
