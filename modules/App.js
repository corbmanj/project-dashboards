import React from 'react'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import TopSection from './TopSection'
import Chart from './Chart'
import BottomSection from './BottomSection'
import '../node_modules/@blueprintjs/core/dist/blueprint.css'

export default React.createClass({
  getInitialState: function () {
    return {}
  },

  componentWillMount: function () {
    fetch('https://script.google.com/macros/s/AKfycbwhD2PCeG_rYpsXFW9VmPYmfAErjW4ClrV3DcXEgz7VWrL3pWg/exec')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then((response) => {
        // consolidate data onto one object and store it in state.requests
        for (let req in response.requestedDates) {
          if (response.requestedDates[req]) {
            let domainReq = response.completionDates.find(d => {return d.requestId === response.requestedDates[req].requestId;});
            if (domainReq) {
              response.requestedDates[req].completionDate = domainReq.date || 'future'
              response.requestedDates[req].gap = domainReq.date ? (response.requestedDates[req].date - domainReq.date)/2628288000 : "unplanned"
              response.requestedDates[req].domainId = domainReq.domainId;
              let domain = response.domains.find(d => {return d.id === domainReq.domainId })
              if (domain) {
                response.requestedDates[req].domainName = domain.name
                response.requestedDates[req].domainGroup = domain.group
              }
            }
            let request = response.requests.find(r=> {return r.id === response.requestedDates[req].requestId})
            if (request) {
              response.requestedDates[req].name = request.name
              response.requestedDates[req].number = request.number
              response.requestedDates[req].description = request.description
            }
            let project = response.projects.find(p => {return p.id === response.requestedDates[req].projectId})
            if (project) {
              response.requestedDates[req].projectName = project.name
              response.requestedDates[req].businessCase = project.businessCase
              response.requestedDates[req].work = project.work
              response.requestedDates[req].docs = project.docs
              response.requestedDates[req].summary = project.summary
            }
          }
        }

        for (let project in response.projects) {
          response.projects[project].sgName = response.subjectGroups.find(g => {return g.id === response.projects[project].subjectGroup}).name
          response.projects[project].sgPlan = response.subjectGroups.find(g => {return g.id === response.projects[project].subjectGroup}).plan
        }
        this.setState({requests: response.requestedDates, projects: response.projects})

        // get min and max dates
        let minDate, maxDate
        let dates = response.requestedDates.map(function(item) { if (item.date){return new Date(item.date)}}).filter(function(date){return date!==undefined})
        minDate = Math.min(...dates)
        maxDate = Math.max(...dates)
        dates = response.completionDates.map(function(item) { if (item.date){return new Date(item.date)}}).filter(function(date){return date!==undefined})
        minDate = Math.min(minDate, Math.min(...dates))
        maxDate = Math.max(maxDate, Math.max(...dates))
        // var dateRange = maxDate - minDate
        this.setState({maxDate: maxDate, minDate: minDate})

        // create an object of projects.domains.dates to build chart
        var projectRequests = {}
        for (let req in response.requestedDates){
          let thisReq = response.requestedDates[req]
          if (thisReq.completionDate && thisReq.domainName && thisReq.name && thisReq.projectName) {
            if (!projectRequests[thisReq.projectName]) {projectRequests[thisReq.projectName] = {}}
            if (!projectRequests[thisReq.projectName][thisReq.domainGroup]) { projectRequests[thisReq.projectName][thisReq.domainGroup] = {} }
            if (!projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate]) {
              projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate] = {
                count: 1,
                date: thisReq.completionDate,
                reqNums: [thisReq.number]
              }
            } else {
              projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate].count++;
              projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate].reqNums.push(thisReq.number)
            }
            if (thisReq.completionDate === 'future' || thisReq.compcompletionDate > thisReq.date) {
              projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate].isNotMet = true;
              if (projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate].severity !== 'Need') {
                projectRequests[thisReq.projectName][thisReq.domainGroup][thisReq.completionDate].severity = thisReq.priority
              }
            }
          }
        }
        this.setState({projectRequests: projectRequests, currentProject: response.projects[0]})
      });
  },

  handleChange: function (e) {
    const currentProject = this.state.projects.find(p => {return p.name === e.target.value})
    this.setState({currentProject: currentProject})
  },

  renderSelect: function () {
    const options = this.state.projects.map((project, index) => {
      return <option key={index} value={project.name}>{project.name}</option>
    })
    return (
      <select onChange={this.handleChange}>
        {options}
      </select>
    )
  },

  renderPage: function () {
    return (
      <div>
        {this.renderSelect()}
        <TopSection requests={this.state.requests} currentProject={this.state.currentProject} />
        <Chart /*projects={this.state.projectRequests}*/
          projectName={this.state.currentProject.name}
          currentProject={this.state.projectRequests[this.state.currentProject.name]}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
        />
        <BottomSection requests={this.state.requests} currentProject={this.state.currentProject}/>
      </div>
    )
  },

  renderLoading: function () {
    return <h1>Loading...</h1>
  },

  render () {
    return this.state.currentProject ? this.renderPage() : this.renderLoading()
  }
})
