import React from 'react';
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
    getSomeEvents(this.props.spec, (out) => {
      this.setState({events: out});
    })
   }

   clickclick(event) {
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
            <li className="previous"><a href="/#/archive/new"><span aria-hidden="true">&larr;</span> Newer</a></li>
            <li className="next"><a href="/#/archive/old">Older <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>

        {this.state.events.map((event, i) =>
          <Event key={i} uid={i} data={event} />
        )}
      </div>
    );
  }
}
