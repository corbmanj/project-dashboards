import React from 'react'

export const AdditionalItems = React.createClass({
  updateItemName: function (ev) {
    this.props.updateItem(this.props.item.id, 'name', ev.target.value)
  },
  updateItemType: function (ev) {
    this.props.updateItem(this.props.item.id, 'type', ev.target.value)
  },
  render() {
    const options = this.props.types.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    })
    return (
      <div>
        <input
          type="text"
          value={this.props.item.name}
          onChange={this.updateItemName}
        />
        <select onChange={this.updateItemType} value={this.props.item.type || ''}>
          <option value="">Select one...</option>
          {options}
        </select>
      </div>
    )
  }
})