import React from 'react';
import Event from './archiveEvent';
import {getAllEvents} from '../server';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "events": []
    }
  }

  refresh() {
    getAllEvents( (out) => {
      this.setState({events: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="archive-body col-md-12">
        <h2>ARCHIVE <small>Past Events in the Election Race</small></h2>
        <hr />
        <nav>
          <ul className="pager">
            <li className="previous disabled"><a><span aria-hidden="true">&larr;</span> Newer</a></li>
            <li className="next"><a>Older <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
