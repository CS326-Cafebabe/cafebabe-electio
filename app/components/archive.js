import React from 'react';
import Event from './event';

export default class Archive extends React.Component {
  render() {
    return (
      <div className="archive-body col-md-7 col-md-offset-2">
        <h2>ARCHIVE <small>Past Events in the Election Race</small></h2>
        <hr />
        <nav>
          <ul className="pager">
            <li className="previous disabled"><a href="#"><span aria-hidden="true">&larr;</span> Newer</a></li>
            <li className="next"><a href="#">Older <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>
        
        <Event />
      </div>
    );
  }
}
