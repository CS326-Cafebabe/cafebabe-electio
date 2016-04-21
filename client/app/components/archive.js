import React from 'react';
import { Link } from 'react-router';
import Event from './archiveEvent';
import {getSomeEvents} from '../server';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "events": [],
      "page": this.props.page
    }
  }

  componentDidMount() {
    getSomeEvents(this.props.page, (out) => {
      this.setState({events: out});
    })
  }

  handleClick(e, newPage) {
    e.preventDefault();
    this.setState({ "page": newPage });
    getSomeEvents(this.state.page, (out) => {
      this.setState({events: out});
    })
  }

  render() {
    var page = Number(this.state.page);
    var previous = page - 1;
    var next = page + 1;

    var previousClass = "previous";
    if (page <= 1) {
      previous = 1;
      previousClass += " disabled"
    }

    var nextClass = "next";
    if (page >= 3) {
      next = 3;
      nextClass += " disabled";
    }

    var prevLink = "/archive/" + previous;
    var nextLink = "/archive/" + next;

    return (
      <div className="archive-body col-md-12">
        <h2>ARCHIVE <small>Past Events in the Election Race</small></h2>
        <hr />
        <nav>
          <ul className="pager">
            <li className={previousClass} onClick={(e) => this.handleClick(e, String(previous))}><Link to={prevLink}><span aria-hidden="true">&larr;</span>Newer</Link></li>
            <li className={nextClass} onClick={(e) => this.handleClick(e, String(next))}><Link to={nextLink}>Older<span aria-hidden="true">&rarr;</span></Link></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
