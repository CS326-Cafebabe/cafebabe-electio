import React from 'react';
import { getAllCandidates, getAllWeeks, getAllUserRaceGender } from '../server';
import GraphSection from './graphSection';

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "classNames": "not-loaded",
      "weeklyStates": [],
      "displayWeek": "",
      "ballotBox": [],
      "users" : [
        {
        "race": "",
        "gender": ""
        }
      ],
      "loaded": false,
      "candidateNames": []
    }
  }


  handleClick(clickEvent, week) {
    clickEvent.preventDefault();
    this.setState({displayWeek: new Date(week.unixTime*1000).toLocaleString()});
    this.setState({loaded: true});
    this.setState({ballotBox: week.ballotBox});
  }

  Rest(clickEvent){
    clickEvent.preventDefault();
    //Basically treating classNames as a global variable
    if(this.state.classNames === "not-loaded"){
      this.setState({classNames: "loaded"});
    } else {
      this.setState({classNames: "not-loaded"})
    }
  }

  refresh() {
    getAllCandidates((out) => {
      var fullName = [];
      out.map((cand) => fullName.push({id: parseInt(cand._id,10), fullName: cand.fullName}));
      this.setState({candidateNames: fullName});
    })
    getAllWeeks((out) => {
      this.setState({weeklyStates: out.reverse()});
    });
    getAllUserRaceGender((out) => {
      this.setState({users: out});
    });
  }

  componentDidMount() {
    this.refresh();
  }



  render() {
    //Data to be passed down through GraphSection to graphs

    //Sorts the array of candidate names by id number instead of name
    var cands = this.state.candidateNames.sort(function(a, b){
      if(a.id > b.id){
        return 1;
      }
      else{
        return -1;
      }
    });
    var labels = [];
    cands.map((cand)=>labels.push(cand.fullName));

    var data = {
      labels: labels,
      ballot: this.state.ballotBox,
      voters: this.state.users
    }

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
                  {this.state.weeklyStates.map((week, i) =>
                    <li key={i} className={(i < 4) ? "loaded" : this.state.classNames}>
                      <a className="dates" onClick={(e) => this.handleClick(e, week)}>{new Date(week.unixTime*1000).toLocaleString()}</a>
                    </li>)}
                  <li className="media">
                    <div className="media-left media-top">
                      <span className="caret"></span>
                    </div>
                    <div className="media-body">
                      <a className="dates" onClick={(e) => this.Rest(e)}> {(this.state.classNames === "loaded") ? "Less" : "More"} Weeks</a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 graphs">
                <h3>Activity <small id="info">{(!this.state.loaded) ? "" : "Displaying " + this.state.displayWeek}</small></h3>
                <hr/>
                <GraphSection loaded={this.state.loaded} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
