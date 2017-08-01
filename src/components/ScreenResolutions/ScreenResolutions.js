import React, { Component } from 'react';
import FontAwesome 					from 'react-fontawesome';
import $ 										from 'jquery';

export default class ScreenResolutions extends Component {

	constructor() {
		super();
		this.changeHandler = this.changeHandler.bind(this)
	}

	state = {
		buttons: [
			{
				type: 'mobile',
				title: 'Очень маленькие устройства – Телефоны (<768px)'
			},
			{
				type: 'tablet',
				title: 'Малеьнокие устройства – Планшеты (≥768px)'
			},
			{
				type: 'laptop',
				title: 'Средние устройства – Ноутбуки (≥992px)'
			},
			{
				type: 'desktop',
				title: 'Большие устройства – Настольные компьютеры (≥1200px)'
			},
			{
				type: 'magic',
				title: 'Разрешение выбирается автоматически в зависимости от размеров окна'
			}
		],
		current_button: 'magic'
	}

	onChangeButton(type) {
		const class_list = {
			'mobile'	: 'preview-xs',
			'tablet'	: 'preview-sm',
			'laptop'	: 'preview-md',
			'desktop'	: 'preview-lg',
			'magic'		: '',
		}
		let class_name = class_list[type]

		$('.constructor-zone__container > div').removeClass(Object.values(class_list).join(' ')).addClass(class_name);
	}

	changeHandler(event) {
		let new_button_type = event.currentTarget.dataset.type

		this.setState({
			current_button: new_button_type
		})

		this.onChangeButton(new_button_type)
	}

	render() {
		return (
			<div className="col-lg-12 screen-resolutions__container">
				<div className="btn-group">
					{ this.state.buttons.map(button => {
						let is_active = button.type === this.state.current_button;
						let class_list = ['btn', 'btn-default'];
						if (is_active) {
							class_list.push('active')
						}
						return (
							<button key={ button.type } data-type={ button.type } title={ button.title } className={ class_list.join(' ') } onClick={ this.changeHandler }>
								<FontAwesome name={ button.type } />
							</button>
						)
					}) }
				</div>
			</div>
		)
	}
}
