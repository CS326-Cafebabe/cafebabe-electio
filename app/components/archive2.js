import React from 'react';
import { Link } from 'react-router';
import Event from './archiveEvent';
import {getSomeEvents} from '../server';

export default class Archive2 extends React.Component {
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

   handleClick(event) {
     event.preventDefault();
     this.refresh();
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
            <li className="previous"><Link to="/archive/1"><span aria-hidden="true" onClick={(e) => this.handleClick(e)}>&larr;</span>Newer</Link></li>
            <li className="next"><Link to="/archive/2">Older <span aria-hidden="true" onClick={(e) => this.handleClick(e)}>&rarr;</span></Link></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
