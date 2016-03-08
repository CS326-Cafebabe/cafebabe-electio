import React from 'react';
//import VoteThumbnail from './voteThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
//import {getAllCandidatesOfParty} from '../server';
import VoteDem from './voteDem';
import VoteRep from './voteRep';
import VoteInd from './voteInd';


export default class Vote extends React.Component {



  render() {

    var partyId = -1;
    if(this.props.party === 'Democrat'){
      partyId = 1;
    }
    else if(this.props.party === 'Republican'){
      partyId = 2;
    }
    else if(this.props.party === 'Independent'){
      partyId = 3;
    }
    //this.refresh();
    //console.log(this.state.candidates);
    //console.log(this.props.party);
    if(partyId === 1){
      return (
        <VoteDem/>
      );
    }

    else if(partyId === 2){
      return (
        <VoteRep/>
      );
    }

    else if(partyId === 3){
      return (
        <VoteInd/>
      );
    }

    else{
      return(
        <p>{this.props.party} is not a recognized party</p>
      );
    }
    /*if(this.props.party === 'Democrat'){
      return (
        <div>
          <h1>Vote</h1>

            <div className="row">
              <ul className="nav nav-tabs">
                <li role="presentation" className="active">
                  <a href="#/vote/Democrat">Democrat</a>
                </li>
                <li role="presentation" className="inactive">
                  <a href="#/vote/Republican">Republican</a>
                </li>
                <li role="presentation" className="inactive">
                  <a href="#/vote/Independent">Independent</a>
                </li>
              </ul>
            </div>

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
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
        </div>

      );
    }

    else if(this.props.party === 'Republican'){
      return (
        <div>
          <h1>Vote</h1>

            <div className="row">
              <ul className="nav nav-tabs">
                <li role="presentation" className="inactive">
                  <a href="#/vote/Democrat">Democrat</a>
                </li>
                <li role="presentation" className="active">
                  <a href="#/vote/Republican">Republican</a>
                </li>
                <li role="presentation" className="inactive">
                  <a href="#/vote/Independent">Independent</a>
                </li>
              </ul>
            </div>

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
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
        </div>

      );
    }

    else if(this.props.party === 'Independent'){
      return (
        <div>
          <h1>Vote</h1>

            <div className="row">
              <ul className="nav nav-tabs">
                <li role="presentation" className="inactive">
                  <a href="#/vote/Democrat">Democrat</a>
                </li>
                <li role="presentation" className="inactive">
                  <a href="#/vote/Republican">Republican</a>
                </li>
                <li role="presentation" className="active">
                  <a href="#/vote/Independent">Independent</a>
                </li>
              </ul>
            </div>

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
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
          <VoteThumbnail/>
        </div>

      );
    }



    else{
      return(
        <p>{this.props.party} is not a recognized party</p>
      );
    } */
  }
}
