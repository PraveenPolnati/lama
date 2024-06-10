import {BrowserRouter,Switch,Route} from 'react-router-dom'
import './App.css'
import { Component } from 'react'
import Home from './components/Home'
import Projects from './components/Projects'
import ProjectDetails from './components/ProjectDetails'
import Transcript from './components/Transcript'
import ProtectedRoute from './components/ProtectedRoute'
import WedgetConfiguration from './components/WedgetConfiguration'
import AccountSettings from './components/AccountSettings'

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/projects' component={Projects}/>
          <ProtectedRoute exact path='/projectDetails/:id' component={ProjectDetails}/>
          <ProtectedRoute exact path="/projectDetails/:id/transcript" component={Transcript} />
          <ProtectedRoute exact path='/projectDetails/wedgetconfiguration/:id' component={WedgetConfiguration}/>
          <ProtectedRoute exact path='/accountSettings/:id' component={AccountSettings}/>
          <Route component={WedgetConfiguration}/>
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App