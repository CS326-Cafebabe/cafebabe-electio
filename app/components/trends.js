import React from 'react';
import {Link} from 'react-router';
import {getInitBallotBox, getAllCandidates, getAllWeeks, getUserGender, getUserRace } from '../server';
import {Bar} from 'react-chartjs';

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "weeklyState": [],
      "ballotBox": [],
      "loaded": false,
      "candidateNames": []
    }
  }

  //<Bar data={this.state.genderData} id="Gender" redraw height="400px" width="900px"/>

  handleClick(clickEvent, week) {
    clickEvent.preventDefault();
    document.getElementById("info").innerHTML = "Displaying info for "+week.startDate;
    document.getElementById("overallTitle").innerHTML = "Distribution of votes overall for the week of "+week.startDate;
    document.getElementById("genderTitle").innerHTML = "Distribution of votes based on gender for the week of "+week.startDate;
    document.getElementById("ethnicTitle").innerHTML = "Distribution of votes based on ethnicity for the week of "+week.startDate;
    this.setState({loaded: true});
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
    var labels       = this.state.candidateNames;
    var overallVotes = [0,0,0,0,0,0,0,0,0];

    var femVotes     = [0,0,0,0,0,0,0,0,0];
    var menVotes     = [0,0,0,0,0,0,0,0,0];
    var otherVotes   = [0,0,0,0,0,0,0,0,0];

    var whiteVotes   = [0,0,0,0,0,0,0,0,0];
    var blackVotes   = [0,0,0,0,0,0,0,0,0];
    var asianVotes   = [0,0,0,0,0,0,0,0,0];
    var nativeVotes  = [0,0,0,0,0,0,0,0,0];
    var pacificVotes = [0,0,0,0,0,0,0,0,0];

    if(this.state.loaded === true){
      //Fill In All Vote arrays
      this.state.ballotBox.map((vote) => {
        overallVotes[vote.candidate-1]++;
        // var userData =
        // var userRace = "";
        // getUserGender(vote.user, (out)=>{
        //   userGen = out;
        // });
        // getUserRace(vote.user, (out)=>{
        //   userRace = out;
        // });
        // switch(userGen) {
        //   case "female":
        //     femVotes[vote.candidate-1]++;
        //     break;
        //   case "male":
        //     menVotes[vote.candidate-1]++;
        //     break;
        //   case "other":
        //     otherVotes[vote.candidate-1]++;
        //     break;
        //   default:
        //     //Debugging, its doing this instead of any of the others
        //     overallVotes[2] = 10;
        // }
      });
    }

    var OverallData = {
      labels: labels,
      datasets: [
        {
          label: "Overall Votes",
          fillColor: "#6194BC",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: overallVotes
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
          data: femVotes
        }, {
          label: "Men votes",
          fillColor: "#FF4E4E",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: menVotes
        }, {
          label: "Other Votes",
          fillColor: "#805889",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: otherVotes
        }
      ]
    };
    var EthnicData = {
      labels: labels,
      datasets: [
        {
          label: "White Votes",
          fillColor: "#6194BC",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: whiteVotes
        }, {
          label: "Black Votes",
          fillColor: "#FF4E4E",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: blackVotes
        }, {
          label: "Asian Votes",
          fillColor: "#805889",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: asianVotes
        }, {
          label: "Native Votes",
          fillColor: "#FFCD77",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: nativeVotes
        }, {
          label: "Alaskan Votes",
          fillColor: "#47824E",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: pacificVotes
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
                <h3>Activity <small id="info"> Select a date to display information . . .</small></h3>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-overall'>
                      <div className='legend-title' id="overallTitle">Distribution of votes overall . . .</div>
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
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-gender'>
                      <div className='legend-title' id="genderTitle">Distribution of votes based on gender . . .</div>
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
                        <Bar data={GenderData} id="Gender" redraw height="400px" width="900px"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className='my-legend-ethnic'>
                      <div className='legend-title' id="ethnicTitle">Distribution of votes based on ethnicity . . .</div>
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
                            Pacific I.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="panel panel-default lower-graph-panel">
                      <div className="panel-body">
                        <Bar data={EthnicData} id="Ethnic" redraw height="400px" width="900px"/>
                      </div>
                    </div>
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
