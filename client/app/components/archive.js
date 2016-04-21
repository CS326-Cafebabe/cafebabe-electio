import React from 'react';
import { Link } from 'react-router';
import Event from './archiveEvent';
import {getSomeEvents} from '../server';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "events": []
    }
  }

  refresh() {
    getSomeEvents(this.props.page, (out) => {
      this.setState({events: out});
    })
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var previousClass = "previous";
    if (this.props.page === 1) {
      previousClass += " disabled"
    }

    var previous = "/archive/" + (this.props.page - 1);
    var next = "/archive/" + (this.props.page + 1);
    return (
      <div className="archive-body col-md-12">
        <h2>ARCHIVE <small>Past Events in the Election Race</small></h2>
        <hr />
        <nav>
          <ul className="pager">
            <li className={previousClass}><Link to={previous}><span aria-hidden="true">&larr;</span>Newer</Link></li>
            <li className="next"><Link to={next}>Older<span aria-hidden="true">&rarr;</span></Link></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
