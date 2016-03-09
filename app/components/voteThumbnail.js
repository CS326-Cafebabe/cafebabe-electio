import React from 'react';

export default class VoteThumbnail extends React.Component {

  render() {
    var headImageText = (this.props.data.headImage);
    var csstext = (this.props.data.cssType + "-thumb");


    return (
      <div className="col-sm-4 col-md-4">
          <div className={"thumbnail vote-thumbnail " + csstext}>
            <img src={headImageText} width="100%"/>
            <div className="caption">
              <h3>{this.props.data.fullName}</h3>
              <div className="btn-group">
                <button type="button" className="btn long-btn">Vote</button>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu pull-right">
                  <li><a href={this.props.data.wikipedia}>More Info</a></li>
                  <li><a href={this.props.data.campaignWebsite}>Campaign Website</a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
        );
  }
}
