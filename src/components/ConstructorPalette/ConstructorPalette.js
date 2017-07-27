import React, { Component } from 'react';

import VariantElementContainer from './Variant/VariantElementContainer'
import VariantElementInput from './Variant/VariantElementInput'
import VariantElementText from './Variant/VariantElementText'
import VariantElementImg from './Variant/VariantElementImg'
import VariantElementButton from './Variant/VariantElementButton'
import VariantElementHTML from './Variant/VariantElementHTML'


export default class ConstructorPalette extends Component {



	render() {
		return (
			<div className="col-lg-2 constructor-palette__container">
				<div className="row">
					<div className="variant-elements__container" ref={this.props.dragula}>
						<VariantElementContainer />
						<VariantElementInput />
						<VariantElementText />
						<VariantElementImg />
						<VariantElementButton />
						<VariantElementHTML />
					</div>
				</div>
			</div>
		)
	}
}
