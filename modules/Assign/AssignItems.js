import React from 'react'
import { AssignDay } from './AssignDay'
import { AdditionalItemSection } from '../Select/AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  updateNamedItems: function (namedItems) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.namedItems = namedItems
    this.props.updateState(stateObj)
  },
  updateOutfit: function (itemName, parentType, outfitIndex, dayIndex) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayIndex].outfits[outfitIndex].items.filter((item) => {
      return item.parentType === parentType
    }).map((item) => {
      item.name = itemName
    })
    this.props.updateState(stateObj)
  },
  addItem (type) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    let newItem = {}
    newItem.id = stateObj.tote.additionalItems.length
    newItem.name = 'Item Name'
    newItem.type = type
    newItem.editing = true
    stateObj.tote.additionalItems.push(newItem)
    this.props.updateState(stateObj)
  },
  toggleEditing (index) {
    let stateObj = this.props.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  },
  updateItem: function (index, property, value) {
    let stateObj = this.props.tote
    stateObj.additionalItems[index][property] = value
    this.props.updateState(stateObj)
  },
  updateStage: function () {
    let stateObj = {}
    stateObj.currentStage = 'packing'
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map((day, index) => {
      return (
        <AssignDay
          key={index}
          index={index}
          day={day}
          namedItems={this.props.tote.namedItems || []}
          updateNamedItems={this.updateNamedItems}
          updateOutfit={this.updateOutfit}
        />
      )
    })
    const additionalItemTypes = this.props.tote.additionalItemTypes.map((type, index) => {
      const items = this.props.tote.additionalItems ? this.props.tote.additionalItems.filter(item => {
        return item.type === type
      }) : null
      return (
        <AdditionalItemSection
          key={index}
          type={type}
          items={items}
          addItem={this.addItem}
          updateItem={this.updateItem}
          toggleEditing={this.toggleEditing}
        />
      )
    })
    return (
      <div className="flex-container">
        <div className="flex-outfits">
          <h2 className="header">Select Outfits</h2>
          <ul className="sectionList">
            {days}
          </ul>
          <button
            style={{float: 'right'}}
            onClick={this.updateOutfits}
          >Assign Items</button>
          <br />
        </div>
        <div className="flex-additional">
          <h2 className="header">Other Items to Pack</h2>
          {additionalItemTypes}
        </div>
      </div>
    )
  }
})