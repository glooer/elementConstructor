import React, { Component } from 'react';

import ComponentList from '../../helpers/import_palette';



export default class ConstructorPalette extends Component {

	createComponent(name, key = null) {
		return React.createElement(ComponentList.list[name], {
			key: key,
			data: {
				id: `${name}_template`
			}
		})
	}

	render() {
		return (
			<div>
				<div className="variant-elements__container" ref={this.props.dragula}>
					{
						Object.keys(ComponentList.list).map((name, key) => {
							return this.createComponent(name, `${key}_template_container`)
						})
					}
				</div>
			</div>
		)
	}
}
