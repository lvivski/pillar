import React, { Component } from 'react'
import HTMLControl from '../HTMLControl'

import { classname } from '../../util'

@HTMLControl('Input')
class Input extends Component {
	render () {
		const { toggle, ...props } = this.props

		if (toggle) {
			const classNameToggle = `${this.props.className} ToggleInput`;
      return (
          <span className="Toggle">
            <input {...props} className={classNameToggle} />
            <span className="ToggleSlider" />
          </span>
      )
		}

		return (
			<input {...props} />
		)
	}
}

export default Input
