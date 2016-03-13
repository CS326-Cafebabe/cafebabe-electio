import React, { Component } from 'react';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
import 'moment/locale/nb';

export default class CalendarExample extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date: moment(),
        myEventsList: {
          "date": "",
          "name": "",
          "location": "",
          "summary": "",
          "party": "",
          "ballotBox": []
        }
      };
    }


  render() {
    return (
      <Calendar
        onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
        onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
        date={this.state.date}
        onPickDate={(date) => console.log(date)}
        renderDay={(day) => day.format('D')}
      />
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
