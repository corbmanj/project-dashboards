import React from 'react'
require('es6-promise').polyfill()
import moment from 'moment'

export default React.createClass({
  dateToString: function (date) {
    let dateObj = moment(date)
    return dateObj.format("MMM, YYYY");
  },

  render () {
    const cells = this.props.requests.filter(r => {
      return r.projectName === this.props.currentProject.name
    }).map((req, i) => {
      const className = typeof req.gap === "number" ? req.gap < 0 ? 'red' : 'green' : 'maroon'
      return (
        <tr key={i}>
          <td className="rnum">{req.number}</td>
          <td>{req.description}</td>
          <td>{req.domainName}</td>
          <td className={className}>
            <p><b>Requested:</b> {this.dateToString(req.date)}</p>
            <p>
              <b>Gap:</b> {typeof req.gap === "number" ? `${Math.round(req.gap)} months` : req.gap}
              {className !== "green" && req.priority === "Need" ? <span className="pit-icon-standard pt-icon-error" /> : null}
            </p>
            </td>
          <td>{req.impact}</td>
          <td>{req.mitigation}</td>
          <td>{req.owner}</td>
        </tr>
      )
    })
    return (
      <div>
        <h3 className="header">Project Request Gap Details</h3>
        <table>
          <tbody>
          <tr>
            <th></th>
            <th width="40%">Description</th>
            <th>Domain</th>
            <th width="12%">Gap</th>
            <th>Impact</th>
            <th>Recommended Mitigation</th>
            <th>Owner</th>
          </tr>
          {cells}
          </tbody>
        </table>
      </div>
    )
  }
})