import React, { Component } from 'react';
import VariantElementText from '../ConstructorPalette/Variant/VariantElementText'

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.state = {
			zone: [
				[
					{
						"classContainer": "col-lg-2",
						"component": {
							"name": "VariantElementText",
							"params": {
								"text": "logo"
							}
						}
					},
					{
						"classContainer": "col-lg-8",
						"component": {
								"name": "VariantElementText",
								"params": {
									"text": "search"
								}
						}
					},
					{
						"classContainer": "col-lg-2",
						"component": {
								"name": "VariantElementText",
								"params": {
									"text": "phone"
								}
						}
					},

				],
				[
					{
						"classContainer": "col-lg-12",
						"component": {
							"name": "VariantElementText",
							"params": {
								"text": "sections"
							}
						}
					}
				],
				[
					{
						"classContainer": "col-lg-12",
						"component": {
							"name": "VariantElementText",
							"params": {
								"src": "https://placehold.it/200x200",
								"text": "image"
							}
						}
					}
				],
				[
					{
						"classContainer": "col-lg-4",
						"rows": [
							[
								{
									"classContainer": "col-lg-12",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "category"
										}
									}
								}
							],
							[
								{
									"classContainer": "col-lg-12",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "news"
										}
									}
								}
							],

						]
					},
					{
						"classContainer": "col-lg-8",
						"rows": [
							[
								{
									"classContainer": "col-lg-12",
									"component": {
										"name": "VariantElementText",
										"params": {
											"text": "products"
										}
									}
								}
							]
						]
					}
				]
			]
		}
	}


	variantElementFactory(element) {
		if (!element.component) {
			return
		}
		switch (element.component.name) {
			case 'VariantElementText':
				return <VariantElementText data={element.component} />
		}
	}

	variantElementRender(component) {
		return (
			<div className={ component.classContainer }>
				{ this.variantElementFactory(component) }
			</div>
		);
	}

	variantElementContainerRender(components) {
		return (
			<div className="row constructor-drop-zone__container" ref={this.props.dragula}>
				{ components.map((row) => {
					if (row.rows) {
						return (
							<div className={ row.classContainer }>
								{ row.rows.map(component => {
									return  this.variantElementContainerRender(component);
								}) }
							</div>
						)
					}

					if (row.component) {
						return this.variantElementRender(row)
					}


					// if (Array.isArray(row)) {
					// 	// console.log(row);
					// 	return this.variantElementContainerRender(row)
					// } else {
					// 	if (row.rows) {
					// 		// row.rows.map((component) => {
					// 		// 	return this.variantElementContainerRender(row)
					// 		// })
					// 		console.log('qdwqdqwd',row.rows);
					// 		this.variantElementContainerRender(row.rows);
					// 	} else {
					// 		return this.variantElementRender(row)
					// 	}
					// }
				}) }
			</div>
		)
	}

	render() {
		return (
			<div className="col-lg-8 constructor-zone__container">
				<div className="constructor-drop-zone__container">
					{ this.state.zone.map(element => {
						return this.variantElementContainerRender(element)
					}) }
				</div>
			</div>
		)
	}
}
