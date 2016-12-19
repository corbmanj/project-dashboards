import React from 'react'
require('es6-promise').polyfill()

export default React.createClass({
  render () {
    const sgPlanLines = this.props.currentProject.sgPlan.split('\n').map((line, index) => {
      return <li key={index}>{line}</li>
    })
    return (
      <div>
        <h1>Product Status Report - {this.props.currentProject.name}</h1>
        <h3 className="header">Status Report Purpose</h3>
        <ul>
          <li>Ensure all product stakeholders are on the same page</li>
          <li>Track progress towards product milestones</li>
          <li>Identify areas where there are gaps in release of content, technology, market requirements</li>
        </ul>
        <h3 className="header">The Plan for {this.props.currentProject.sgName}</h3>
        <ul className="noBullet">
          {sgPlanLines}
        </ul>
        <h3 className="header">Product Definition</h3>
        <ul className="noBullet">
          <li>Business Case: <a href={this.props.currentProject.businessCaseURL ? this.props.currentProject.businessCaseURL["1"] : "#"} target="_blank">{this.props.currentProject.businessCase}</a></li>
          <li>Summary of Work: <a href={this.props.currentProject.workURL ? this.props.currentProject.workURL["1"] : "#"} target="_blank">{this.props.currentProject.work}</a></li>
          <li>Additional Documents: <a href={this.props.currentProject.docsURL ? this.props.currentProject.docsURL["1"] : "#"} target="_blank">{this.props.currentProject.docs}</a></li>
        </ul>
        <h3 className="header">Summary and Recommendations</h3>
        <ul className="noBullet">
          <li>{this.props.currentProject.summary || "Summary and recommendations coming soon"}</li>
        </ul>
      </div>
    )
  }
})