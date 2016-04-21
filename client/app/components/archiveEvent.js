import React from 'react';

export default class ArchiveEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  getPartyPanel() {
    var panelType = "";
    var check = this.state.party;
    if (check === "Republican") {
      panelType = "panel-danger";
    } else if (check === "Democrat") {
      panelType = "panel-info";
    } else {
      panelType = "panel-success";
    }
    return panelType;
  }

  render() {
    var panelType = "panel panel-default " + this.getPartyPanel();

    return (
      <div className={panelType}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.name}</h3>
          {this.state.date}
        </div>
        <div className="panel-body">
          {this.state.summary}
        </div>
      </div>
    );
  }
}
