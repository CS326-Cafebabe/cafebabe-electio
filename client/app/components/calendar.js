import React, { Component } from 'react';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
import {getAllEvents} from '../server'

export default class CalendarExample extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date: moment(),
        myEventsList: [{
          "date": "",
          "name": "",
          "location": "",
          "summary": "",
          "party": "",
          "ballotBox": []
        }
      ],
      dayPicked: moment(),
      eventsOnDay: [{
        "date": "",
        "name": "",
        "location": "",
        "summary": "",
        "party": "",
        "ballotBox": []
      }]
      };
    }


    refresh(){
      getAllEvents((out) => {
          this.setState({myEventsList: out});
      })
    }

    componentDidMount(){
      this.refresh();
    }

    checkEvents(date){
      var tempEvent = [];
      for(var i = 0; i < this.state.myEventsList.length; i++){
        if(this.state.myEventsList[i].date === date.format('D. MMMM YYYY')){
          tempEvent.push(this.state.myEventsList[i]);
        }
      }
      this.setState({eventsOnDay: tempEvent,
        dayPicked: date
      });
    }



    dayContainsEvent(day){
      for(var i = 0; i < this.state.myEventsList.length; i++){
        if(this.state.myEventsList[i].date === day.format('D. MMMM YYYY')){
          return(
            <b>day.format('D')</b>
          )
        }
        return day;
      }
    }

    renderDay(day){
      // var temp = day.format('D');
        for(var i = 0; i < this.state.myEventsList.length; i++){

          if(this.state.myEventsList[i].date === day.format('D. MMMM YYYY')){
            console.log('bold');
            return(
            day.format('D').bold()
          )
      }

      // if(this.state.myEventsList[i].date.indexOf(day.format('D. MMMM YYYY')) === -1){
      //   return(
      //     day.format('D')
      //   )
      // }
      //



    }



  }


  render() {

    var events = this.state.eventsOnDay;

    return (
      <div>
        <div className="row">
          <div className="col-md-12 trending">
            <h1>CALENDAR<small>  See when important events are</small>
            </h1>
            <hr/>
          </div>
        </div>

      <Calendar
        onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
        onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
        date={this.state.date}
        onPickDate={(date) => this.checkEvents(date)}
        renderDay={(day) => day.format('D')}
        renderEvents={(events) => this.renderDay(events)}
      />
    <br/>
    <p> Instructions: Click on a Day to see the events on that day!</p>
    <div className="alert alert-success" role="alert"><strong>Events On {this.state.dayPicked.format('MM/DD/YYYY')}:</strong>
      {events.map((events, i) => {
        return(
          <div key = {i}>
            {events.name}
          </div>
        )
      })
    }
    </div>

  </div>
    );
  }
}




// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { Calendar } from 'react-calendar-component';
// import moment from 'moment';
// import 'moment/locale/nb';
//
//
// export default class Calendar extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: moment(),
//       myEventsList: {
//         "date": "",
//         "name": "",
//         "location": "",
//         "summary": "",
//         "party": "",
//         "ballotBox": []
//       }
//     };
//   }
//
//
//
// render(){
//   return (
//     <Calendar
//       onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
//       onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
//       date={this.state.date}
//       onPickDate={(date) => console.log(date)}
//     />
//   );
// }
// }
