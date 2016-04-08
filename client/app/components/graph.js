import React from 'react';
import { Bar } from 'react-chartjs';

export default class Graph extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    //Create the Graph type
    //Graph Types are only for creating the legend tied to each graph
    if(this.props.type === "overall"){
      //Overall type
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className='my-legend-overall'>
                <div className='legend-title' id="overallTitle">Distribution of votes overall.</div>
                <div className='legend-scale'>
                  <ul className='legend-labels'>
                    <li>
                      <span className="legend-item-overall"></span>
                      Votes</li>
                  </ul>
                </div>
              </div>
              <div className="panel panel-default upper-graph-panel">
                <div className="panel-body">
                  <Bar data={this.props.data} id="overall" height="400px" width="900px"/>
                </div>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      );
    } else if(this.props.type === "gender") {
      //Gender type
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className='my-legend-gender'>
                <div className='legend-title' id="genderTitle">Distribution of votes based on user gender.</div>
                <div className='legend-scale'>
                  <ul className='legend-labels'>
                    <li>
                      <span className="legend-item-gender-1"></span>
                      Male</li>
                    <li>
                      <span className="legend-item-gender-2"></span>
                      Female</li>
                    <li>
                      <span className="legend-item-gender-3"></span>
                      Other</li>
                  </ul>
                </div>
              </div>
              <div className="panel panel-default mid-graph-panel">
                <div className="panel-body">
                  <Bar data={this.props.data} id="gender" height="400px" width="900px"/>
                </div>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      );
    } else if(this.props.type === "race"){
      //Race type
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className='my-legend-ethnic'>
                <div className='legend-title' id="ethnicTitle">Distribution of votes based on user race.</div>
                <div className='legend-scale col-md-2'>
                  <ul className='legend-labels'>
                    <li>
                      <span className="legend-item-ethnic-1"></span>
                      White</li>
                    <li>
                      <span className="legend-item-ethnic-2"></span>
                      Black</li>
                    <li>
                      <span className="legend-item-ethnic-3"></span>
                      Asian</li>
                  </ul>
                </div>
                <div className="legend-scale col-md-2">
                  <ul className='legend-labels'>
                    <li>
                      <span className="legend-item-ethnic-4"></span>
                      Native</li>
                    <li>
                      <span className="legend-item-ethnic-5"></span>
                      Pacific I.</li>
                  </ul>
                </div>
              </div>
              <div className="panel panel-default lower-graph-panel">
                <div className="panel-body">
                  <Bar data={this.props.data} id="race" height="400px" width="900px"/>
                </div>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      );
    } else {
      //Leaves the door open to implement different types of graphs with the data passed
      return (
        <p> Unknown type </p>
      );
    }
   }
}
