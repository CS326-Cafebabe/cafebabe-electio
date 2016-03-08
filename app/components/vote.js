import React from 'react';
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
  }
}
