import React, { Component } from 'react';

export default class ConstructorZone extends Component {

	constructor() {
		super()
		this.state = {
			zone: [
				[
					{
						name: 'VariantElementText',
						props: {
							text: '',
							col: {
								lg: 8,
								md: 5
							},
							color: 'red'
						}
					},
					{
						name: 'VariantElementText',
						props: {
							text: 'big text',
							col: {
								lg: 12,
								md: 5
							},
							color: 'white'
						}
					}
				]
			]
		}
	}

	renderComponents(arg) {

	}

	render() {
		return (
			<div className="col-lg-8 constructor-zone__container">
				<div className="row constructor-drop-zone__container" ref={this.props.dragula}>
					{ this.renderComponents(this.state.zone) }
				</div>
			</div>
		)
	}
}
