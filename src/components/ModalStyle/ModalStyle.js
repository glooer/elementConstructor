import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


export default class ModalStyle extends Component {

	constructor() {
		super();
		this.hideModal = this.hideModal.bind(this)
		this.openModal = this.openModal.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.saveChanges = this.saveChanges.bind(this)
	}

	state = {
		isOpen: false,
		data: ''
	}

	openModal() {
		this.setState({
			isOpen: true
		})
	}

	hideModal() {
		this.setState({
			isOpen: false
		})
	}

	toggleModal() {
		this.setState(prevState => {
			prevState.isOpen = !prevState.isOpen;
			return prevState;
		})
	}

	onChangeHandler(event) {
		this.setState({
			data: event.target.value
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState(prevState => {
			prevState.data = this.props['data-style']
			return prevState;
		})
	}

	saveChanges() {
		this.props.onChangeStyle(this.state.data);
		this.hideModal()
	}

	render() {
		let data = this.state.data;
		if ((typeof data) === "function") {
			data = data();
		}

		return (
			<div>
				<button className="btn btn-default" onClick={ this.toggleModal }>общие стили</button>
				<Modal isOpen={ this.state.isOpen } onRequestHide={ this.hideModal }>
					<ModalHeader>
						<ModalClose onClick={ this.hideModal } />
						<ModalTitle>Редактирование стилей</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<textarea className="form-control" style={
							{
								height: '10rem',
								maxWidth: '100%'
							}
						} value={ data } onChange={ this.onChangeHandler } />
					</ModalBody>
					<ModalFooter>
						<button className='btn btn-default' onClick={ this.hideModal }>
							Закрыть
						</button>
						<button onClick={ this.saveChanges } className='btn btn-primary'>
							Сохранить изменения
						</button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}
