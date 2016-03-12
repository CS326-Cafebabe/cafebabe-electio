import React from 'react';
import VoteThumbnail from './voteThumbnail';
import {getAllCandidatesOfParty} from '../server';
// import AlertContainer from 'react-alert';



export default class VoteDem extends React.Component {

  constructor(props) {
    super(props);
    // this.alertOptions = {
    //   offset: 14,
    //   position: 'bottom left',
    //   theme: 'dark',
    //   time: 5000,
    //   transition: 'scale'
    // };
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
      ]
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
      this.props.onVote(candId);
    }
  }

  render() {
    //this.refresh();
    //console.log(this.state.candidates);
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

            {this.state.candidates.map((candidate, i) =>
              <VoteThumbnail key={i} uid={i} data={candidate} onVote={this.onVote(candidate._id)}/>
            )}

        </div>

      );



  }
}
