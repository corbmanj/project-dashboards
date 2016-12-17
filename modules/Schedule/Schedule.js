import React from 'react'
import moment from 'moment'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default React.createClass({
  getInitialState () {
    return {
      numDays: 0,
      startDate: this.props.startDate ?  moment(this.props.startDate).format('YYYY-MM-DD') : null,
      endDate: this.props.endDate ? moment(this.props.endDate).format('YYYY-MM-DD') : null
    }
  },
  dateToString (dateObj) {
    if (dateObj) {
      return `${dateObj.getFullYear()}-${dateObj.getMonth() < 9 ? '0' : ''}${dateObj.getMonth()+1}-${dateObj.getDate() < 10 ? '0' : ''}${dateObj.getDate()}`
    } else { return null }
  },
  stringToDate (dateStr) {
    if (typeof dateStr === 'string') {
      return new Date(dateStr)
    } else { return dateStr }
  },
  updateSchedule () {
    let that = this
    let stateObj = {}
    fetch(`${baseUrl}/api/googleapis/maps/${this.props.city}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then(function(response) {
        const lat = response.results[0].geometry.location.lat
        const lng = response.results[0].geometry.location.lng

        stateObj.startDate = moment(that.state.startDate)
        stateObj.endDate = moment(that.state.endDate)
        stateObj.days = []
        stateObj.numDays = stateObj.endDate.diff(stateObj.startDate, 'd')+1
        let i = 0
        let j = 0
        while (i < stateObj.numDays) {
          let newDay = {
            date: moment(stateObj.startDate).add(i, 'd')
          }
          fetch(`${baseUrl}/api/darksky/${lat}/${lng}/${newDay.date.unix()}`)
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server")
              }
              return response.json()
            })
            .then(function(ds) {
              newDay.low = ds.daily.data[0].temperatureMin
              newDay.high = ds.daily.data[0].temperatureMax
              newDay.precip = ds.daily.data[0].precipProbability
              newDay.summary = ds.daily.data[0].summary
              newDay.icon = ds.daily.data[0].icon
              newDay.sunrise = ds.daily.data[0].sunriseTime
              newDay.sunset = ds.daily.data[0].sunsetTime
              newDay.outfits = []
              stateObj.days.push(newDay)
            })
            .then(function () {
              j++
              if (j === stateObj.numDays) {
                stateObj.days = stateObj.days.sort(function(a, b) {
                  return a.date.isBefore(b.date) ? -1 : 1
                })
                stateObj.currentStage = 'select'
                that.props.updateState(stateObj)
              }
            })
          i++
        }
      })
  },
  updateDate (ev) {
    let obj = {}
    obj[ev.target.name] = moment(ev.target.value)
    this.setState(obj)
  },
  updateCityState (ev) {
    this.props.updateState({city: ev.target.value})
  },
  render() {
    return (
      <div>
        <h2 className="header">Schedule</h2>
        <form>
          Start Date:
          <input
            defaultValue={this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : null}
            type="date"
            name="startDate"
            onChange={this.updateDate}
          />
          <br />
            End Date:
          <input
            defaultValue={this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : null}
            type="date" name="endDate"
            onChange={this.updateDate}
          />
          <br />
          Destination:
          <input
            onChange={this.updateCityState}
            type="text"
            value={this.props.city || "City, St"}
            onFocus={e => e.target.select()}
          />
        </form>
        <button
          value='select'
          onClick={this.updateSchedule}
          disabled={this.state.startDate && this.state.endDate ? moment(this.state.startDate).isAfter(moment(this.state.endDate)) : true}
        >Select Outfits</button>
      </div>
      )
  }
})
