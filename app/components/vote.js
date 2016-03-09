import React from 'react';
import VoteDem from './voteDem';
import VoteRep from './voteRep';
import VoteInd from './voteInd';


export default class Vote extends React.Component {



  render() {
    return(
      <div>
        <h1>Vote</h1>
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#dem">Democrat</a></li>
          <li><a data-toggle="tab" href="#rep">Republican</a></li>
          <li><a data-toggle="tab" href="#ind">Independent</a></li>
        </ul>

        <div className="tab-content">
          <div id="dem" className="tab-pane fade in active">
            <VoteDem/>
          </div>
          <div id="rep" className="tab-pane fade">
            <VoteRep/>
          </div>
          <div id="ind" className="tab-pane fade">
            <VoteInd/>
          </div>
        </div>
      </div>

    );
  }
}
