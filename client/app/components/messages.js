import React from 'react';
import {getUserName, getUserParty} from '../server';

export default class Messages extends React.Component {
  constructor(props) {
  super(props);
  this.state = props;
}

  refresh(){
    getUserParty(this.state.author, (aff) => {
      this.setState({polAff: aff});
    })
    getUserName(this.state.author, (name) =>{
      this.setState({author: name})
    })
  }

  componentDidMount(){
    this.refresh();
  }

  render() {
    var userParty;
    if(this.state.polAff === '000000000000000000000002')
      userParty = "republican-text";
    else if(this.state.polAff === '000000000000000000000001'){
      userParty = "democrat-text";
    }
    else {
      userParty = "independent-purple";
    }

    return(
      <div className="chat-box-text">
        <b className = {userParty}>{this.state.author}</b>: {this.props.contents}
      </div>
    )
  }
}
