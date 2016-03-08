import React from 'react';
import {getChat, postMessage} from '../server';
// import HomeThumbnail from './homeThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
// import {getAllCandidates} from '../server';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatBox: {
        "_id": "",
        "fullName": "",
        "messages": [],
        "active": 0
      }
    };
  }

  refresh() {
    getChat(1, (chatBox) => {
      this.setState(chatBox);
    })
  }

  componentDidMount() {
    this.refresh();
  }

  handleMessage(message) {
    postMessage(this.state, 4, message, (updatedChat) => {
      this.setState(updatedChat);
    })
  }

  render() {

    return (
      <div>

        <div className="col-md-8 col-md-offset-2 extra-right-pad">
          <div className="panel chat-box-alignment">
            <div className="panel-heading center chat-head">
              <h4>
                <b>{this.state.chatBox.fullName}</b>
              </h4>
            </div>
            <div className="panel-body chat-box">
              <div className="chat-box-div">
                <div className="panel-body chat-box-main">
                  {this.state.chatBox.messages.map((message, i) => {
                    return (
                      <div className="chat-box-text">
                        <b>User
                          {this.state.chatBox.messages[i].author}:</b>
                        {this.state.chatBox.messages[i].contents}
                      </div>
                    )
                  })
                }
                </div>
                <div className="panel-footer">
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button className="btn btn-chat" type="button">
                        <span classNameName="glyphicon glyphicon-pencil"></span>
                      </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Contribute to the Discussion...">
                    </input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                  //     <div className="col-md-2 tight col-overflow">
                  //       <div className="chat-box-discussion-div">
                  //         <div className="chat-box-discussion-head">
                  //           Pick a Discussion Topic
                  //         </div>
                  //         <div className="chat-box-discussion">
                  //           <div className="list-group tight">
                  //             <a href="#" className="list-group-item">
                  //               Sanders
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item active">
                  //               Clinton
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Cruz
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Trump
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Rubio
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Sanders
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Clinton
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Cruz
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Trump
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Rubio
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Sanders
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Clinton
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Cruz
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Trump
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //             <a href="#" className="list-group-item">
                  //               Rubio
                  //               <br/>
                  //               <small>Last Active: 2 mins</small>
                  //             </a>
                  //           </div>
                  //         </div>
                  //
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
        //     </div>
        //   </div>
        // </div>
      )
    }
  }
