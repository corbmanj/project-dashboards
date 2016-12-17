import React from 'react'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'
import AdditionalItemSectionPacking from './AdditionalItemSectionPacking'

export default React.createClass({
  updateStage () {
    let stateObj = {}
    stateObj.currentStage = 'print'
    this.props.updateState(stateObj)
  },
  render() {
    const additionalItemTypes = this.props.tote.additionalItemTypes.map((type, index) => {
      const items = this.props.tote.additionalItems ? this.props.tote.additionalItems.filter(item => {
        return item.type === type
      }) : null
      return (
        <AdditionalItemSectionPacking
          key={index}
          type={type}
          items={items}
        />
      )
    })
    return (
      <div>
        <h3>Packing List</h3>
        <UnnamedItems items={this.props.tote.unnamed} />
        <NamedItems items={this.props.tote.namedItems} />
        {additionalItemTypes}
        <button onClick={this.updateStage}>Print Your Tote</button>
      </div>
    )
  }
})