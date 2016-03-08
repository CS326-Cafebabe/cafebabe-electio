import React from 'react';
import {getParty} from '../server'

export default class HomeThumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "name": "test",
      "color": "",
      "logo": ""
    };
  }

  refresh() {
    getParty(this.props.data.party, (returnData) => {
      this.setState(returnData);
    })
   }

  componentDidMount() {
    this.refresh();
  }


  render() {
    var csstext = ('thumbnail ' + this.props.data.thumbType);
    var headImageText = (this.props.data.headImage);
    var modalID = ("cand-modal-" + this.props.uid);
    var modalIDTarget = ("#cand-modal-" + this.props.uid);



    return (
      <div className="col-xs-4 col-md-4">

          <a href="#" className={csstext} data-toggle="modal" data-target={modalIDTarget}>
            <img className="img-responsive" src={headImageText} alt={this.props.data.fullName}/>
            <div className="caption"><strong>{this.props.data.fullName}</strong><br/>
              {this.state.name}
            </div>
          </a>


          <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                        <img className="cand-pic" src={headImageText} width="100%" />
                        <hr/>
                        <button className="btn btn-default option-btn">
                          Campaign Website
                        </button>
                        <button className="btn btn-default option-btn">
                          Wikipedia
                        </button>
                    </div>
                    <div className="col-md-8">
                      <h1 className="text-center cand-name text-uppercase">{this.props.data.fullName}</h1>
                      <p className="info">
                        <b className="quote"><i>{this.props.data.quote}</i></b>
                        <br/><b>Age:</b> {this.props.data.age}
                        <br/><b>Affiliation:</b> {this.state.name}
                      </p>
                      <p>
                      {this.props.data.description}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <img src={this.props.data.logoImage} width="100%" />
                    </div>
                    <div className="col-md-8 twitter">
                      <div className="panel panel-default twitter-panel">
                        <div className="panel-heading text-center">
                          <h4><b>What people are saying about {this.props.data.fullName}</b></h4>
                        </div>
                        <div className="panel-body">
                          <img src="img/temp/twitterFeed.jpg" width="100%" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
    </div>



    );
  }
}
