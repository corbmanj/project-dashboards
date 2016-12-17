import React from 'react'
import { DaySection } from './DaySection'
import { AdditionalItems } from './AdditionalItems'
import { AdditionalItemSection } from './AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  getInitialState: function () {
    return {
      tote: this.props.tote
    }
  },
  validateOutfits: function () {
    // check if all outfits have items
    let isError = false
    let badOutfits = []
      this.props.days.map((day, dayIndex) => {
      let filteredOutfits = day.outfits.filter((outfit) => {
        return !outfit.items
      })
      if (filteredOutfits.length > 0) {isError = true}
      badOutfits.push(filteredOutfits)
    })
    this.setState({isError: isError, badOutfits: badOutfits})
    return isError
  },
  updateOutfits: function () {
    const isError = this.validateOutfits()
    if (!isError) {
      let stateObj = {}
      stateObj.currentStage = 'assign'
      this.props.updateState(stateObj)
    }
  },
  updateTote: function (dayKey, outfitKey, outfit, inc) {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.unnamed = stateObj.tote.unnamed || {}
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        stateObj.tote.unnamed[item.type] = stateObj.tote.unnamed[item.type] ? stateObj.tote.unnamed[item.type] + inc : 1
      }
    })
    this.props.updateState(stateObj)
  },
  updateOutfitName: function (dayKey, outfitKey, name) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayKey].outfits[outfitKey].realName = name
    this.props.updateState(stateObj)
  },
  addItem (type) {
    let stateObj = {}
    stateObj.tote = this.state.tote
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
    let stateObj = this.state.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  },
  updateItem: function (index, property, value) {
    let stateObj = this.state.tote
    stateObj.additionalItems[index][property] = value
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map((day, index) => {
      const imageName = day.icon + index
      return(
        <DaySection
          key={index}
          index={index}
          day={day}
          image={imageName}
          updateTote={this.updateTote}
          updateOutfitName={this.updateOutfitName}
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
    const badOutfits = []
    this.state.badOutfits ? this.state.badOutfits.forEach((day, index) => {
      day.map(outfit => {
        badOutfits.push(<li key={`${index}-${outfit.id}`}>Day {index+1}, {outfit.realName}</li>)
      })
    }) : null
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
          <Collapse isOpen={this.state.isError}>
            <div className="error">There are errors with the following outfits:
              <ul>
                {badOutfits}
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="flex-additional">
          <h2 className="header">Other Items to Pack</h2>
          {additionalItemTypes}
          {/*{additionalItems}*/}
          {/*<button onClick={this.addItem}>Add additional item</button>*/}
        </div>
      </div>
    )
  }
})