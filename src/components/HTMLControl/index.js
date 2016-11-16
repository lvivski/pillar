import React, { Component, PropTypes } from 'react'

import { classname } from '../../util'

export default type => Control => class extends Component {

	static propTypes = {
		value: PropTypes.string,
		checked: PropTypes.bool,
		invalid: PropTypes.bool,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func
	}

	constructor(props) {
		super(props)
		this.state = {
			type: 'text',
			value: props.value || '',
			checked: props.checked || false,
			invalid: props.invalid || Boolean(props.error) || false,
			focused: false,
			hovered: false,
			pressed: false
		}
	}

	componentWillReceiveProps({ value, checked, invalid, error }) {
		this.setState({
			value,
			checked,
			invalid: invalid || Boolean(error)
		})
	}

	shouldComponentUpdate(props, state) {
		return props.disabled !== this.props.disabled ||
		       props.error !== this.props.error ||

		       state.value !== this.state.value ||
		       state.invalid !== this.state.invalid ||

		       state.focused !== this.state.focused ||
	           state.hovered !== this.state.hovered ||
	           state.pressed !== this.state.pressed
	}

	reset() {
		this.setState({
			value: props.value || ''
		})
	}

	onChange(e) {
		this.setState({
			value: e.target.value
		})

		if (this.props.onChange) {
			this.props.onChange(e)
		}
	}

	onFocus(e) {
		this.setState({
			focused: true
		})

		if (this.props.onFocus) {
			this.props.onFocus(e)
		}
	}

	onBlur(e) {
		this.setState({
			focused: false
		})

		if (this.props.onBlur) {
			this.props.onBlur(e)
		}
	}

	onMouseEnter(e) {
		this.setState({
			hovered: true
		})

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e)
		}
	}

	onMouseLeave(e) {
		this.setState({
			hovered: false
		})

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e)
		}
	}

	onMouseDown(e) {
		this.setState({
			pressed: true
		})

		if (this.props.onMouseDown) {
			this.props.onMouseDown(e)
		}
	}

	onMouseUp(e) {
		this.setState({
			pressed: false
		})

		if (this.props.onMouseUp) {
			this.props.onMouseUp(e)
		}
	}

	render() {
		let mods = []
		const { type, checked } = this.state

		this.state.focused && mods.push('focus')
		this.state.hovered && mods.push('hover')
		this.state.pressed && mods.push('active')
		this.state.invalid && mods.push('invalid')
		this.props.disabled && mods.push('disabled')

		checked && mods.push('checked')

		const className = classname('Input', mods, this.props.className)

		const props = {
			...this.props,
			className,
			checked,
			type,
			value: this.state.value,
			onChange: this.onChange.bind(this),
			onFocus: this.onFocus.bind(this),
			onBlur: this.onBlur.bind(this),
			onMouseEnter: this.onMouseEnter.bind(this),
			onMouseLeave: this.onMouseLeave.bind(this),
			onMouseDown: this.onMouseDown.bind(this),
			onMouseUp: this.onMouseUp.bind(this)
		}

		return (
			<Control {...props} />
		)
	}
}
