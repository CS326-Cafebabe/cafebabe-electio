import React from 'react';
import Graph from './graph';

export default class GraphSection extends React.Component{
  constructor(props){
      super(props);
  }

  render(){
    if(this.props.loaded){
      //loaded
      var labels = this.props.data.labels;
      var ballot = this.props.data.ballot;
      var voters = this.props.data.voters;

      //Create Data for Each type
      //Vote Arrays
      var overallVotes = [0,0,0,0,0,0,0,0,0];
      var femVotes     = [0,0,0,0,0,0,0,0,0];
      var menVotes     = [0,0,0,0,0,0,0,0,0];
      var otherVotes   = [0,0,0,0,0,0,0,0,0];
      var whiteVotes   = [0,0,0,0,0,0,0,0,0];
      var blackVotes   = [0,0,0,0,0,0,0,0,0];
      var asianVotes   = [0,0,0,0,0,0,0,0,0];
      var nativeVotes  = [0,0,0,0,0,0,0,0,0];
      var pacificVotes = [0,0,0,0,0,0,0,0,0];


        //Fill In All Vote Arrays
      ballot.map((vote) => {
        overallVotes[vote.candidate-1]++;
        var userGen  = voters[vote.user-1].gender;
        var userRace = voters[vote.user-1].race;
        switch(userGen){
          case "female":
            femVotes[vote.candidate-1]++;
            break;
          case "male":
            menVotes[vote.candidate-1]++;
            break;
          case "other":
            otherVotes[vote.candidate-1]++;
            break;
          default:
            //Debugging Reasons
            overallVotes[8] = 10;
            break;
        }
        switch(userRace){
          case "White":
            whiteVotes[vote.candidate-1]++;
            break;
          case "African American/Black":
            blackVotes[vote.candidate-1]++;
            break;
          case "Asian American":
            asianVotes[vote.candidate-1]++;
            break;
          case "Native American/Alaskan":
            nativeVotes[vote.candidate-1]++;
            break;
          case "Pacific Islander":
            pacificVotes[vote.candidate-1]++;
            break;
          default:
            //Debugging Reasons
            overallVotes[8] = 20;
            break;
        }
      });

      //Initialize data compatible with react-chartjs
      var overall = {
        labels: labels,
        datasets: [
          {
            label: "Overall Votes",
            fillColor: "#6194BC",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: overallVotes
          }
        ]
      };
      var gender = {
        labels: labels,
        datasets: [
          {
            label: "Men votes",
            fillColor: "#6194BC",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: menVotes
          }, {
            label: "Women votes",
            fillColor: "#FF4E4E",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: femVotes
          }, {
            label: "Other Votes",
            fillColor: "#805889",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: otherVotes
          }
        ]
      };
      var race = {
        labels: labels,
        datasets: [
          {
            label: "White Votes",
            fillColor: "#6194BC",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: whiteVotes
          }, {
            label: "Black Votes",
            fillColor: "#FF4E4E",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: blackVotes
          }, {
            label: "Asian Votes",
            fillColor: "#805889",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: asianVotes
          }, {
            label: "Native Votes",
            fillColor: "#FFCD77",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: nativeVotes
          }, {
            label: "Alaskan Votes",
            fillColor: "#47824E",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: pacificVotes
          }
        ]
      };

      return (
        <div>
          <Graph type="overall" data={overall} />
          <Graph type="gender" data={gender} />
          <Graph type="race" data={race} />
        </div>
      );
    } else {
      //Not loaded
      return(
        <div>
          <div>
            <div className="trendy-text">
              <h2>Please Select a Date to Display Information</h2>
            </div>
          </div>
        </div>
      );
    }
  }
}
