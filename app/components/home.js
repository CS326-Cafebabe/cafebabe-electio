import React from 'react';
//import FeedItem from './feeditem';
//import StatusUpdateEntry from './statusupdateentry';
//import {getFeedData, postStatusUpdate} from '../server';


export default class Home extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    // getFeedData(this.props.user, (feedData) => {
    //   this.setState(feedData);
    // });
  }


  componentDidMount() {
    this.refresh();
  }
  */

  render() {
    return (
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
    )
  }
}
