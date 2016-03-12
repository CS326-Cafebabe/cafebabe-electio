import React from 'react';
import VoteThumbnail from './voteThumbnail';
import {getIndCandidates, getCandidate} from '../server';


export default class VoteInd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: [
        {
          "_id": 1,
          "headImage": "",
          "logoImage": "",
          "fullName": "",
          "party": 1,
          "thumbType": "",
          "description": "",
          "twitterFeed": "",
          "campaignWebsite": "",
          "wikipedia": "",
          "age": "",
          "quote": ""
        }
      ],
      "votedFor": "",
      "justVoted": false
    };
  }

  refresh() {
    getIndCandidates((out) => {
      this.setState({candidates: out});
    })

   }

  componentDidMount() {
    this.refresh();
  }

  onVote(candId) {

    return () => {
      getCandidate(candId, (out) => this.setState({votedFor: out.fullName}));
      this.setState({justVoted: true});
      this.props.onVote(candId);
    }
  }

  render() {
    var alertClassName = "";
    var alertText = "";
    if (this.state.justVoted){
      alertClassName = ("alert alert-success")
      alertText = ("You Successfully Voted for " + this.state.votedFor);
    }
    return (
      <div>
          <div className="row">
            <br/>
            <div className="col-md-3 col-md-offset-3">
              <img src="img/partyLogos/lib.png" width="100%"/>

            </div>
            <div className="col-md-3">
              <img src="img/partyLogos/gp.png" width="100%"/>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <hr />
              <h2>Independent Parties</h2>
              <hr />
            </div>
          </div>
          <div className={alertClassName} role="alert"><strong>{alertText}</strong></div>


          {this.state.candidates.map((candidate, i) =>
            <VoteThumbnail key={i} uid={i} data={candidate} onVote={this.onVote(candidate._id)}/>
          )}
      </div>

    );
  }
}
