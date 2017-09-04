import React, { Component } from 'react';

export default class EmptyBlock extends Component {
	render() {
		return (
			<div className="col-lg-12">
				<div className={ this.props.claasName } id={ this.props.id }></div>
			</div>
		)
	}
}
