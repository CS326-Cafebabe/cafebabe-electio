import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'


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
      <p>This is the home page.</p>
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

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage} />
      <Route path="vote/:party" component={VotePage} />
    </Route>
  </Router>
),document.getElementById('renderPage'));
