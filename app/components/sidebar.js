import React from 'react';
import {Link} from 'react-router';
import {getUserData} from "../server";
import {ResetDatabase} from "../database";

export default class Sidebar extends React.Component {

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

  render() {
    return(

      //START HTML
      <div>

        <h2>Menu</h2>
        <ul className="nav nav-sidebar">
          <li className="active">
            <a href="#/">Home <span className="glyphicon glyphicon-home sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#/trends">Trends <span className="glyphicon glyphicon-stats sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#/archive">Archive <span className="glyphicon glyphicon-folder-open sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#/calendar">Calendar <span className="glyphicon glyphicon-calendar sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#/vote">Vote <span className="glyphicon glyphicon-pencil sidebar-glyph"></span></a>
          </li>

        </ul>

        <hr/>

        <ul className="nav nav-sidebar">
        {
          //We keep the ID as the CSS identifies this component using the id
        }
        <div id="sidebar-username">{this.state.fullName.toUpperCase()}</div>

          <li >
            <a href="#/chat">Chat <span className="glyphicon glyphicon-comment sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#/usersettings">Settings <span className="glyphicon glyphicon-cog sidebar-glyph"></span></a>
          </li>

          <li>
            <a href="#logout">Logout <span className="glyphicon glyphicon-lock sidebar-glyph"></span></a>
          </li>
        </ul>

        <hr/>
        <ul className="nav nav-sidebar">
          <li role="presentation">
          {<ResetDatabase />}
          </li>
        </ul>
        <hr />

        </div>
        //END HTML


    )
  }
}
