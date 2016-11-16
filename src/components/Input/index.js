import React, { Component } from 'react'
import HTMLControl from '../HTMLControl'

@HTMLControl('Input')
class Input extends Component {
	render () {
		return (
			<input {...this.props} />
		)
	}
}

export default Input
