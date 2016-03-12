import React from 'react';
import VoteThumbnail from './voteThumbnail';
import {getAllCandidatesOfParty, getCandidate} from '../server';



export default class VoteDem extends React.Component {

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
    getAllCandidatesOfParty(1, (out) => {
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
              <div className="col-md-4 col-md-offset-4">
                <img src="img/partyLogos/democraticParty.png" width="100%"/>

              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <hr />
                <h2>Democratic Party</h2>
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
