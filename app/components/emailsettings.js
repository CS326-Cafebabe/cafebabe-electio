import React from 'react';
import CandidateSub from './candidateSub';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
//import {getCandidate, getAllCandidates} from '../server';


export default class EmailSettings extends React.Component {

  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>Email Settings</h1>
        <CandidateSub/>
      </div>

    );
  }
}
