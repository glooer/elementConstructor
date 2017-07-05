import React from 'react';

export default class Component extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		}
	}



	componentWillReceiveProps() {
		let value, classContainer, id;
		try {
			value = this.props.data.component.params.text
			classContainer = this.props.data.classContainer
			id = this.props.data.id
		} catch (e) {}

		this.setState((prevState) => {
			prevState.data.value = value
			prevState.data.classContainer = classContainer || 'col-lg-12'
			prevState.data.id = id

			return prevState;
		})
	}

	// если ты дурачок и не соблюдаешь соглашение о именовании классов (они всегда должны быть с большой буквы) то сорян.
	classNameToCss() {
		return this.constructor.name.replace(/[A-Z]/g, v => '-' + v.toLowerCase()).slice(1)
	}

	renderElement() {
		return null;
	}

	render() {
		return (
			<div key={ this.state.data.id } data-element-name={ this.constructor.name } data-element-id={ this.state.data.id } className={ this.state.data.classContainer }>
				<div className="variant-element__container">
					<div className={ this.classNameToCss() }>
						{ this.renderElement() }
					</div>
				</div>
			</div>
		)
	}
}
