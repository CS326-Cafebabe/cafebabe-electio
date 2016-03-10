import React from 'react';
import {getAllEvents} from '../server';
//import {Graph} from './trendGraph';

export default class Trends extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "events": []
    }
  }

  handleClick(clickEvent, event){
    clickEvent.preventDefault;
    document.getElementById("upper-summary").innerHTML = "The overall summary for the "+event.party+" "+event.name+" based on users votes. "+event.summary;
    document.getElementById("mid-summary").innerHTML = "The distribution of votes based on user gender information for the "+event.party+" "+event.name;
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
      return (
        <div>
          <div className="container-fluid">
            <div className="col-md-12 content">
              <div className="row">
                <div className="col-md-12 trending">
                  <h2>TRENDS <small>Graphical Information on Voting Patterns</small></h2>
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 articles">
                  <h3>Events</h3>
                  <hr />
                  <ul>
                    {this.state.events.map((event, i) =>
                      <li key={i}><button className="btn btn-default event-btn" onClick={(e)=>this.handleClick(e, event)}>{event.party} {event.name}</button></li>
                    )}
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
                    <hr />
                      <div className="row">
                        <div className="col-md-12">
                          <div className="panel panel-default upper-graph-panel">
                            <div className="panel-body">
                              <img className="img-responsive" src="img/graphs/graph1.png" id="upper-graph"/>
                            </div>
                          </div>
                          <p id="upper-summary">Select an event</p>
                        </div>
                      </div>
                    <hr />
                      <div className="row">
                        <div className="col-md-12">
                          <div className="panel panel-default mid-graph-panel">
                            <div className="panel-body">
                              <img className="img-responsive" src="img/graphs/nhprimarygender.png" id="mid-graph"/>
                            </div>
                          </div>
                          <p id="mid-summary"></p>
                        </div>
                      </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }
}
