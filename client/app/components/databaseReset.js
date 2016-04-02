import React from 'react';
// import {resetDatabase} from '../database.js'

 /**
  * Reset database button.
  */
 export default class ResetDatabase extends React.Component {
   render() {
   return (
     <a className="btn" type="button" onClick={() => {
       var xhr = new XMLHttpRequest();
       xhr.open('POST', '/resetdb');
       xhr.addEventListener('load', function() {
         window.alert("Database reset! Refreshing the page now...");
         document.location.reload(false);
       });
       xhr.send();
     }}>Reset Mock DB</a>
   );
 }
 }

 // export default class ResetDatabase extends React.Component {
 //   render() {
 //     return (
 //       <a className="btn" type="button" onClick={() => {
 //         resetDatabase();
 //         window.alert("Database reset! Refreshing the page now...");
 //         document.location.reload(false);
 //       }}>Reset Mock DB <span className="glyphicon glyphicon-refresh sidebar-glyph"></span> </a>
 //     );
 //   }
 // }
