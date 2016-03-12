import React from 'react';
import {Link} from 'react-router';
import {getAllEvents, getAllCandidates} from '../server';
import {Bar} from 'react-chartjs';

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "events": [],
      "candidateNames": []
    }
  }

  //<Bar data={this.state.genderData} id="Gender" redraw height="400px" width="900px"/>

  handleClick(clickEvent, event) {
    clickEvent.preventDefault();
    //Change displayed info
    document.getElementById("upper-summary").innerHTML = "Overall summary for " + event.party + " " + event.name + " based on user votes. " + event.summary;
    document.getElementById("mid-summary").innerHTML = "Gender based summary for " + event.party + " " + event.name + " based on user votes. "
    document.getElementById("lower-summary").innerHTML = "Ethnic based summary for " + event.party + " " + event.name + " based on user votes. "
    //Update eventBallot to that of a clicked item and get the candidates voted for in the event
    this.setState({eventBallot: event.ballotBox});
  }

  refresh() {
    getAllEvents((out) => {
      this.setState({events: out});
    })
    getAllCandidates((out) => {
      var fullName = [];
      out.map((cand) => fullName.push(cand.fullName));
      this.setState({candidateNames: fullName})
    })
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var labels = this.state.candidateNames;

    var OverallData = {
      labels: labels,
      datasets: [
        {
          label: "Schlock",
          fillColor: "#6194BC",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [1,4,1,0,6,0,10,0,6]
        }
      ]
    };
    var GenderData = {
      labels: labels,
      datasets: [
        {
          label: "Women votes",
          fillColor: "#6194BC",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [1,4,1,0,6,0,10,0,6]
        }, {
          label: "Men votes",
          fillColor: "#FF4E4E",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0,2,7,1,3,5,15,0,6]
        }, {
          label: "Other Votes",
          fillColor: "#805889",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0,2,7,1,3,5,15,0,6]
        }
      ]
    };
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
                <h3>Weekly Snapshots</h3>
                <hr/>
                <ul>
                  {this.state.events.map((event, i) => <li key={i}>
                    <button className="btn btn-default event-btn" onClick={(e) => this.handleClick(e, event)}>{event.party} {event.name}</button>
                  </li>)}
                  <li className="media">
                    <div className="media-left media-top">
                      <span className="caret"></span>
                    </div>
                    <div className="media-body">
                      <Link to="/archive/1">More Past Events</Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 graphs">
                <h3>Activity <small>Data for week [date]</small></h3>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-overall'>
                      <div className='legend-title'>Overall Votes for week [insert week date here]</div>
                      <div className='legend-scale'>
                        <ul className='legend-labels'>
                          <li>
                            <span className="legend-item-overall"></span>
                            Votes</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel panel-default upper-graph-panel">
                      <div className="panel-body">
                        <Bar data={OverallData} id="Overall" redraw height="400px" width="900px"/>
                      </div>
                    </div>
                    <p id="upper-summary"></p>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-gender'>
                      <div className='legend-title'>Votes based on Gender for week [insert week date here]</div>
                      <div className='legend-scale'>
                        <ul className='legend-labels'>
                          <li>
                            <span className="legend-item-gender-1"></span>
                            Male</li>
                          <li>
                            <span className="legend-item-gender-2"></span>
                            Female</li>
                          <li>
                            <span className="legend-item-gender-3"></span>
                            Other</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel panel-default mid-graph-panel">
                      <div className="panel-body">
                        <Bar data={GenderData} id="Overall" redraw height="400px" width="900px"/>
                      </div>
                    </div>
                    <p id="mid-summary"></p>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-ethnic'>
                      <div className='legend-title'>Votes based on Gender for week [insert week date here]</div>
                      <div className='legend-scale col-md-2'>
                        <ul className='legend-labels'>
                          <li>
                            <span className="legend-item-ethnic-1"></span>
                            White</li>
                          <li>
                            <span className="legend-item-ethnic-2"></span>
                            Black</li>
                          <li>
                            <span className="legend-item-ethnic-3"></span>
                            Asian</li>
                        </ul>
                      </div>
                      <div className="legend-scale col-md-2">
                        <ul className='legend-labels'>
                          <li>
                            <span className="legend-item-ethnic-4"></span>
                            Native</li>
                          <li>
                            <span className="legend-item-ethnic-5"></span>
                            Alaskan</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel panel-default lower-graph-panel">
                      <div className="panel-body">
                        <Bar data={OverallData} id="Overall" redraw height="400px" width="900px"/>
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
