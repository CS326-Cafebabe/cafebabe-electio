
import React from 'react';
import Chat from './chat';
import {getAllChat} from '../server';

export default class ChatList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatBoxes: [{
          "active": true,
          "_id": '000000000000000000000001',
          "fullName":"Clinton Debate",
          "messages": [
            {
              "author": 1,
              "contents": "Debate Hillary Here"
            },
            {
              "author": 1,
              "contents": "Test second message"
            }
          ],
          "time": 1453668480000
        }
      ],
      active: 1
      }

  }

  refresh() {
    getAllChat( (out) => {
      this.setState({chatBoxes: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  // getActiveChat(){
  //   var data = this.state;
  //   for(var i = 0; i < data.chatBoxes.length; i++){
  //     if(data.chatBoxes[i].active === "true"){
  //         this.setState({active : i});
  //     }
  //   }
  // }

  handleClick(e, i) {
    e.preventDefault();
    this.setState({ active: i });

  }

  render(){
    return(
      <div>
        <div id={this.state.chatBoxes[this.state.active - 1]._id} className="tab-pane fade in active">
          <Chat key={this.state.active-1} toRender = {this.state.chatBoxes[this.state.active - 1]._id}/>
        </div>
      <div className="col-md-2 tight col-overflow">
        <div className="chat-box-discussion-div">
          <div className="chat-box-discussion-head">
            Pick a Discussion Topic
          </div>
          <div className="chat-box-discussion">
            <div className="list-group tight">
              {this.state.chatBoxes.map((chatBoxes, i) => {
                return (
                  <a data-toggle="tab" href={this.state.chatBoxes[i]._id}
                     className="list-group-item" key={i} onClick={(e) => this.handleClick(e, this.state.chatBoxes[i]._id)}>
                    {this.state.chatBoxes[i].fullName}
                    <br/>
                    <small>Last Active: 2 mins</small>
                  </a>
                )
              })
            }

            </div>
          </div>

        </div>
      </div>
    </div>

    )

  }


}
