import React from 'react';
import HomeThumbnail from './homeThumbnail';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';
import {getCandidates} from '../server';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  refresh() {
    var c = [];
    for(var i = 0; i < 6; i++){
     getCandidates(i, (candidate) => {
      //  console.log("here");
       c.push(candidate);
     });

   }
   console.log(c);
   this.setState(c);
  }


  componentDidMount() {
    this.refresh();
  }


  render() {
    return (
      <div>
      <div className="row">
        {this.state.candidates.map((candidate) => {
          return (
            <HomeThumbnail data={candidate}/>
          )
        })}

      </div>

      <div className ="row">
        <div className="col-xs-1 col-xs-offset-4 col-sm-1 col-sm-offset-4 col-md-1 col-md-offset-4">
          <div className="vote-button-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <a href="vote.html" className="btn btn-default btn-block" id="vote-button">Vote now <span className="glyphicon glyphicon-pencil sidebar-glyph"></span></a>
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
