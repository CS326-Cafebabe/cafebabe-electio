import React from 'react';
import VoteDem from './voteDem';
import VoteRep from './voteRep';
import VoteInd from './voteInd';
import {getUserData, setUserData, getCandidate} from '../server';


export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "user": {
        "_id": 1,
        "email": "",
        "password": "",
        "fullName": "",
        "gender": "other",
        "race": "",
        "hispanic": "",
        "registered": "",
        "age": 21,
        "politicalAffiliation": 2,
        "location": "",
        "vote":0,

        "emailsettings": []
      },

      "votedFor": ""
    }
  }

  refresh() {
    getUserData(this.props.userId, (newUserData) => {
      this.setState({user: newUserData});
      // console.log(newUserData.vote);
      if(newUserData.vote !== 0){
        // console.log("here");
        getCandidate(newUserData.vote, (out) => this.setState({votedFor: out.fullName}));
      }

    })
    // console.log(this.state.user.vote);
    // if(this.state.user.vote !== 0){
    //   console.log("here");
    //   getCandidate(this.state.user.vote, (out) => this.setState({votedFor: out.fullName}));
    // }
  }


  componentDidMount() {
    this.refresh();
  }


  voteChange(value) {
    //make callback to change state on db return
    //newUserData will be the db's version of the userData
    var callbackFunction = (newUserData) => {
      this.setState({user: newUserData});
    }

    //create a copy of the state (we don't want 2 refreshes)
    var copy = this.state.user;
    //Update selected value
    copy["vote"] = value;

    //Call server function
    setUserData(this.state.user._id, copy, callbackFunction);
    getCandidate(this.state.user.vote, (out) => this.setState({votedFor: out.fullName}));
  }




  render() {
    var votedFor = "You have not voted for anyone yet!";
    if(this.state.user.vote !== 0){
      votedFor = "You voted for " + this.state.votedFor;
      // console.log(this.state);
    }
    return(
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>VOTE <small>Choose Your Preferred Candidate</small></h1>
          </div>

          <div className="col-md-3">
            <h5>{this.state.user.fullName}</h5>
            {votedFor}
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#dem">Democrat</a></li>
          <li><a data-toggle="tab" href="#rep">Republican</a></li>
          <li><a data-toggle="tab" href="#ind">Independent</a></li>
        </ul>

        <div className="tab-content">
          <div id="dem" className="tab-pane fade in active">
            <VoteDem onVote={this.voteChange.bind(this)}/>
          </div>
          <div id="rep" className="tab-pane fade">
            <VoteRep onVote={this.voteChange.bind(this)}/>
          </div>
          <div id="ind" className="tab-pane fade">
            <VoteInd onVote={this.voteChange.bind(this)}/>
          </div>
        </div>
      </div>

    );
  }
}
