import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import Home from './components/home';
import {getUserName} from './server';


class VotePage extends React.Component {
  render() {
    return (
      <p>This is the vote page for party {this.props.params.party}.</p>
    );
  }
}


class HomePage extends React.Component {
  render() {

    return (
      //<p>This is the home page.</p>
      <Home/>
    );
  }
}


/*
class SettingsPage extends React.Component {
  render() {
    return (
      <p>This is the settings page.</p>
    );
  }
}

class TrendPage extends React.Component {
  render() {
    return (
      <p>This is the trends page.</p>
    );
  }
}

class ArchivePage extends React.Component {
  render() {
    return (
      <p>This is the archive page.</p>
    );
  }
}

class CalendarPage extends React.Component {
  render() {
    return (
      <p>This is the calendar page.</p>
    );
  }
}
*/


/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 *
 * If we implemented all of Facebook, this App would also contain Component
 * objects for the left and right content panes.
 */
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class SidebarUsername extends React.Component {

  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = {
      userName: ""
    }
    this.userNameFromID();
  }


// this function will set the state's var userName to the userName corresponding to
// the userId passed to us.
  userNameFromID() {
    getUserName(this.props.userId, (returnedData) => {
      this.setState({userName: returnedData})
      })
    }

  render() {
    return (
      <div> <strong> {this.state.userName} </strong> </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage} />
      <Route path="vote/:party" component={VotePage} />
    </Route>
  </Router>
),document.getElementById('renderPage'));



ReactDOM.render((

  <SidebarUsername userId = {1} />

),document.getElementById('sidebar-username'));
