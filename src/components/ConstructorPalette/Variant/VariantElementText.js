import React from 'react';
import Component from './VariantBase'

export default class VariantElementText extends Component {
	renderElement() {
		return (
			<div onClick={ () => {
				console.log('i!');
			} }>
				{ this.state.data.value }
			</div>
		);
	}
}
