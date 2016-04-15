import React from 'react';
import {Link} from 'react-router';
import {getUserData} from "../server";
import ResetDatabase from "./databaseReset";

//HomeSidebar, TrendsSidebar, ArchiveSidebar, CalendarSidebar, VoteSidebar, ChatSidebar, SettingsSidebar

//Actual use sidebars with active component highlighted
export class HomeSidebar extends React.Component {
  render() {
    return (<Sidebar active="home" userId="000000000000000000000001"/>);
  }
}

export class TrendsSidebar extends React.Component {
  render() {
    return (<Sidebar active="trends" userId="000000000000000000000001"/>);
  }
}

export class ArchiveSidebar extends React.Component {
  render() {
    return (<Sidebar active="archive" userId="000000000000000000000001"/>);
  }
}

export class CalendarSidebar extends React.Component {
  render() {
    return (<Sidebar active="calendar" userId="000000000000000000000001"/>);
  }
}

export class VoteSidebar extends React.Component {
  render() {
    return (<Sidebar active="vote" userId="000000000000000000000001"/>);
  }
}

export class ChatSidebar extends React.Component {
  render() {
    return (<Sidebar active="chat" userId="000000000000000000000001"/>);
  }
}

export class SettingsSidebar extends React.Component {
  render() {
    return (<Sidebar active="settings" userId="000000000000000000000001"/>);
  }
}


//Standard sidebar object
class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: ""
    };
  }

  refresh() {
    getUserData(this.props.userId, (out) => {this.setState(out)})
   }

  componentDidMount() {
    this.refresh();
  }

  isActivePage(page){
    if (page === this.props.active) {
      return "active"
    }
    return ""
  }

  render() {
    return(

      //START HTML
      <div>

        <h2>Menu</h2>
        <ul className="nav nav-sidebar">

          <li key="home" className={this.isActivePage("home")}> <Link to={"/"}>Home<span className="glyphicon glyphicon-home sidebar-glyph"/></Link> </li>

          <li key="trends" className={this.isActivePage("trends")}> <Link to="/trends">Trends<span className="glyphicon glyphicon-stats sidebar-glyph"/></Link> </li>

          <li key="archive" className={this.isActivePage("archive")}> <Link to="/archive/1">Archive <span className="glyphicon glyphicon-folder-open sidebar-glyph"/></Link> </li>

          <li key="calendar" className={this.isActivePage("calendar")}> <Link to="/calendar">Calendar<span className="glyphicon glyphicon-calendar sidebar-glyph"/></Link> </li>

          <li key="vote" className={this.isActivePage("vote")}> <Link to="vote">Vote<span className="glyphicon glyphicon-pencil sidebar-glyph"/></Link> </li>


    </ul>

        <hr/>

        <ul className="nav nav-sidebar">
        {
          //We keep the ID as the CSS identifies this component using the id
        }
        <div id="sidebar-username">{this.state.fullName.toUpperCase()}</div>

          <li key="chat" className={this.isActivePage("chat")}> <Link to="/chat">Chat<span className="glyphicon glyphicon-comment sidebar-glyph"/></Link> </li>

          <li key="usersettings" className={this.isActivePage("settings")}> <Link to="/usersettings">Settings<span className="glyphicon glyphicon-cog sidebar-glyph"/></Link> </li>

          <li>
            <a href="#logout">Logout <span className="glyphicon glyphicon-lock sidebar-glyph"></span></a>
          </li>

        </ul>

        <hr/>
        <ul className="nav nav-sidebar">
          <li role="presentation">
          <ResetDatabase />
          </li>
        </ul>
        <hr />

        </div>
        //END HTML


    )
  }
}
