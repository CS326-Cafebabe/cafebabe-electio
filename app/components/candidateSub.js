import React from 'react';
import {getParty, getEmailSettings, subscribe, unsubscribe} from '../server';

export default class CandidateSub extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      party : {
        "name": "",
        "color": "",
        "logo": ""
      },
      emailsettings: []
    };
  }

  handleSubClick(clickEvent) {
      // Stop the event from propagating up the DOM tree, since we handle it here.
      clickEvent.stopPropagation();
      // 0 represents the 'main mouse button' -- typically a left click
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (clickEvent.button === 0) {
        // Callback function for both the like and unlike cases.
        var callbackFunction = (updatedEmailSettings) => {
          // setState will overwrite the 'likeCounter' field on the current
          // state, and will keep the other fields in-tact.
          // This is called a shallow merge:
          // https://facebook.github.io/react/docs/component-api.html#setstate
          this.setState({emailsettings: updatedEmailSettings});
        };

        if (this.didUserSub()) {
          unsubscribe(this.props.data._id, 1, callbackFunction);
        } else {
          subscribe(this.props.data._id, 1, callbackFunction);
        }
      }
    }



  refresh() {
    getParty(this.props.data.party, (out) => {
      this.setState({party: out});
    })

    getEmailSettings(1, (out) => {
      this.setState({emailsettings: out});
    })

   }

  componentDidMount() {
    this.refresh();
  }

  didUserSub() {
    var emailsettings = this.state.emailsettings;
    var sub = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i = 0; i < emailsettings.length; i++) {
      // console.log(this.props.data._id);
      if (emailsettings[i] === this.props.data._id) {
        sub = true;
        break;
      }
    }
    return sub;
  }

  render() {
    // console.log(this.state.emailsettings);
    // var cssActive = "active canSubActive";
    var cssColor = this.props.data.cssType + "-panel";
    var subscribeText = "Subscribe";
    if(this.didUserSub()){
      subscribeText = "Unsubscribe";
    }
    // console.log(this.state.party.name);
    // var cssDark = this.props.data.cssType + "-inactive";
    return (
      <div>
          <div className={"panel panel-default " + cssColor}>
            <div className="panel-body email">
              <div className="row">
                <div className="col-md-7">
                  <div className="media">
                    <div className="media-left">
                      <img className="candSubImg" src={this.props.data.headImage} width="100%" />
                    </div>
                    <div className="media-body">
                      <h4>{this.props.data.fullName}</h4>
                      {this.state.party.name}
                      {console.log(this.state.emailsettings)}

                      {"    "+ this.didUserSub()}
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <button type="button" className={"btn btn-primary pull-right " + this.props.data.cssType} data-toggle="button" aria-pressed="false" autoComplete="off" onClick={(e)=>this.handleSubClick(e)}>
                    {subscribeText}
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
        );
  }


}
