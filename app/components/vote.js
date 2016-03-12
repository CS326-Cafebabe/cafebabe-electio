import React from 'react';
import VoteDem from './voteDem';
import VoteRep from './voteRep';
import VoteInd from './voteInd';
import {getUserData} from '../server';


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

        "emailsettings": []
      }
    }
  }

  refresh() {
    getUserData(this.props.userId, (newUserData) => {
      this.setState({user: newUserData});
    })
  }


  componentDidMount() {
    this.refresh();
  }


  render() {
    return(
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>VOTE <small>Choose Your Preferred Candidate</small></h1>
          </div>

          <div className="col-md-3">
            <h5>{this.state.user.fullName}</h5>
            You are currently voting for ______
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#dem">Democrat</a></li>
          <li><a data-toggle="tab" href="#rep">Republican</a></li>
          <li><a data-toggle="tab" href="#ind">Independent</a></li>
        </ul>

        <div className="tab-content">
          <div id="dem" className="tab-pane fade in active">
            <VoteDem/>
          </div>
          <div id="rep" className="tab-pane fade">
            <VoteRep/>
          </div>
          <div id="ind" className="tab-pane fade">
            <VoteInd/>
          </div>
        </div>
      </div>

    );
  }
}
