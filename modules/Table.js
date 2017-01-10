import React from 'react'
require('es6-promise').polyfill()
import moment from 'moment'

export default React.createClass({
  dateToString: function (date) {
    let dateObj = moment(date)
    return dateObj.format("MMM, YYYY");
  },

  render () {
    const rows = this.props.requests
      .map((req, i) => {
        if (req.currentStatus === 'In Discovery') {req.gap = 'In Discovery'}
        let className
        if (typeof req.gap === "number") {
          if (req.gap < 0) {
            className = 'red'
          } else {className = 'green'}
        } else if (req.currentStatus === 'In Discovery') {className = 'grey'}
        else {className = 'maroon'}

        return (
          <tr key={i}>
            <td className="rnum">{req.number}</td>
            <td>{req.name}</td>
            <td>{req.description}</td>
            <td>{req.domainName}</td>
            <td className={className}>
              <p><b>Requested:</b> {this.dateToString(req.date)}</p>
              <p>
                <b>Gap:</b> {typeof req.gap === "number" ? `${Math.round(req.gap)} months ` : `${req.gap} `}
                {req.priority === "Need" ? <span className="pt-icon pt-icon-error" /> : null}
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
        <table>
          <tbody>
          <tr><th colSpan="8">{this.props.title}</th></tr>
          <tr>
            <th width="4%"></th>
            <th width="9%">Name</th>
            <th width="33%">Description</th>
            <th width="6%">Domain</th>
            <th width="12%">Gap</th>
            <th width="12%">Impact</th>
            <th width="12%">Recommended Mitigation</th>
            <th width="12%">Owner</th>
          </tr>
          {rows}
          </tbody>
        </table>
      </div>
    )
  }
})