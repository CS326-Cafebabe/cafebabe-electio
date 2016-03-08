import React from 'react';

export default class VoteThumbnail extends React.Component {

  render() {
    return (
      <div className="col-sm-4 col-md-4">
          <div className="thumbnail vote-thumbnail democrat-thumb">
            <img src="img/candidateHeads/sandersHead.jpg" width="100%"/>
            <div className="caption">
              <h3>Bernie Sanders</h3>
              <div className="btn-group">
                <button type="button" className="btn long-btn">Vote</button>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu pull-right">
                  <li><a href="#">More Info</a></li>
                  <li><a href="https://berniesanders.com/">Campaign Website</a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
        );
  }
}
