import React from 'react';
import {getChat, postMessage} from '../server';
import MessageEntry from './messageEntry';
import Messages from './messages';
// import HomeThumbnail from './homeThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
// import {getAllCandidates} from '../server';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatBox: {
        "active": 1,
        "_id": "",
        "fullName": "",
        "messages": [],
        "time": 0
      },
      render: this.props.toRender+1
    };
  }

  refresh() {
    getChat(this.state.render, (cBox) => {
      this.setState({chatBox: cBox,
        render: this.props.toRender+1
      });
    })
  }

  componentDidMount() {
    this.refresh();
  }

  onPost(postContents) {
    // Send to server.
    // We could use geolocation to get a location, but let's fix it to Amherst
    // for now.
    postMessage(this.state.render, '000000000000000000000001', postContents, () => {
      // Database is now updated. Refresh the feed.
      this.refresh();
    });
  }

  handleMessage(message) {
    postMessage(this.state, 4, message, (updatedChat) => {
      this.setState(updatedChat);
    })
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col-md-12 trending">
            <h1>CHAT<small> Partake in the {this.state.chatBox.fullName}</small>
            </h1>
            <hr/>
          </div>
        </div>

        <div className="col-md-8 col-md-offset-2 extra-right-pad">
          <div className="panel chat-box-alignment">
            <div className="panel-body chat-box">
              <div className="chat-box-div">
                <div className="panel-body chat-box-main">
                  {this.state.chatBox.messages.map((message, i) => {
                    return (

                      <Messages key={i} author={message.author}
                         contents={message.contents} polAff={i%2}/>
                    )
                  })
                }
                </div>
              </div>
            </div>
            <div>
                <MessageEntry onPost={(message) => this.onPost(message)} />
                </div>
              </div>
            </div>
                    </div>
      )
    }
  }
