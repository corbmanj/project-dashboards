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

  // render () {
  //   const rows = this.props.requests
  //     .filter(r => {
  //     return r.projectName === this.props.currentProject.name
  //   })
  //     .sort((a,b) => {
  //       if (a.date < b.date) {return -1}
  //       else if (a.date  > b.date) {return 1}
  //       else if (a.date === b.date) {return 0}
  //     })
  //     .map((req, i) => {
  //     const className = typeof req.gap === "number" ? req.gap < 0 ? 'red' : 'green' : 'maroon'
  //     return (
  //       <tr key={i}>
  //         <td className="rnum">{req.number}</td>
  //         <td>{req.name}</td>
  //         <td>{req.description}</td>
  //         <td>{req.domainName}</td>
  //         <td className={className}>
  //           <p><b>Requested:</b> {this.dateToString(req.date)}</p>
  //           <p>
  //             <b>Gap:</b> {typeof req.gap === "number" ? `${Math.round(req.gap)} months ` : `${req.gap} `}
  //             {req.priority === "Need" ? <span className="pt-icon pt-icon-error" /> : null}
  //           </p>
  //           </td>
  //         <td>{req.impact}</td>
  //         <td>{req.mitigation}</td>
  //         <td>{req.owner}</td>
  //       </tr>
  //     )
  //   })
  //   return (
  //     <div>
  //       <h3 className="header">Project Request Gap Details</h3>
  //       <table>
  //         <tbody>
  //         <tr>
  //           <th></th>
  //           <th>Name</th>
  //           <th width="35%">Description</th>
  //           <th>Domain</th>
  //           <th width="12%">Gap</th>
  //           <th>Impact</th>
  //           <th>Recommended Mitigation</th>
  //           <th>Owner</th>
  //         </tr>
  //         {rows}
  //         </tbody>
  //       </table>
  //     </div>
  //   )
  // }
})