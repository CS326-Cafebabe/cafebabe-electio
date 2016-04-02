import React from 'react';
import {getUserData} from '../server';

export default class Messages extends React.Component {
  constructor(props) {
  super(props);
  this.state = props;
}

  refresh(){
    getUserData(this.state.author, (aff) => {
      this.setState({polAff: aff.politicalAffiliation});
    })
    getUserData(this.state.author, (name) =>{
      this.setState({author: name.fullName})
    })
  }

  componentDidMount(){
    this.refresh();
  }

  render() {
    var userParty;
    if(this.state.polAff === 2)
      userParty = "republican-text";
    else userParty = "democrat-text";

    return(
      <div className="chat-box-text">
        <b className = {userParty}>{this.state.author}</b>: {this.props.contents}
      </div>
    )
  }
}
