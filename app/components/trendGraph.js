import React from 'react';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.event;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default upper-graph-panel">
              <div className="panel-body">
                <img className="img-responsive" src="img/graphs/graph1.png" id="upper-graph"/>
              </div>
            </div>
            <p id="upper-summary">Overall summary of the {this.state.event.party} {this.state.event.name} based on user votes. {this.event.summary}</p>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default mid-graph-panel">
              <div className="panel-body">
                <img className="img-responsive" src="img/graphs/graph1.png" id="mid-graph"/>
              </div>
            </div>
            <p id="mid-summary"></p>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default lower-graph-panel">
              <div className="panel-body">
                <img className="img-responsive" src="img/graphs/graph1.png" id="lower-graph"/>
              </div>
            </div>
            <p id="lower-summary"></p>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}
