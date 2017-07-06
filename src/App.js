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

  render() {
    return (
			<div className="container-fluid">
				<div className="row constructor__container">
					<ConstructorPalette dragula={this.dragulaDecorator} />
					<ConstructorZone ref="constructorZoneContainer" dragula={this.dragulaDecorator} />
					<ConstructorProperty />
				</div>
			</div>
    );
  }

	_onDrop(el, target, source, sibling) {
		let is_new_element	= !!!el.dataset.elementId,
				elementName			= el.dataset.elementName,
				elementId				= target.dataset.elementId,
				insertBefore;

		try {
			insertBefore = sibling.dataset.elementId
		} catch (e) {
			// если элемента нет, то нужно вставить в конец
		}


		if (is_new_element) {
			this.refs.constructorZoneContainer.createAndInsertElementToRow(elementName, elementId, insertBefore)
		} else {

		}

	}

	_onCancel(el) {
		// this.setState({orders: this.ordersCopy})
	}

	initDragula() {
		var drake = Dragula(this.state.dragula.container, this.state.dragula.options);

		drake.on('drop', (el) => {
			if (el.children[0].className !== 'variant-element-container') {
				return;
			}

			this.dragulaPushContainer(el)
		});

		drake.on("drop", function(el, target, source, sibling) {
			this._onDrop(el, target, source, sibling)
			drake.cancel(true)
		}.bind(this))
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
