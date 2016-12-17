import React from 'react'
import { OutfitSection } from './OutfitSection'
import './../../public/skycons'
import { Collapse } from "@blueprintjs/core"

export const DaySection = React.createClass({
  getInitialState: function () {
    return {
      outfits: this.props.day.outfits,
      isOpen: this.props.index === 0
    }
  },
  toggleOpen () {
    this.setState({isOpen: !this.state.isOpen})
  },
  componentDidMount () {
    var icons = new Skycons({"resizeClear": true})
    icons.add(this.props.image, this.props.day.icon)
    icons.play()
  },
  updateDay: function (key, outfit, inc) {
    let tempState = this.state.outfits
    if (inc === 1) {
      console.log(outfit)
      tempState[key]['items'] = outfit.items
      tempState[key]['name'] = outfit.name
      tempState[key]['type'] = outfit.type
    } else if (inc === -1) {
      tempState[key]['items'] = {}
      tempState[key]['name'] = null
      tempState[key]['type'] = null
    } else if (inc === 0) {
      tempState.splice(key, 1)
    }
    this.setState({outfits: tempState})
    this.props.updateTote(this.props.index, key, outfit, inc)
  },
  updateName: function (key, name) {
    let tempState = this.state.outfits
    tempState[key]['realName'] = name
    this.setState({outfits: tempState})
    this.props.updateOutfitName(this.props.index, key, name)
  },
  addOutfit: function () {
    const num = this.state.outfits.length + 1 || 1
    const newOutfit = {
      id: num,
      realName: "Outfit " + num
    }
    let tempOutfits = this.state.outfits
    tempOutfits.push(newOutfit)
    this.setState({ outfits: tempOutfits, activeOutfit: newOutfit.id })
  },
  updateActiveOutfit: function (index) {
    this.setState({activeOutfit: index})
  },
  render() {
    const outfits = this.state.outfits.map((outfit, index) => {
      return (
        <OutfitSection
          key={index}
          index={index}
          outfit={outfit}
          updateDay={this.updateDay}
          updateName={this.updateName}
          activeOutfit={this.state.activeOutfit || 1}
          updateActiveOutfit={this.updateActiveOutfit}
        />
      )
    })
    const carotClass = this.state.isOpen ? "pt-icon-chevron-down" : "pt-icon-chevron-right"
    return (
      <li>
        <h4 onClick={this.toggleOpen}>
          <span className={carotClass} />
          {this.props.day.date.format('ddd, MMM Do YYYY')}
          <canvas id={this.props.image} width="42" height="42"></canvas>
        </h4>
        <Collapse isOpen={this.state.isOpen}>
          <p>{this.props.day.summary}</p>
          <p>High: {this.props.day.high} Low: {this.props.day.low}</p>
          <ul className="sectionList">
            {outfits}
          </ul>
          <button onClick={this.addOutfit}>Add Outfit</button>
          <hr />
        </Collapse>
      </li>
    )
  }
})