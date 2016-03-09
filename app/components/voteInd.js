import React from 'react';
import VoteThumbnail from './voteThumbnail';
import {getIndCandidates} from '../server';


export default class VoteInd extends React.Component {

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
    getIndCandidates((out) => {
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

          {this.state.candidates.map((candidate, i) =>
            <VoteThumbnail key={i} uid={i} data={candidate}/>
          )}
      </div>

    );
  }
}
