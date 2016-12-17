import React from 'react'

export const AdditionalItemSection = React.createClass({
  addItem () {
    this.props.addItem(this.props.type)
  },
  toggleEditing (item) {
    this.props.toggleEditing(item.id)
  },
  updateItemName (ev, item) {
    this.props.updateItem(item.id, 'name', ev.target.value || item.name)
  },
  renderName (item) {
    return <div>
      <span onDoubleClick={() => this.toggleEditing(item)}>{item.name}</span>
    </div>
  },
  renderEdit (item) {
    return (
      <div>
        <input
          type="text"
          placeholder={item.name}
          autoFocus
          onFocus={ev => ev.target.select()}
          onChange={(ev) => this.updateItemName(ev, item)}
          onBlur={() => this.toggleEditing(item)}
          onKeyPress={(ev) => this.logEvent(ev, item)}
        />
        <span className="curvedBorder"><span className="pt-icon-standard pt-icon-tick" /></span>
      </div>

    )
  },
  logEvent (ev, item) {
    ev.charCode === 13 ? this.toggleEditing(item) : null
  },
  render () {
    const items = this.props.items ? this.props.items.map((item, index) => {
      return (
        <div key={index}>
          {item.editing ? this.renderEdit(item) : this.renderName(item)}
        </div>
      )
    }) : null
    return (
      <div>
        <h4>{this.props.type}<span onClick={this.addItem} className="pt-icon-standard pt-icon-add" /></h4>
        {items}
      </div>)
  }
})