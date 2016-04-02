import React from 'react';
import { Timeline } from 'react-twitter-widgets'
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
    //this.props.cssType contains:
    // - democrat
    // - republican
    // - independent

    //Defines CSS classes for dynamic components (so party colors show up)
    var csstext = ('thumbnail ' + this.props.data.cssType + "-thumb-home");
    var headImageText = (this.props.data.headImage);

    //for setting and using the id of the modal
    var modalID = ("cand-modal-" + this.props.uid);
    var modalIDTarget = ("#cand-modal-" + this.props.uid);

    //Class for the candidate popup
    var cssModal = (this.props.data.cssType + "-modal");

    //Place debug logs here.

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

                  <div className="row hr">
                    <div className={"col-md-4 "+ cssModal}>
                        <img className="cand-pic" src={headImageText} width="100%" />
                        <hr/>
                        <a className="btn btn-default option-btn pull-top" href={this.props.data.campaignWebsite} role="button">Campaign Website</a>
                        <a className="btn btn-default option-btn pull-top pull-right" href={this.props.data.wikipedia} role="button">Wikipedia</a>
                        <br />
                    </div>
                    <div className={"col-md-8 "+ cssModal}>
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
                    <div className={"col-md-4 "+ cssModal}>
                      <img src={this.props.data.logoImage} width="100%" />
                    </div>
                    <div className={"col-md-8 "+ cssModal + " twitter"}>
                      <div className="panel panel-default twitter-panel">
                        <div className="panel-heading text-center">
                          <h4><b>What people are saying about {this.props.data.fullName}</b></h4>
                        </div>
                        <div className="panel-body">

                          <Timeline

                              widgetId= {this.props.data.twitterID}
                              options={{
                                hashtag: this.props.data.twitterHashtag,
                                height: '400'
                              }}
                            />

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
