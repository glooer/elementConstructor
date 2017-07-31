import React, { Component } from 'react';

import ComponentList from '../../helpers/import_palette';


export default class ConstructorPalette extends Component {

	createComponent(name) {
		return React.createElement(ComponentList.list[name], {})
	}

	render() {
		return (
			<div className="col-lg-2 constructor-palette__container">
				<div className="row">
					<div className="variant-elements__container" ref={this.props.dragula}>
						{
							Object.keys(ComponentList.list).map((name) => {
								return this.createComponent(name)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}
