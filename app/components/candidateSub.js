import React from 'react';

export default class CandidateSub extends React.Component {
  render() {
    return (
      <div>
          <div className="panel panel-default dem-panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="media">
                    <div className="media-left">
                      <img src="img/candidateHeads/sandersHead.jpg" width="100%" />
                    </div>
                    <div className="media-body">
                      Bernie Sanders, Democratic Party.
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="btn-group  " data-toggle="buttons">
                    <label className="btn btn-primary">
                      <input type="radio" name="options" id="onBernie" autoComplete="off"/> On
                    </label>
                    <label className="btn btn-primary active">
                      <input type="radio" name="options" id="offBernie" autoComplete="off" checked/> Off
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
        );
  }


}
