import React from 'react';
import Event from './archiveEvent';
import {getAllEvents} from '../server';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "events": [{
        "date": "",
        "name": "",
        "location": "",
        "summary": "",
        "party": "",
        "ballotBox": []
      }]
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
      <div className="archive-body col-md-7 col-md-offset-2">
        <h2>ARCHIVE <small>Past Events in the Election Race</small></h2>
        <hr />
        <nav>
          <ul className="pager">
            <li className="previous disabled"><a href="#"><span aria-hidden="true">&larr;</span> Newer</a></li>
            <li className="next"><a href="#">Older <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
