import React from 'react';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  getParty() {
    var party = "";
    if (this.state.party === "Republican") {
      party = "panel-danger";
    } else if (this.state.party === "Democrat") {
      party = "panel-success";
    } else {
      party = "panel-info";
    }
    return party;
  }

  render() {
    var panelType = getParty();

    return (
      <div className="panel panel-default {panelType}">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.name}</h3>
          {this.state.date}
        </div>
        <div className="panel-body">
          {this.state.summary}
          {this.state.location}
        </div>
      </div>
    );
  }
}
