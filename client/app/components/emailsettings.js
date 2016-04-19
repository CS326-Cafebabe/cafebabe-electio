import React from 'react';
import CandidateSub from './candidateSub';
import {getAllCandidates} from '../server';


export default class EmailSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: [
        {
          "_id": "",
          "headImage": "",
          "logoImage": "",
          "fullName": "",
          "party":   "000000000000000000000001",
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
    getAllCandidates((out) => {
      this.setState({candidates: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  render() {
    //console.log(this.state);
    return (
      <div>

        <div className="col-md-12">
          <h1>EMAIL SETTINGS <small>Subscribe to Your Favorite Candidates</small></h1>
          <hr className="emailHr"/>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {this.state.candidates.map((candidate, i) =>
              <CandidateSub key={i} uid={i} data={candidate} userId={this.props.userId}/>
            )}

          </div>
        </div>


      </div>

    );
  }
}
