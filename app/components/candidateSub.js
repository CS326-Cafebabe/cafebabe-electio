import React from 'react';
import {getParty} from '../server';

export default class CandidateSub extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      party : {
        "name": "",
        "color": "",
        "logo": ""
      }
    };
  }

  // handleSub(clickEvent){
  //     // Stop the event from propagating up the DOM tree, since we handle it here.
  //     clickEvent.stopPropagation();
  //     // 0 represents the 'main mouse button' -- typically a left click
  //     if (clickEvent.button === 0) {
  //       this.setState(1);
  //       // console.log(this.state);
  //     }
  //
  // }
  //
  // handleUnsub(clickEvent){
  //     // Stop the event from propagating up the DOM tree, since we handle it here.
  //     clickEvent.stopPropagation();
  //     // 0 represents the 'main mouse button' -- typically a left click
  //     if (clickEvent.button === 0) {
  //       this.setState(0);
  //       // console.log(this.state);
  //     }
  //
  // }

  refresh() {
    getParty(this.props.data.party, (out) => {
      this.setState({party: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  render() {

    // var cssActive = "active canSubActive";
    var cssColor = this.props.data.cssType + "-panel";
    // console.log(this.state.party.name);
    // var cssDark = this.props.data.cssType + "-inactive";
    return (
      <div>
          <div className={"panel panel-default " + cssColor}>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-7">
                  <div className="media">
                    <div className="media-left">
                      <img className="candSubImg" src={this.props.data.headImage} width="100%" />
                    </div>
                    <div className="media-body">
                      <h4>{this.props.data.fullName}</h4>
                      {this.state.party.name}
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="btn-group pull-right " data-toggle="buttons">
                    <label className={"btn btn-primary " + this.props.data.cssType}>
                      <input type="radio" name="options" id="onBernie" autoComplete="off"/> On
                    </label>
                    <label className={"btn btn-primary active " + this.props.data.cssType}>
                      <input type="radio" name="options" id="offBernie" autoComplete="off" defaultChecked/> Off
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
        );
  }


}
