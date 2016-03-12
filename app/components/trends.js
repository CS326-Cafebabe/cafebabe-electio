import React from 'react';
import {Link} from 'react-router';
import {getInitBallotBox, getAllCandidates, getAllWeeks } from '../server';
import {Bar} from 'react-chartjs';

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "weeklyState": [],
      "ballotBox": [],
      "candidateNames": []
    }
  }

  //<Bar data={this.state.genderData} id="Gender" redraw height="400px" width="900px"/>

  handleClick(clickEvent, week) {
    clickEvent.preventDefault();
    document.getElementById("info").innerHTML = "Displaying info for "+week.startDate;
    document.getElementById("overallTitle").innerHTML = "Overall votes for the week of "+week.startDate;
    document.getElementById("genderTitle").innerHTML = "Distribution of votes based on gender for the week of "+week.startDate;
    document.getElementById("ethnicTitle").innerHTML = "Distribution of votes based on ethnicity for the week of "+week.startDate;
    this.setState({ballotBox: week.ballotBox});
  }

  refresh() {
    getInitBallotBox((out) => {
      this.setState({ballotBox: out.ballotBox});
    })
    getAllCandidates((out) => {
      var fullName = [];
      out.map((cand) => fullName.push(cand.fullName));
      this.setState({candidateNames: fullName})
    })
    getAllWeeks((out) => {
      this.setState({weeklyState: out});
    });
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
                  {this.state.weeklyState.map((week, i) => <li key={i}>
                    <button className="btn btn-default event-btn" onClick={(e) => this.handleClick(e, week)}>{week.startDate}</button>
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
                <h3>Activity <small id="info"></small></h3>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-overall'>
                      <div className='legend-title' id="overallTitle"></div>
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
                      <div className='legend-title' id="genderTitle"></div>
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
                      <div className='legend-title' id="ethnicTitle"></div>
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
