import React, { Component } from 'react';
// import $ from 'jquery';
import ConstructorZoneStruct from './ConstructorZoneStruct';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'
import VariantElementImg from '../ConstructorPalette/Variant/VariantElementImg'
import VariantElementHTML from '../ConstructorPalette/Variant/VariantElementHTML'
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

		// а ещё сохраним всё что наделали в localStorege

		// почему то состояние не обновляется сразу, точнее само состояние обновляется но дом нет.
		// в чем проблема я не знаю,
		// возможно если знать рекат по лучше это очевидно, но не сейчас
		setTimeout(() => {
			localStorage.setItem('templaterZone', JSON.stringify(this.state.zone));
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
		let new_id = this.zoneStruct._createAndInsertElementToRow(element_name, container_id, insert_before)
		this.forceUpdateZone();

		return new_id;
	}

	updatePropsById(id, props) {
		this.zoneStruct.updatePropsById(id, props);
		this.forceUpdateZone();
	}

	click() {
		console.log(this.state);
	}

	variantElementFactory(element) {
		if (!element.component) {
			return
		}

		element.is_active = element.id == this.state.currentElementInProps;

		switch (element.component.name) {
			case 'VariantElementText':
				return <VariantElementText data={element} setStateToPropertyObject={ this.setStateToPropertyObject } />
			case 'VariantElementImg':
				return <VariantElementImg data={element} setStateToPropertyObject={ this.setStateToPropertyObject } />
			case 'VariantElementHTML':
				return <VariantElementHTML data={element} setStateToPropertyObject={ this.setStateToPropertyObject } />
		}
	}

	variantElementRender(component) {
		return this.variantElementFactory(component) ;
	}

	clearZone() {
		this.zoneStruct.clearState();
		this.forceUpdateZone();
	}

	setStateToPropertyObject(id) {
		// пока такой костыль, это нужно что бы нельзя было удалить самый первый контейнер
		if (id == 2) {
			return;
		}

		let element = this.zoneStruct.getElementById(id)

		if (!element) {
			console.log(`элемент #{id} не найден`);
		}

		if (element.rows) {
			this.props.onChangeCurrentRowForChangeProperty(element)
		} else {
			element.component.default_params = this.zoneStruct.getComponentObjectByName(element.component.name).getDefaultPropsList()
			this.props.onChangeCurrentElementForChangeProperty(element)
		}

		this.setState(prevState => {
			prevState.currentElementInProps = id;
			return prevState;
		})

		// console.log(this.state);
		// this.forceUpdateZone();
		// this.currentElementInProps = id;
		// this.forceUpdate();
	}

	dropZoneClickHander(event) {
		if (event.currentTarget != event.target) {
			return;
		}

		let id = event.target.dataset.elementId;

		if (!id) {
			return;
		}

		let offset;
		[id, offset] = id.toString().split(/_/);
		this.setStateToPropertyObject(id)
	}

	variantElementContainerRender(components, i = null) {
		if (!Array.isArray(components)) {
			components = [components];
		}

		let className = i ? "row constructor-drop-zone__container" : "";
		if (i) {
			if (i.split(/_/)[0] == this.state.currentElementInProps) {
				className += ' active';
			}
		}

		return (
			<div data-element-id={ i } data-type="row" className={ className } ref={ i ? this.props.dragula : null } onClick={ this.dropZoneClickHander }>
				{
					components.map((row) => {
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
					})
				}
			</div>
		)
	}

	render() {
		return (
			<div className="col-lg-8 constructor-zone__container">
				<div>
					{ this.variantElementContainerRender(this.getCurrentState()) }
				</div>
				<button onClick={ () => {
					console.log(this.getCurrentState());
				} }>тест!</button>
				<button onClick={ () => {
					this.clearZone()
				} }>очистить</button>
			</div>
		)
	}
}
