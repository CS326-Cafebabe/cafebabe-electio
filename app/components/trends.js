import React from 'react';
import {getAllEvents} from '../server';

export default class Trends extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "events": [{
        "name": "",
        "ballotBox": []
      }]
    }
  }

  refresh() {
    getAllEvents( (out) => {
      this.setState({events: out});
    })
   }

  componentDidMount() {
    this.refresh();
  }

  render() {
      return (
        <div>
          <div className="container-fluid">
            <div className="col-md-12 content">
              <div className="row">
                <div className="col-md-12 trending">
                  <h2>TRENDS <small>Graphical Information on Voting Patterns</small></h2>
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 articles">
                  <h3>Events</h3>
                  <hr />
                  <ul>
                    {this.state.events.map((event, i) =>
                      <li key={i}>{event.name}</li>
                    )}
                    <li className="media">
                      <div className="media-left media-top">
                        <span className="caret"></span>
                      </div>
                      <div className="media-body">
                        <a href="#/archive">More Past Events</a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="col-md-7 graphs">
                  <h3>Activity</h3>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default upper-graph" id='graph-1'>
                        <div className="panel-body">
                          <img className="img-responsive" src="img/graphs/graph1.png" width="700px" />
                        </div>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse aliquam aliquet justo a porttitor.
                        Cras felis enim, viverra vitae vestibulum sed, sagittis sit amet nibh.
                        Phasellus non dui a purus accumsan egestas.
                        Pellentesque laoreet ligula in libero fermentum mollis.</p>
                    </div>
                  </div>
                  <hr />
                  <div classNameName="row">
                    <div className="col-md-12">
                      <div className="panel panel-default upper-graph">
                        <div className="panel-body">
                          <img className="img-responsive" src="img/graphs/nhprimarygender.png" width="700px" />
                        </div>
                      </div>
                      <p>Integer malesuada nibh eget sem vulputate varius.
                        Etiam venenatis, metus ac cursus elementum, dui leo hendrerit ipsum,
                        fermentum tincidunt mauris quam sit amet odio.
                        Integer eu aliquam sapien, vitae rhoncus tellus.
                        Suspendisse vitae leo ac ante tempus sodales sed egestas magna.</p>
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
