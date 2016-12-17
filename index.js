import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Schedule from './modules/Schedule/Schedule'
import SelectOutfits from './modules/Select/SelectOutfits'
import AssignItems from './modules/Assign/AssignItems'
import PackingList from './modules/Packing/PackingList'
import OutfitList from './modules/Print/OutfitList'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/schedule" component={Schedule} />
    <Route path="/select" component={SelectOutfits} />
    <Route path="/assign" component={AssignItems} />
    <Route path="/plist" component={PackingList} />
    <Route path="/print" component={OutfitList} />
  </Router>
), document.getElementById('app'))
