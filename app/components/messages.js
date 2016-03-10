import React from 'react';
import {getUserPoliticalAffiliation} from '../server';

export default class Messages extends React.Component {
  constructor(props) {
  super(props);
  this.state = props;
}

  refresh(){
    getUserPoliticalAffiliation(this.state.author, (aff) => {
      this.setState({polAff: aff});
    })
  }

  render() {
    console.log(this.state.polAff);
    var userParty;
    if(this.state.polAff === 1)
      userParty = "republican-text";
    else userParty = "democrat-text";

    return(
      <div className="chat-box-text">
        <b className = {userParty}>User {this.props.author} </b>:
        {this.props.contents}
      </div>
    )
  }
}
