import React from 'react'
import parentTypes from './parentTypes'
import ParentType from './ParentType'

export default React.createClass({
  render () {
    const types = parentTypes.map((parentType, index) => {
      const items = this.props.items.filter((item) => {
        return item.parentType === parentType
      })
      return <ParentType key={index} parentType={parentType} items={items} />
    })
    return (
      <div>
        <h4>Named Items</h4>
        {types}
      </div>
    )
  }
})