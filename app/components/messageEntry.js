import React from 'react';

 export default class MessageEntry extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: ""
     };
   }

   handleChange(e) {
     this.setState({ value: e.target.value });
   }

   handleKeyUp(e) {
     if (e.key === "Enter") {
       var comment = this.state.value.trim();
       if (comment !== "") {
         // Post comment
         this.props.onPost(this.state.value);
         this.setState({ value: "" });
       }
     }
   }

   render() {
     return (
       <div>
         <div className="panel-footer">
           <div className="input-group">
             <span className="input-group-btn">
               <button className="btn btn-chat" type="button">
                 <span classNameName="glyphicon glyphicon-pencil"></span>
               </button>
             </span>
             <input type="text" className="form-control" placeholder="Contribute to the Discussion..."
              value={this.state.value} onChage={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)} />
             </div>
           </div>
       </div>
     )
   }
 }
