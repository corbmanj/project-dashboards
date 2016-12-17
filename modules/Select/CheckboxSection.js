import React from 'react'

export const CheckboxSection = React.createClass({
  toggleItem: function (ev) {
    this.props.toggle(ev.target.value, ev.target.checked)
  },
  render() {
    const checkboxes = this.props.outfit.items.map((item, key) => {
      return (
        <label key={key}>
          <input 
            type="checkbox" 
            value={item.type} 
            defaultChecked={!item.isNotIncluded}
            onClick={this.toggleItem}
            disabled={this.props.disabled}
          />
          {item.type}
        </label>
      )
    })
    return <form>{checkboxes}</form>
  }
})