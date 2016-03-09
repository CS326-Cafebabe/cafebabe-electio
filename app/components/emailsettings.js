import React from 'react';
import CandidateSub from './candidateSub';
import {getAllCandidates} from '../server';


export default class EmailSettings extends React.Component {

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
    getAllCandidates((out) => {
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
          <h1>Email Settings</h1>

        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {this.state.candidates.map((candidate, i) =>
              <CandidateSub key={i} uid={i} data={candidate}/>
            )}

          </div>
        </div>


      </div>

    );
  }
}
