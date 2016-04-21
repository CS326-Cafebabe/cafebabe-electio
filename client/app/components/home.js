import React from 'react';
import HomeThumbnail from './homeThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
import {getAllCandidates} from '../server';
import {Link} from 'react-router';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  refresh() {
    getAllCandidates( (out) => {
      this.setState({candidates: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

//<p>{candidate.fullName}</p>
  render() {
    return (
      <div className="title">
        <h1>elect.io (n)</h1>

        {this.state.candidates.map((candidate, i) =>
          <HomeThumbnail key={i} uid={i} data={candidate}/>
          )}

          <div className ="row">
            <div className="col-xs-1 col-xs-offset-4 col-sm-1 col-sm-offset-4 col-md-1 col-md-offset-4">
              <div className="vote-button-container">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <Link to={"vote"} className="btn btn-default btn-block" id="vote-button"><b>VOTE NOW</b><span className="glyphicon glyphicon-pencil sidebar-glyph"></span></Link>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
  }
}
