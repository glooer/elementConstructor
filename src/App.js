import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dragula1 from '../node_modules/dragula/dist/dragula.css';
import Dragula from 'react-dragula';
import ConstructorPalette from './components/ConstructorPalette/ConstructorPalette'
import ConstructorZone from './components/ConstructorZone/ConstructorZone'
import ConstructorProperty from './components/ConstructorProperty/ConstructorProperty'


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
		// пока такой костыль, это нужно что бы нельзя было удалить самый первый контейнер
		if (obj.id == 2) {
			return;
		}

		this.refs.constructorPropertyContainer.setNewProps({
			id: obj.id,
			classContainer: obj.classContainer,
			isRow: true,
			component: {
				params: {}
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
					<ConstructorPalette dragula={this.dragulaDecorator} />
					<ConstructorZone
						ref="constructorZoneContainer"
						dragula={this.dragulaDecorator}
						onChangeCurrentElementForChangeProperty={ this.onChangeCurrentElementForChangeProperty.bind(this) }
						onChangeCurrentRowForChangeProperty={ this.onChangeCurrentRowForChangeProperty.bind(this) }
					/>
					<ConstructorProperty
						ref="constructorPropertyContainer"
						onChangeElementProps={ this.onChangeElementProps.bind(this) }
						onDeleteElementProps={ this.onDeleteElementProps.bind(this) }
					/>
				</div>
			</div>
    );
  }

	_onDrop(el, target, source, sibling) {
		let is_new_element		= !!!el.dataset.elementId,
				element_name			= el.dataset.elementName,
				element_id				= el.dataset.elementId,
				container_id			= target.dataset.elementId,
				insertBefore;

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
