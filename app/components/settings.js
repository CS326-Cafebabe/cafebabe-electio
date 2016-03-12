import React from 'react';
import {Link} from 'react-router';
import {getUserData, setUserData} from '../server';
import RadioGroup from "react-radio-group";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "user": {
        "_id": 1,
        "email": "",
        "password": "",
        "fullName": "",
        "gender": "other",
        "race": "",
        "hispanic": "",
        "registered": "",
        "age": 21,
        "politicalAffiliation": 2,
        "location": "",
        "vote":0,

        "emailsettings": []
      },
      "input": {
        "fullName": "",
        "email":"",
        "password": ""
      },
      "lastUpdate": ""
    }
  }

  refresh() {
    getUserData(this.props.userId, (newUserData) => {
      this.setState({user: newUserData});

      this.setState({
        input: {
          fullName: newUserData.fullName,
          email: newUserData.email,
          password: "********"
        }
      })
    })
  }

  componentDidMount() {
    this.refresh();
  }

  //----------------------------------------------

  //Handles text input by writing it to the input section of state.
  //The text will be saved to the server when the button is clicked.
  // I would have preferred this to be one function but es6-linter kept complaining

  fullNameEdited(e) {
    this.setState({
      "input": {
        "fullName": e.target.value,
        "email":this.state.input.email,
        "password": this.state.input.password
      }
    })
  }

  emailEdited(e) {
    this.setState({
      "input": {
        "fullName": this.state.input.fullName,
        "email":e.target.value,
        "password": this.state.input.password
      }
    })
  }

  passwordEdited(e) {
    this.setState({
      "input": {
        "fullName": this.state.input.fullName,
        "email":this.state.input.email,
        "password": e.target.value
      }
    })
  }

  //----------------------------------------------

  //Deal with option changes
  //options should be passed in as the string of the key in userData - e.g. {"gender"}
  // call as:
  //onChange={(e) => {this.optionChange(e), optionToUpdate}
  optionChange(value, key) {
    //make callback to change state on db return
    //newUserData will be the db's version of the userData
    var callbackFunction = (newUserData) => {
      this.setState(
        {
          user: newUserData,
          input: {
            fullName: newUserData.fullName,
            email: newUserData.email,
            password: "********"
          },
          lastUpdate: key
      })
    }

    //create a copy of the state (we don't want 2 refreshes)
    var copy = this.state.user;
    //Update selected value
    copy[key] = value;

    //Call server function
    setUserData(this.state.user._id, copy, callbackFunction);
  }


  //Updates objects on button click.
  optionChangeOnClick(e, value, key){

    e.preventDefault();
    if (e.button === 0) {
      //call server method
      this.optionChange(value, key);
    }
  }


  //----------------------------------------------

  render() {

    var alertClassName = "";
    var alertText = "";
    if (this.state.lastUpdate !== ""){
      alertClassName = ("alert alert-success")
      alertText = (this.state.lastUpdate + " was updated successfully.")
    }

    return (
      <div>

        <div className={alertClassName} role="alert"><strong>{alertText}</strong></div>

        <div className="col-md-12 header">
          <h1>USER SETTINGS</h1>
          <hr/>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h3>Name</h3>
            <input name="name" type="text" value={this.state.input.fullName} onChange={(e) => {this.fullNameEdited(e)}} >
            </input>

            <button className="btn btn-default footer indent" onClick={(e) => {this.optionChangeOnClick(e, this.state.input.fullName, "fullName")}}>
              Save <span className="glyphicon glyphicon-edit"></span>
            </button>

            <h3>Gender</h3>
            <RadioGroup name="gender" selectedValue={this.state.user.gender} onChange={(e) => {
              this.optionChange(e, "gender")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value="male"/> Male
                  </label><br/>
                  <label>
                    <Radio value="female"/> Female
                  </label><br/>
                  <label>
                    <Radio value="other"/> Other
                  </label><br/>
                </div>
              )}
            </RadioGroup>

            <h3>Party Affiliation</h3>
            <RadioGroup name="party" selectedValue={this.state.user.politicalAffiliation} onChange={(e) => {
              this.optionChange(e, "politicalAffiliation")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value={1}/> Democratic Party
                  </label><br/>
                  <label>
                    <Radio value={2}/> Republican Party
                  </label><br/>
                  <label>
                    <Radio value={3}/> Green Party
                  </label><br/>
                  <label>
                    <Radio value={4}/> Libertarian
                  </label><br/>
                </div>
              )}
            </RadioGroup>

            <h3>Hispanic or Latino</h3>
            <RadioGroup name="hispanic" selectedValue={this.state.user.hispanic} onChange={(e) => {
              this.optionChange(e, "hispanic")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value={true}/> Hispanic or Latino
                  </label><br/>
                  <label>
                    <Radio value={false}/> Not Hispanic or Latino
                  </label><br/>
                </div>
              )}
            </RadioGroup>

            <h3>Race</h3>
            <RadioGroup name="race" selectedValue={this.state.user.race} onChange={(e) => {
              this.optionChange(e, "race")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value="African American/Black"/> African American/Black
                  </label><br/>
                  <label>
                    <Radio value="Asian American"/> Asian American
                  </label><br/>
                  <label>
                    <Radio value="Native American/Alaskan"/> Native American/Alaskan
                  </label><br/>
                  <label>
                    <Radio value="Pacific Islander"/> Pacific Islander
                  </label><br/>
                  <label>
                    <Radio value="White"/> White
                  </label><br/>

                </div>
              )}
            </RadioGroup>

          </div>

          <div className="col-md-5">

            <div className="media"></div>

            <h3>Email and Password</h3>
              <input name="email" type="text" value={this.state.input.email} onChange={(e) => {this.emailEdited(e)}} >
              </input>

              <button className="btn btn-default footer indent" onClick={(e) => {this.optionChangeOnClick(e, this.state.input.email, "email")}}>
                Save <span className="glyphicon glyphicon-edit"></span>
              </button>

            <br/>

              {//Password edit will probably require more work once we know how we're implementing it properly.
              //This placeholder will do for now.
            }
              <input name="password" type="password" value={this.state.input.password} onChange={(e) => {this.passwordEdited(e)}} >
              </input>

              <button className="btn btn-default footer indent" onClick={(e) => {this.optionChangeOnClick(e, this.state.input.password, "password")}}>
                Save <span className="glyphicon glyphicon-edit"></span>
              </button>



            <h3>Age Range</h3>
            <RadioGroup name="age" selectedValue={this.state.user.age} onChange={(e) => {
              this.optionChange(e, "age")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value="Under 18"/> Under 18
                  </label><br/>
                  <label>
                    <Radio value="18-24"/> 18-24
                  </label><br/>
                  <label>
                    <Radio value="25-34"/> 25-34
                  </label><br/>
                  <label>
                    <Radio value="35-44"/> 35-44
                  </label><br/>
                  <label>
                    <Radio value="45-54"/> 45-54
                  </label><br/>
                  <label>
                    <Radio value="55-64"/> 55-64
                  </label><br/>
                  <label>
                    <Radio value="65+"/> 65+
                  </label><br/>
                </div>
              )}
            </RadioGroup>

            <h3>Are You Registered In Real Life?</h3>
            <RadioGroup name="registered" selectedValue={this.state.user.registered} onChange={(e) => {
              this.optionChange(e, "registered")
            }}>
              {Radio => (
                <div>
                  <label>
                    <Radio value={true}/> Yes
                  </label><br/>
                  <label>
                    <Radio value={false}/> No
                  </label><br/>
                </div>
              )}
            </RadioGroup>

            <h3>Want Email Notifications?</h3>
            <Link to={"/emailsettings"} className="indent">Notify Me!</Link>

          </div>
          <div className="col-md-1"></div>
        </div>

      </div>

    );
  }
}
