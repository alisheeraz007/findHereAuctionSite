import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import { getData } from './actions/action';
import { connect } from 'react-redux'
import firebase from 'firebase';
import config from './config/configKey'
import Home from './components/home'
import AirConditionerDashBoard from './components/AirConditioners/AirConditionerDashBoard'
import Mobiles from './components/Mobiles/Mobiles'
import Cameras from './components/Cameras/Cameras';
import Refregirators from './components/Refregirators/Refregirators';
import Computers from './components/Computers/Computers';
import Generators from './components/Generators/Generators';
import Games from './components/Games/Games';
import Audio from './components/Audio/Audio';

firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    // firebase.database().ref().child("WholeData").on('value', (snap) => {
    //   let obj;
    //   if (snap.val()) {
    //     obj = {
    //       type: "WholeData",
    //       payload: snap.val()
    //     }
    //     this.props.getData(obj.payload)
    //   }
    // })
    firebase.database().ref("WholeData").once('value').then((snap) => {
      let obj;
      if (snap.val()) {
        obj = {
          type: "WholeData",
          payload: snap.val()
        }
        this.props.getData(obj.payload)
      }
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Router>

          <Route
            exact path="/"
            render={() => <Home
              state={this.state}
            />} />

          <Route
            path="/home/airconditioners"
            render={() => <AirConditionerDashBoard
              state={this.state}
            />} />

          <Route
            path="/home/mobiles"
            render={() => <Mobiles
              state={this.state}
            />} />

          <Route
            path="/home/cameras"
            render={() => <Cameras
              state={this.state}
            />} />

          <Route
            path="/home/refregirators"
            render={() => <Refregirators
              state={this.state}
            />} />

          <Route
            path="/home/computers"
            render={() => <Computers
              state={this.state}
            />} />

          <Route
            path="/home/generators&ups"
            render={() => <Generators
              state={this.state}
            />} />

          <Route
            path="/home/games"
            render={() => <Games
              state={this.state}
            />} />

          <Route
            path="/home/audio"
            render={() => <Audio
              state={this.state}
            />} />

        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    state
  }
}

const matchDispatchToProps = { getData }

export default connect(mapStateToProps, matchDispatchToProps)(App);
