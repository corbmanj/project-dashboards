import React from 'react'
import NavItem from './NavItem'

export default React.createClass({
  updateState (ev) {
    this.props.updateState({currentStage: ev.target.value})
    this.forceUpdate()
  },
  stages: ['home', 'schedule', 'select', 'assign', 'packing', 'print'],
  render() {
    const navLinks = this.stages.map((stage, index) => {
      let classNames = (stage === this.props.active) ? "navLink active" : "navLink"
      let last = (index === this.stages.length-1)
      classNames = this.props[stage] ? "disabled" : classNames
      return <NavItem key={index} stage={stage} updateState={this.updateState} isLast={last} classNames={classNames} disabled={this.props[stage]}/>
    })
    return <div>{navLinks}</div>
  }
})