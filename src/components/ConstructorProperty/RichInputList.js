import React, { Component } from 'react';

export default class RichInputList extends Component {

	getDefaultState() {
		return [
			{link: '', name: ''},
			{link: '', name: ''},
		]
	}

	constructor(props) {
		super(props);

		let current_state = this.getDefaultState()
		let safe_data = this.props.safeData


		if (safe_data) {
			if ((typeof safe_data) == 'string') {
				safe_data = JSON.parse(safe_data);
			}

			current_state = safe_data;
		}
		this.state = {
			data: current_state
		}

		this.inputChangeHandle = this.inputChangeHandle.bind(this)
		this.appendInputHandle = this.appendInputHandle.bind(this)
		this.deleteElementHandle = this.deleteElementHandle.bind(this)
		this.getClearedData = this.getClearedData.bind(this)
	}

	inputChangeHandle(event) {
		let element_id = event.target.dataset.elementId,
				element_name = event.target.dataset.elementName,
				element_value = event.target.value;

		this.setState(prevState => {
			prevState.data[element_id][element_name] = element_value
			return prevState;
		})

		// почему то состояние применяется не мнгновенно, по этому нужно немного подождать
		// может быть там какая то хрень с ассинхронностью
		setTimeout(() => {
			this.props.onChange({
				comment: 'fake event, sorry',
				target: {
					dataset: {
						elementPropsKey: this.props['data-element-props-key']
					},
					value: this.getClearedJsonData()
				}
			})
		}, 1)


	}

	deleteElementHandle(event) {
		let element_id = event.target.dataset.elementId

		this.setState(prevState => {
			prevState.data.splice(element_id, 1)
			return prevState;
		})
	}

	getClearedData() {
		return this.state.data.filter(v => !!v.link).map(v => {
			if (!v.name) {
				v.name = v.link;
			}

			return v;
		})
	}

	getClearedJsonData() {
		return JSON.stringify(this.getClearedData())
	}

	getJsonState() {
		let value = this.getClearedJsonData()

		return value
	}

	appendInputHandle() {
		this.setState(prevState => {
			prevState.data.push({
				link: '',
				name: ''
			})
		})
	}

	render() {
		return (
			<div>
				{
					this.state.data.map((v, key) => {
						return (
							<div key={ key }>
								<div className="form-group">
									<label>Название ссылки</label>
									<input data-element-id={ key } data-element-name="name" type="text" className="form-control" value={ v.name } onChange={ this.inputChangeHandle } />
								</div>
								<div className="form-group">
									<label>Ссылка</label>
									<input data-element-id={ key } data-element-name="link" type="url" placeholder="https://..." className="form-control" value={ v.link } onChange={ this.inputChangeHandle } />
								</div>
								<div className="form-group">
									<button className="btn btn-danger" data-element-id={ key } onClick={ this.deleteElementHandle }>Удалить</button>
								</div>
							</div>
						)
					})
				}
				<div className="form-group">
					<button className="btn btn-default" onClick={ this.appendInputHandle }>Добавить</button>
				</div>
				<input type="hidden" value={ this.getJsonState() } />
			</div>

		)
	}
}
