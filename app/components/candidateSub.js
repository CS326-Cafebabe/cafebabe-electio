import React from 'react';

export default class CandidateSub extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.on;
  }

  handleSub(clickEvent){
      // Stop the event from propagating up the DOM tree, since we handle it here.
      clickEvent.stopPropagation();
      // 0 represents the 'main mouse button' -- typically a left click
      if (clickEvent.button === 0) {
        this.setState(1);
        console.log(this.state);
      }

  }

  handleUnsub(clickEvent){
      // Stop the event from propagating up the DOM tree, since we handle it here.
      clickEvent.stopPropagation();
      // 0 represents the 'main mouse button' -- typically a left click
      if (clickEvent.button === 0) {
        this.setState(0);
        console.log(this.state);
      }

  }

  render() {
    var cssActive = "active canSubActive";
    console.log(this.state);
    return (
      <div>
          <div className="panel panel-default dem-panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-7">
                  <div className="media">
                    <div className="media-left">
                      <img className="candSubImg" src="img/candidateHeads/sandersHead.jpg" width="100%" />
                    </div>
                    <div className="media-body">
                      <h4>Bernie Sanders</h4>
                      Democratic Party
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="btn-group pull-right " data-toggle="buttons">
                    <label className="btn btn-primary">
                      <input type="radio" name="options" id="onBernie" autoComplete="off"/> On
                    </label>
                    <label className={"btn btn-primary" + cssActive}>
                      <input type="radio" name="options" id="offBernie" autoComplete="off" onClick={(e)=> this.handleUnsub(e)}/> Off
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
