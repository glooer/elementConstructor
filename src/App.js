import React, { Component } 	from 'react';
import logo 									from './logo.svg';
import './App.css';
import Dragula1 							from '../node_modules/dragula/dist/dragula.css';
import Dragula 								from 'react-dragula';
import ConstructorPalette 		from './components/ConstructorPalette/ConstructorPalette'
import ConstructorZone 				from './components/ConstructorZone/ConstructorZone'
import ConstructorProperty 		from './components/ConstructorProperty/ConstructorProperty'
import ScreenResolutions 			from './components/ScreenResolutions/ScreenResolutions'


class App extends Component {
	constructor(args) {
		super(args);
		this.state = {
			dragula: {
				container: [],
				options: {
					removeOnSpill: true,
					copy: (el, source) => {
						return source === this.state.dragula.container[0];
					},
					accepts: (el, target) => {
						return target !== this.state.dragula.container[0]
					},
				}
			}
		}


		this.dragulaDecorator = this.dragulaDecorator.bind(this)
		this.initDragula();
	}

	onChangeCurrentElementForChangeProperty(obj) {
		obj.isRow = false;
		this.refs.constructorPropertyContainer.setNewProps(obj);
	}

	onChangeCurrentRowForChangeProperty(obj) {
		this.refs.constructorPropertyContainer.setNewProps({
			id: obj.id,
			classContainer: obj.classContainer,
			isRow: true,
			component: {
				default_params: obj.default_params,
				params: {
					styleContainer: obj.styleContainer
				}
			}
		});
	}

	onChangeElementProps(state) {
		this.refs.constructorZoneContainer.updatePropsById(state.currentElementId, state.currentElementProps)
	}

	onDeleteElementProps(id) {
		this.refs.constructorZoneContainer.deleteElementById(id)
	}

  render() {
    return (
			<div className="container-fluid">
				<div className="row constructor__container">
					<div className="col-lg-2 constructor-palette__container">
						<div className="row">
							<ScreenResolutions />
							<ConstructorPalette dragula={this.dragulaDecorator} />
						</div>
					</div>
					<div className="col-lg-8 constructor-zone__container">
						<ConstructorZone
							ref="constructorZoneContainer"
							dragula={this.dragulaDecorator}
							onChangeCurrentElementForChangeProperty={ this.onChangeCurrentElementForChangeProperty.bind(this) }
							onChangeCurrentRowForChangeProperty={ this.onChangeCurrentRowForChangeProperty.bind(this) }
						/>
					</div>
					<div className="col-lg-2 constructor-propertys__container">
						<ConstructorProperty
							ref="constructorPropertyContainer"
							onChangeElementProps={ this.onChangeElementProps.bind(this) }
							onDeleteElementProps={ this.onDeleteElementProps.bind(this) }
						/>
					</div>

				</div>
			</div>
    );
  }

	_onDrop(el, target, source, sibling) {
		let is_new_element		= !!!el.dataset.elementId,
				element_id				= el.dataset.elementId,
				container_id			= target.dataset.elementId,
				insertBefore;

		const element_name = el.dataset.elementName;
		console.log(element_name);
		try {
			insertBefore = sibling.dataset.elementId
		} catch (e) {
			// если элемента нет, то нужно вставить в конец
		}


		if (is_new_element) {
			element_id = this.refs.constructorZoneContainer.createAndInsertElementToRow(element_name, container_id, insertBefore)
		} else {
			this.refs.constructorZoneContainer.moveElement(element_id, container_id, insertBefore)
		}


		this.refs.constructorZoneContainer.setStateToPropertyObject(element_id)
	}

	_onRemove(el) {
		const element_id = el.dataset.elementId;
		if (element_id) {
			this.refs.constructorZoneContainer.deleteElementById(element_id);
		}
	}

	_onCancel(el) {
		// this.setState({orders: this.ordersCopy})
	}

	initDragula() {
		const drake = Dragula(this.state.dragula.container, this.state.dragula.options);

		drake.on('drop', (el) => {
			if (el.children[0].className !== 'variant-element-container') {
				return;
			}

			this.dragulaPushContainer(el)
		});

		drake.on("drop", (el, target, source, sibling) => {
			drake.cancel(true)
			this._onDrop(el, target, source, sibling)
		})

		drake.on('remove', (...args) => {
			drake.cancel(true)
			this._onRemove(...args);
		})
	}

	dragulaPushContainer(container) {
		if (container) {
			this.setState((prevState) => {
				let dragula = prevState.dragula
				dragula.container.push(container);
				return {
					dragula: dragula
				}
			})
		}
	}

	dragulaDecorator(componentBackingInstance) {
		this.dragulaPushContainer(componentBackingInstance)
	}

}

export default App;
