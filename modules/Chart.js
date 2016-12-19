import React from 'react'
require('es6-promise').polyfill()

export default React.createClass({

  getInitialState: function () {
    return {numDomains: Object.keys(this.props.currentProject).length}
  },

  drawChart: function (chart, props) {
    // draw each row
    let domainy = 70;
    let colors = ["#5e412f", "#44A3D7", "78c0a8", "#F07818", "#f0a830", "#8141b2"]
    let i = 0;
    chart.append("text")
      .attr("x", 500)
      .attr("y", 10)
      .text(props.projectName)
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .attr("fill", "grey");
    for (let domain in props.currentProject) {
      if (domain==="Personalized Learning") {domain = "PL";}
      let newRow = chart.append("g")
        .attr("class", "row")
        .attr("transform", "translate(100,"+domainy+")");
      newRow.append("text")
        .attr("x", -100)
        .attr("y", 10)
        .text(domain)
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("fill", colors[i]);
      for (let date in props.currentProject[domain]) {
        var strokeColor = props.currentProject[domain][date].isNotMet ? "red" : colors[i];
        var fillColor = props.currentProject[domain][date].severity === "Need" ? "red" : "white";
        var x = date === "future" ? 950 : (props.currentProject[domain][date].date - props.minDate)/(props.maxDate-props.minDate)*1000;
        var text = props.currentProject[domain][date].count == 1 ? props.currentProject[domain][date].reqNums[0] : props.currentProject[domain][date].count + " req";
        var rqList = props.currentProject[domain][date].reqNums.join(', ');
        newRow.append("circle")
          .attr("cx", x)
          .attr("cy", 5)
          .attr("r", 10)
          .style("fill", fillColor)
          .style("stroke", strokeColor)
          .style("stroke-width", 7)
          .append("svg:title")
          .text(rqList);
        newRow.append("text")
          .attr("x", x-13)
          .attr("y", -10)
          .text(text)
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("font-weight", "bold")
          .attr("fill", strokeColor);
      }
      i++;
      domainy = domainy + 50;
    }
  },

  drawAxis: function (chart, props) {
    // create time scale
    let step = (props.maxDate - props.minDate)/9
    let scaleArray = [props.minDate, props.minDate+step, props.minDate+2*step, props.minDate+3*step, props.minDate+4*step, props.minDate+5*step, props.minDate+6*step, props.minDate+7*step, props.minDate+8*step, props.minDate+9*step]
    let x = d3.time.scale()
      .domain(scaleArray.map(function(date) {
        return new Date(date);
      }))
      .range([100,200,300,400,500,600,700,800,900,1000]);

    // create x axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("top");

    // draw x axis
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,40)")
      .call(xAxis);
  },

  componentDidMount: function () {

    // create chart element
    var chart = d3.select(".chart")
      .attr("width",1400)
      .attr("height",70*this.state.numDomains)
      .append("g")
      .attr("transform","translate(50,10)");

    this.drawAxis(chart, this.props)
    this.drawChart(chart, this.props)
    this.setState({chart: chart})

  },

  componentWillReceiveProps: function (nextProps) {
    console.log('nextProps=',nextProps)
    this.state.chart.selectAll("*").remove();
    if (nextProps.currentProject) {
      this.state.chart.attr("height", 70 * Object.keys(nextProps.currentProject).length || 30)
    }
    this.drawAxis(this.state.chart, nextProps)
    this.drawChart(this.state.chart, nextProps)
  },

  render () {
    return (
      <div id="content" className="content">
        <h3>Project Timeline</h3>
          <svg className="chart"></svg>
      </div>
    )
  }
})