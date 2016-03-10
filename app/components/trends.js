import React from 'react';
import { getAllEvents } from '../server';
//import { Graph } from './trendGraph';

export default class Trends extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "events": []
    }
  }

  handleClick(clickEvent, event) {
    clickEvent.preventDefault;
    document.getElementById("react-graphs").event = event;
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
                <h2>TRENDS
                  <small>Graphical Information on Voting Patterns</small>
                </h2>
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
                Graphs go here!!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
