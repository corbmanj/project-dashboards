import React from 'react'
import { AssignOutfit } from './AssignOutfit'
import '../../public/skycons'
import { Collapse } from "@blueprintjs/core"

export const AssignDay = React.createClass({
  getInitialState() {
    return {activeOutfit: 1, isOpen: this.props.index === 0}
  },

  updateOutfit: function (itemName, parentType, outfitIndex) {
    this.props.updateOutfit(itemName, parentType, outfitIndex, this.props.index)
  },

  updateActiveOutfit: function (index) {
    this.setState({activeOutfit: index})
  },
  toggleOpen: function () {
    this.setState({isOpen: !this.state.isOpen})
  },

  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return (
        <AssignOutfit
          key={index}
          index={index}
          active={this.state.activeOutfit === outfit.id}
          outfit={outfit}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateOutfit={this.updateOutfit}
          updateActiveOutfit={this.updateActiveOutfit}
        />
      )
    })
    const carotClass = this.state.isOpen ? "pt-icon-chevron-down" : "pt-icon-chevron-right"
    return (
      <li>
        <h3 onClick={this.toggleOpen}>
          <span className={carotClass} />
          {this.props.day.date.format('ddd, MMM Do YYYY')}
        </h3>
        <Collapse isOpen={this.state.isOpen}>
          <ul className="sectionList">
            {outfits}
          </ul>
        </Collapse>
      </li>
    )
  }
})