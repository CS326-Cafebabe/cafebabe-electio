import React from 'react';

export default class HomeThumbnail extends React.Component {

  render() {
    return (
      <div className="col-xs-4 col-md-4">

          <a href="#BenCarson" className="thumbnail republican-thumb" data-toggle="modal" data-target="#myModal">
            <img className="img-responsive" src="img/candidateHeads/carsonHead.jpg" alt="Marco Rubio"/>
            <div className="caption"><strong>Ben Carson</strong><br/>
              Republican Party
            </div>
          </a>


      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Modal Title</h4>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-md-4">
                  <div className="thumbnail">
                    <img src="img/candidateHeads/sandersHead.jpg" width="75%" />
                    <div className="caption">
                      <p className="text-center quote">
                        <i>"A political revolution is coming"</i>
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-default option-btn">
                    Campaign Website
                  </button>
                  <button className="btn btn-default option-btn">
                    Wikipedia
                  </button>
                </div>
                <div className="col-md-8">
                  <button className="btn btn-default pull-right exit">
                    <span className="glyphicon glyphicon-remove"></span>
                  </button>
                  <h1 className="text-center">BERNIE SANDERS</h1>
                  <p className="info"><b>Age:</b> 74
                    <br/><b>Affiliation:</b> Democratic Party
                    <br/><b>U.S. Senator:</b> 2007-present
                  </p>
                  <p>
                    The 2016 presidential campaign of Bernie Sanders, the junior United States Senator and former Representative from Vermont, began with a formal announcement by Sanders on May 26, 2015, in Burlington, Vermont, which followed an informal announcement on April 30. Sanders had been considered a potential candidate for President of the United States since at least September 2014. Although Sanders is an independent, he caucuses with the Democratic Party in the Senate, as many of his views align with those of Democrats, and he is running for the Democratic nomination.

Sanders's chief competitor for the nomination is Hillary Clinton; Martin O'Malley was in a distant third place until he suspended his campaign on February 1, 2016. Sanders draws large crowds to his speaking events and his populist and democratic socialist politics have won him support from working‑class voters, especially those under 40. He performs strongly with white voters but has consistently trailed Clinton by 30 or more percentage points among nonwhite voters.

Sanders has stated that his campaign will focus on income and wealth inequality, which he argues is eroding the American middle class, and on campaign finance reform. Unlike most other major presidential candidates, Sanders has eschewed an unlimited super PAC, instead choosing to receive most of his funding from direct individual campaign donations. On September 30, 2015, The New York Times reported that Sanders had raised $26 million over the preceding three months, close behind Hillary Clinton's $28 million, and that the campaign had received one million individual donations, becoming the first in 2015 to reach that threshold
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <img src="img/bernieLogo.png" width="100%" />
                </div>
                <div className="col-md-8 twitter">
                  <div className="panel panel-default twitter-panel">
                    <div className="panel-heading text-center">
                      <h2><b>What people are saying about Sanders</b></h2>
                    </div>
                    <div className="panel-body">
                      <img src="img/temp/twitterFeed.jpg" width="100%" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>



    );
  }
}
