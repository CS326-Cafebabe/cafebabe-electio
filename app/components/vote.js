import React from 'react';
import VoteThumbnail from './voteThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
//import {getCandidate, getAllCandidates} from '../server';


export default class Vote extends React.Component {

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Vote</h1>
        <VoteThumbnail/>
      </div>

    );
  }
}
