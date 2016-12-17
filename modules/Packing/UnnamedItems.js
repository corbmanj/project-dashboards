import React from 'react'

export default React.createClass({
  render () {
    const items = Object.keys(this.props.items).map((item, index) => {
      return (
        <div key={index}>
          <input type="checkbox" />
          {item} - {this.props.items[item]}
        </div>
      )
    })
    return (
      <div>
        <h4>Unnamed Items</h4>
        {items}
      </div>
    )
  }
})