import React, { Component } from 'react';
import $ 										from 'jquery';
import ModalStyle 					from '../ModalStyle/ModalStyle';


export default class ZoneChanger extends Component {

	state = {
		isPreview: false,
		isPreviewStack: !$('.constructor__container.preview').length
	}

	constructor() {
		super();
		this.printBodyButton()
	}

	printBodyButton() {
		$('body').append('<div class="btn-preview"><button title="Перейти в режим предпросмотра" class="btn btn-default"><span class="glyphicon glyphicon-sunglasses" aria-hidden="true"></span></button></div>')
		$('.btn-preview > button').on('click', () => {
			this.hideRedactor()
		})
	}

	bodyButtonToggle() {
		$('.btn-preview').toggle()
	}


	zoneClear() {
		this.props.onZoneCleared();

	}

	hideTable() {
		this.setState(prevState => {
			prevState.isPreviewStack = !prevState.isPreviewStack
			this.props.onChangePreviewStack(!prevState.isPreviewStack);
			return prevState;
		})
	}

	hideRedactor() {
		this.setState(prevState => {
			prevState.isPreview = !prevState.isPreview
			this.props.onChangePreview(prevState.isPreview);
			if (prevState.isPreview) {
				prevState.isPreviewStack = false;
			}
			this.bodyButtonToggle()
			return prevState;
		})
	}

	render() {
		console.log();
		return (
			<div className="col-lg-12 screen-resolutions__container">
				<div className="btn-group">
					<button title="Очистить рабочую область" className="btn btn-danger" onClick={ () => {
						if (window.confirm('Вы точно хотите очистить?')) {
							this.zoneClear()
						}
					} }><span className="glyphicon glyphicon-fire" aria-hidden="true"></span></button>
					<button title="Спрятать сетку" className={ "btn btn-default" + (this.state.isPreviewStack ? ' active' : '') } onClick={ () => {
						this.hideTable();
					} }><span className="glyphicon glyphicon-th" aria-hidden="true"></span></button>
					<button title="Перейти в режим предпросмотра" className={ "btn btn-default" + (this.state.isPreview ? ' active' : '') } onClick={ () => {
						this.hideRedactor()
					} }><span className="glyphicon glyphicon-sunglasses" aria-hidden="true"></span></button>
					<ModalStyle onChangeStyle={ this.hideRedactor } data-style={ this.props.dataStyles.data }/>
				</div>

			</div>
		)
	}
}
