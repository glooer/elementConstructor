import React, { Component } from 'react';
import VariantElementContainer from './Variant/VariantElementContainer'
import VariantElementInput from './Variant/VariantElementInput'
import VariantElementText from './Variant/VariantElementText'
import VariantElementImg from './Variant/VariantElementImg'
import VariantElementButton from './Variant/VariantElementButton'


export default class ConstructorPalette extends Component {
	render() {
		return (
			<div className="col-lg-2 constructor-palette__container">
				<div className="">
					<div className="variant-elements__container">
						<VariantElementContainer />
						<VariantElementInput />
						<VariantElementText />
						<VariantElementImg />
						<VariantElementButton />
					</div>
				</div>
			</div>
		)
	}
}
