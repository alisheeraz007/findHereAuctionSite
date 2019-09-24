import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import { getData, addImages } from './actions/action';
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
import ItemDetails from './components/commonComponents/ItemDetails';
import Profile from './components/User Profile/Profile';

firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    firebase.database().ref("wholeData").on('value', (snap) => {
      let obj;
      let postsImg = []
      if (snap.val()) {
        if (snap.val().posts) {
          let posts = Object.values(snap.val().posts);
          for (let i = 0; i < posts.length; i++) {
            firebase.storage().ref(`postImages/images/${posts[i].fileList[0].name}`).getDownloadURL()
              .then((url) => {
                // console.log()
                postsImg.push({ name: posts[i].fileList[0].name, url: url })
                this.props.addImages(postsImg)
              })
          }
        }
        if (postsImg.length) {
          console.log(postsImg)
        }
        obj = {
          type: "wholeData",
          payload: snap.val(),
        }
        this.props.getData(obj.payload)
      }
    });
  }

  render() {
    // console.log(this.props)
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
            path="/home/airconditioners/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/mobiles"
            render={() => <Mobiles
              state={this.state}
            />} />
          <Route
            path="/home/mobiles/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/cameras"
            render={() => <Cameras
              state={this.state}
            />} />
          <Route
            path="/home/cameras/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/refregirators"
            render={() => <Refregirators
              state={this.state}
            />} />
          <Route
            path="/home/refregirators/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/computers"
            render={() => <Computers
              state={this.state}
            />} />
          <Route
            path="/home/computers/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/generators&ups"
            render={() => <Generators
              state={this.state}
            />} />
          <Route
            path="/home/generators&ups/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/games"
            render={() => <Games
              state={this.state}
            />} />
          <Route
            path="/home/games/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/home/audio"
            render={() => <Audio
              state={this.state}
            />} />
          <Route
            path="/home/audio/:topicId"
            render={() => <ItemDetails
              state={this.state}
            />} />

          <Route
            path="/myProfile"
            render={() => <Profile
              state={this.state}
            />} />
            <Route
            path="/myProfile/:topicId"
            render={() => <ItemDetails
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

const matchDispatchToProps = { getData, addImages }

export default connect(mapStateToProps, matchDispatchToProps)(App);
