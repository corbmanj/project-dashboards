import React from 'react'
import Schedule from './Schedule/Schedule'
import SelectOutfits from './Select/SelectOutfits'
import AssignItems from './Assign/AssignItems'
import PackingList from './Packing/PackingList'
import OutfitsList from './Print/OutfitsList'
import NavMenu from './NavBar/NavMenu'
import '../node_modules/@blueprintjs/core/dist/blueprint.css'

export default React.createClass({
  getInitialState: function () {
    return {
      numDays: 0,
      currentStage: 'home',
      tote: {
        additionalItemTypes: ['electronics', 'bags', 'toiletries', 'entertainment', 'snacks', 'misc']
      }
    }
  },
  updateStage: function (newStage) {
    this.setState({ currentStage: newStage.target.value })
  },
  updateState: function (stateObj) {
    this.setState(stateObj)
  },
  renderStage: function(stage) {
    switch (stage) {
      case 'schedule':
        return <Schedule updateState={this.updateState} startDate={this.state.startDate} endDate={this.state.endDate} city={this.state.city}/>
        break
      case 'select':
        return <SelectOutfits updateState={this.updateState} days={this.state.days} tote={this.state.tote}/>
        break
      case 'assign':
        return <AssignItems updateState={this.updateState} days={this.state.days} tote={this.state.tote}/>
        break
      case 'packing':
        return <PackingList updateState={this.updateState} tote={this.state.tote} />
        break
      case 'print':
        return <OutfitsList updateState={this.updateState} days={this.state.days} />
        break
      default:
        return (
          <div>
            <h1>Welcome to Tote</h1>
              <button value='schedule' onClick={this.updateStage}>Get Started</button>
          </div>
        )
    }
  },
  render() {
    return (
      <div>
        <NavMenu
          updateState={this.updateState}
          active={this.state.currentStage}
          tote={this.state.tote}
          home={!this.state.tote}
          schedule={!this.state.tote}
          select={!this.state.days}
          assign={!this.state.tote.unnamed}
          packing={!this.state.tote.namedItems}
          print={!this.state.tote.namedItems}
        />
        {this.renderStage(this.state.currentStage)}
      </div>
    )
  }
})
