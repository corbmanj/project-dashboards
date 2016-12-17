import React from 'react'
import OutfitList from './OutfitList'
import './../../public/skycons'

export default React.createClass({
  componentDidMount () {
    var icons = new Skycons({"resizeClear": true})
    icons.add(this.props.image, this.props.day.icon)
    icons.play()
  },
  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return <OutfitList key={index} index={index} outfit={outfit}/>
      })
    return (
      <div>
        <h2>{this.props.day.date.format('ddd, MMM Do')}<canvas id={this.props.image} width="42" height="42"></canvas></h2>
        <p>{this.props.day.summary}</p>
        <p>High: {this.props.day.high} Low: {this.props.day.low}</p>
        {outfits}
      </div>
    )
  }
})