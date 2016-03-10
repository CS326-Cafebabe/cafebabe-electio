import React from 'react';

export default class Graph extends React.Component{
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
      <div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default upper-graph">
              <div className="panel-body">
                <img className="img-responsive" src="img/graphs/graph1.png" id="upper-graph"/>
              </div>
            </div>
            <p id="upper-summary"></p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
