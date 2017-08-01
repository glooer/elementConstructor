import React, { Component } 	from 'react';
import $ 											from 'jquery';
import HelperCss							from '../../helpers/css';
import ConstructorZoneStruct	from './ConstructorZoneStruct';
import ComponentList 					from '../../helpers/import_palette';
import ModalStyle 						from '../ModalStyle/ModalStyle';

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.zoneStruct = new ConstructorZoneStruct;

		if (localStorage.getItem('templaterZone') && localStorage.getItem('templaterZone') != 'null') {
			this.zoneStruct.setNewState(JSON.parse(localStorage.getItem('templaterZone')));
		}

		this.state = {
			zone: this.zoneStruct.setKeysInside(this.zoneStruct.getStruct()),
			styles: this.zoneStruct.getStyles(),
			scripts: this.zoneStruct.getScripts(),
			isPreview: false
		}

		this.setStateToPropertyObject = this.setStateToPropertyObject.bind(this)
		this.dropZoneClickHander = this.dropZoneClickHander.bind(this)

	}

	forceUpdateZone() {
		this.setState(prevState => {
			prevState.zone = this.zoneStruct.getStruct();
			prevState.styles = this.zoneStruct.getStyles();
			prevState.scripts = this.zoneStruct.getScripts();
			return prevState;
		})

		// почему то состояние не обновляется сразу, точнее само состояние обновляется но дом нет.
		// в чем проблема я не знаю,
		// возможно если знать рекат по лучше это очевидно, но не сейчас
		setTimeout(() => {
			// а ещё сохраним всё что наделали в localStorege
			localStorage.setItem('templaterZone', JSON.stringify(this.zoneStruct.getCurrentState()));
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

	getCurrentStyles() {
		return this.state.styles;
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

		return React.createElement(ComponentList.list[element.component.name], {
			data: element,
			setStateToPropertyObject: this.setStateToPropertyObject
		})
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
		if (id == 1) {
			return;
		}

		let element = this.zoneStruct.getElementById(id)

		if (!element) {
			console.log(`элемент #{id} не найден`);
		}

		if (element.rows) {
			element.default_params = this.zoneStruct.getComponentObjectByName('VariantElementContainer').getDefaultPropsList();
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

	variantElementContainerRender(components, i = null, style = "") {
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
			<div data-element-id={ i } data-type="row" style={ HelperCss.inlineStyleToObject(style) } className={ className } ref={ i ? this.props.dragula : null } onClick={ this.dropZoneClickHander }>
				{
					components.map((row) => {
						if (row.rows) {
							return (
								<div data-element-id={ row.id } data-type={ 'row' } className={ row.classContainer }>
									{ row.rows.map((component, i) => {
										return this.variantElementContainerRender(component, `${row.id}_${i}`, row.styleContainer);
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

	onChangeStyle(style) {
		this.zoneStruct.setStyles(style);
		this.forceUpdateZone();
	}

	renderStyles() {
		let current_style = this.getCurrentStyles()

		return { __html: `<style>${current_style}</style>` }
	}

	render() {
		return (
			<div>
				<div dangerouslySetInnerHTML={ this.renderStyles() }></div>
				<div className="clearfix">
					{ this.variantElementContainerRender(this.getCurrentState()) }
				</div>
				<div style={ { marginTop: '1rem' } }>
					<div className="form-group">
						<div className="btn-group">
							<button className="btn btn-danger" onClick={ () => {
								if (window.confirm('Вы точно хотите очистить?')) {
									this.clearZone()
								}
							} }><span className="glyphicon glyphicon-fire" aria-hidden="true"></span> очистить</button>

							<button className="btn btn-default" onClick={ () => {
								$('.constructor__container').toggleClass('preview');
							} }><span className="glyphicon glyphicon-sunglasses" aria-hidden="true"></span> предпросмотр</button>
							<button className="btn btn-default" onClick={ () => {
								console.log(this.state);
							} }>тест!</button>
						</div>
					</div>
					<div className="form-group">
						<div className="btn-group">
							<ModalStyle onChangeStyle={ this.onChangeStyle.bind(this) } data-style={ this.getCurrentStyles() }/>
						</div>
					</div>
				</div>

			</div>

		)
	}
}
