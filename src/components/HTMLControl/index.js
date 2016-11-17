import React, { Component, PropTypes } from 'react'

import { classname } from '../../util'

export default type => Control => class extends Component {

	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
		checked: PropTypes.bool,
		invalid: PropTypes.bool,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseDown: PropTypes.func,
		preventClickFocus: PropTypes.bool
	}

	constructor(props) {
		super(props)
		this.state = {
			type: props.type || 'text',
			value: props.value || '',
			checked: props.checked || false,
			invalid: props.invalid || Boolean(props.error) || false,
			focused: false,
			hovered: false,
			pressed: false
		}

		this.onMouseUp = this.onMouseUp.bind(this)
	}

	componentWillReceiveProps({ value, checked, invalid }) {
		this.setState({
			value,
			checked,
			invalid
		})
	}

	shouldComponentUpdate(props, state) {
		return props.disabled !== this.props.disabled ||

		       state.value !== this.state.value ||
		       state.invalid !== this.state.invalid ||

		       state.focused !== this.state.focused ||
					 state.hovered !== this.state.hovered ||
					 state.pressed !== this.state.pressed ||

					 state.checked !== this.state.checked
	}

	reset() {
		this.setState({
			value: props.value || '',
			checked: props.checked || false
		})
	}

	onChange(e) {
		this.setState({
			value: e.target.value,
			checked: e.target.checked,
			focus: true
		})

		if (this.props.onChange) {
			this.props.onChange(e)
		}
	}

	onFocus(e) {
		if (!(this.props.preventClickFocus && this.state.pressed)) {
			this.setState({
				focused: true
			})
		}

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

		document.addEventListener('mouseup', this.onMouseUp)
	}

	onMouseUp(e) {
		this.setState({
			pressed: false
		})

		document.removeEventListener('mouseup', this.onMouseUp)
	}

	render() {
		let mods = []
		const { type, value, checked, focused, hovered, pressed, invalid } = this.state

		const { disabled, ...props } = this.props

		focused && mods.push('focus')
		hovered && mods.push('hover')
		pressed && mods.push('active')
		invalid && mods.push('invalid')
		checked && mods.push('checked')

		disabled && mods.push('disabled')

		const className = classname('Input', mods, this.props.className)

		Object.assign(props, {
			className,
			checked,
			type,
			value,
			onChange: this.onChange.bind(this),
			onFocus: this.onFocus.bind(this),
			onBlur: this.onBlur.bind(this),
			onMouseEnter: this.onMouseEnter.bind(this),
			onMouseLeave: this.onMouseLeave.bind(this),
			onMouseDown: this.onMouseDown.bind(this)
		})

		return (
			<Control {...props} />
		)
	}
}
