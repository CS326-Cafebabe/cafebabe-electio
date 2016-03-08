import React from 'react';
import HomeThumbnail from './homeThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
import {getAllCandidates} from '../server';


export default class Home extends React.Component {

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
    getAllCandidates( (out) => {
      this.setState({candidates: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

//<p>{candidate.fullName}</p>
  render() {
    return (
      <div> {this.state.candidates.map((candidate, i) =>
          <HomeThumbnail key={i} uid={i} data={candidate}/>
          )} </div>
    )
  }
}
