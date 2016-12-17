import React from 'react'

export default React.createClass({
  render () {
    const items = this.props.items.map((item, index) => {
      return <span key={index}>{item.name}{index === this.props.items.length-1 ? null : ','} </span>
    })
    return (
      <div>
        <input type="checkbox" />{this.props.parentType}: {items}
      </div>
    )
  }
})