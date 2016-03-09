import React from 'react';
import VoteThumbnail from './voteThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
import {getAllCandidatesOfParty} from '../server';


export default class VoteRep extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: [
        {
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
      ]
    };
  }

  refresh() {
    getAllCandidatesOfParty(2, (out) => {
      this.setState({candidates: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <img src="img/partyLogos/republicanParty.png" width="100%"/>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <hr />
              <h2>Republican Party</h2>
              <hr />
            </div>
          </div>
          {this.state.candidates.map((candidate, i) =>
            <VoteThumbnail key={i} uid={i} data={candidate}/>
          )}
      </div>

    );
  }
}
