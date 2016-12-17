import React from 'react'

export default React.createClass({
  render() {
    const items = this.props.outfit.items.map((item, key) => {
      if (item.name) {
        return <span key={key}>{item.parentType}: {item.name},</span>
      } else { return null }
    })
    return (
      <div>
        <h3>Outfit {this.props.index+1} - {this.props.outfit.name}</h3>
        {items}
      </div>
    )
  }
})