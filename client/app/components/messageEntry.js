import React from 'react';

 export default class MessageEntry extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: ""
     };
   }



   handleKeyUp(e) {
     e.preventDefault();
     if (e.key === "Enter") {
       var comment = this.state.value.trim();
       if (comment !== "") {
         // Post comment
         this.props.onPost(this.state.value);
         this.setState({ value: "" });
       }
     }
   }

   handleClick(e) {
     e.preventDefault();
     var comment = this.state.value.trim();
     if (comment !== "") {
       // Post comment
       this.props.onPost(this.state.value);
       this.setState({ value: "" });
     }
   }

   handleChange(e) {
     e.preventDefault();
     this.setState({ value: e.target.value });
   }

   render() {
     return (
       <div>
         <div className="panel-footer">
           <div className="input-group">
             <input type="text" className="form-control" placeholder="Contribute to the Discussion..."
              value={this.state.value} onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)} />
              <span className="input-group-btn">
                <button className="btn btn-chat" type="button" onClick={(e) => this.handleClick(e)}>
                  <span className="glyphicon glyphicon-pencil"></span>
                </button>
              </span>
             </div>
           </div>
       </div>
     )
   }
 }
