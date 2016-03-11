import React from 'react';
import { getAllEvents } from '../server';
//import { Bar } from 'react-chartjs';

export default class Trends extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "events": [],
      "overall":[],
      "gender":[],
      "ethnic":[]
    }
  }

  //<Bar data={this.state.genderData} id="Gender" redraw height="400px" width="900px"/>

  handleClick(clickEvent, event) {
    clickEvent.preventDefault;
    document.getElementById("upper-summary").innerHTML = "Overall outcome of "+ event.party + " " +event.name + ". " + event.summary;
    document.getElementById("mid-summary").innerHTML = "Gender outcome of "+ event.party + " " +event.name + ". ";
    document.getElementById("lower-summary").innerHTML = "Ethnic outcome of "+ event.party + " " +event.name + ". ";
  }

  refresh() {
    getAllEvents( (out) => {
      this.setState({events: out});
    })
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const events = this.state.events;
    return (
      <div>
        <div className="container-fluid">
          <div className="col-md-12 content">
            <div className="row">
              <div className="col-md-12 trending">
                <h1>TRENDS
                  <small> Graphical Information on Voting Patterns</small>
                </h1>
                <hr/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 articles">
                <h3>Events</h3>
                <hr/>
                <ul>
                  {events.map((event, i) =>
                    <li key={i}>
                      <button className="btn btn-default event-btn" onClick={(e) => this.handleClick(e, event)}>{event.party} {event.name}</button>
                    </li>)}
                  <li className="media">
                    <div className="media-left media-top">
                      <span className="caret"></span>
                    </div>
                    <div className="media-body">
                      <a href="#/archive">More Past Events</a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 graphs">
                <h3>Activity</h3>
                <hr/>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default upper-graph-panel">
                        <div className="panel-body">
                          Overall Stuffs
                        </div>
                      </div>
                      <p id="upper-summary"></p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default mid-graph-panel">
                        <div className="panel-body">
                          Gender Stuffs
                        </div>
                      </div>
                      <p id="mid-summary"></p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default lower-graph-panel">
                        <div className="panel-body">
                          Ethnic Stuffs
                        </div>
                      </div>
                      <p id="lower-summary"></p>
                    </div>
                  </div>
                  <hr/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
