import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBanner from './components/errorbanner';
import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import Home from './components/home';
import Vote from './components/vote';
import Archive from './components/archive';
import Trend from './components/trends';
import ChatList from './components/chatList';
import EmailSettings from './components/emailsettings';
import Settings from './components/settings';
import CalendarExample from './components/calendar';
import {HomeSidebar,
  TrendsSidebar,
  ArchiveSidebar,
  CalendarSidebar,
  VoteSidebar,
  ChatSidebar,
  SettingsSidebar
} from './components/sidebar';
// import DatabaseReset from './components/databaseReset';
// import Calendar from './components/calendar';

class VotePage extends React.Component {
  render() {
    //<p>This is the vote page for party {this.props.params.party}.</p>
    return (
      <div>
        <Vote userId={"000000000000000000000001"}/>
      </div>

    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <Home />
    )
  }
}

class SettingsPage extends React.Component {
  render() {
    return (<Settings userId={"000000000000000000000001"}/>);
  }
}

class TrendPage extends React.Component {
  render() {
    return (<Trend/>);
  }
}

class ArchivePage extends React.Component {
  render() {
    return (<Archive page={this.props.params.page}/>);
  }
}

class CalendarPage extends React.Component {
  render() {
    return (
      <div>
        <CalendarExample />
      </div>
    );
  }
}

class ChatPage extends React.Component {
  render() {
    return (<ChatList/>);
  }
}

class EmailSettingsPage extends React.Component {
  render() {
    return (<EmailSettings userId={"000000000000000000000001"}/>);
  }
}

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
      <div>
        <ErrorBanner />
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage}/>
      <Route path="vote" component={VotePage}/>
      <Route path="calendar" component={CalendarPage}/>
      <Route path="archive/:page" component={ArchivePage}/>
      <Route path="trends" component={TrendPage}/>
      <Route path="usersettings" component={SettingsPage}/>
      <Route path="chat" component={ChatPage}/>
      <Route path="emailsettings" component={EmailSettingsPage}/>
    </Route>
  </Router>
), document.getElementById('renderPage'));

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeSidebar}/>
      <Route path="vote" component={VoteSidebar}/>
      <Route path="calendar" component={CalendarSidebar}/>
      <Route path="archive/:page" component={ArchiveSidebar}/>
      <Route path="trends" component={TrendsSidebar}/>
      <Route path="usersettings" component={SettingsSidebar}/>
      <Route path="chat" component={ChatSidebar}/>
      <Route path="emailsettings" component={SettingsSidebar}/>
    </Route>
  </Router>
), document.getElementById('renderSidebar'));
