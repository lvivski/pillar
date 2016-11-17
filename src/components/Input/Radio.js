import React, { Component } from 'react'
import Input from './Input'

const __cache__ = {}

class Radio extends Component {

  componentWillMount() {
    __cache__[this.props.name] = __cache__[this.props.name] || []
    __cache__[this.props.name].push(this)
  }

  componentWillUnmount() {
    const cache = __cache__[this.props.name]
    const index = cache.indexOf(this)

    if (index !== -1) {
      cache.splice(index, 1)
      if (!cache.length) {
        delete __cache__[this.props.name]
      }
    }
  }

  onChange(e) {
    __cache__[this.props.name].forEach((cached) => {
      if (cached !== this && e.target.checked) {
        cached.setState({
          checked: false
        })
      }
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

	render() {
		return (
			<Input {...this.props} type="radio" onChange={this.onChange.bind(this)} preventClickFocus />
		)
	}
}

export default Radio
