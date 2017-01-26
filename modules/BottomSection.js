import React from 'react'
require('es6-promise').polyfill()
import moment from 'moment'
import Table from './Table'

export default React.createClass({
  dateToString: function (date) {
    let dateObj = moment(date)
    return dateObj.format("MMM, YYYY");
  },

  renderCompletedTable () {
    const rows = this.props.requests
      .filter(r => {
        return r.projectName === this.props.currentProject.name
      })
      .filter(r => {
        return r.currentStatus === 'Delivered' && r.priority !== 'Watched'
      })
      .sort((a,b) => {
        if (a.date < b.date) {return -1}
        else if (a.date  > b.date) {return 1}
        else if (a.date === b.date) {return 0}
      })
    return <Table requests={rows} title="Delivered Requests"/>
  },

  renderRequestedTable () {
    const rows = this.props.requests
      .filter(r => {
        return r.projectName === this.props.currentProject.name
      })
      .filter(r => {
        return r.currentStatus !== 'Delivered' && r.priority !== 'Watched'
      })
      .sort((a,b) => {
        if (a.date < b.date) {return -1}
        else if (a.date  > b.date) {return 1}
        else if (a.date === b.date) {return 0}
      })
    return <Table requests={rows} title="Pending Requests"/>
  },

  renderWatchedTable () {
    const rows = this.props.requests
      .filter(r => {
        return r.projectName === this.props.currentProject.name
      })
      .filter(r => {
        return r.priority === 'Watched'
      })
      .sort((a,b) => {
        if (a.date < b.date) {return -1}
        else if (a.date  > b.date) {return 1}
        else if (a.date === b.date) {return 0}
      })
    return <Table requests={rows} title="Watched Requests"/>
  },

  render () {
    return (
      <div>
        <h3 className="header">Project Request Gap Details</h3>
        {this.renderCompletedTable()}
        {this.renderRequestedTable()}
        {this.renderWatchedTable()}
      </div>
    )
  }
})