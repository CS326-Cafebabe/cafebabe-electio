import React from 'react';

export default class Settings extends React.Component {
  render(){
    return(
      <div>
      <body/>
      <div className="container-fluid">
        <div className="row">
            <h1>User Settings</h1>
        </div>
        <div className="row">
          <hr />
        </div>

        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-5">
            <h3>Name</h3>
            <h6 className="indent">John Doe</h6>
            <button className="btn btn-default footer indent">
              Edit <span className="glyphicon glyphicon-edit"></span>
            </button>

            <h3>Gender</h3>
            <form role="form">
              <div className="radio indent">
                <label>
                  <input type="radio" name="gender"/>Male</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="gender"/>Female</label>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <input type="radio" name="gender"/>
                </span>
                <input type="text" className="form-control entry" placeholder="Other"/>
              </div>

            </form>

            <h3>Party Affiliation</h3>
            <form role="form">
              <div className="radio indent">
                <label>
                  <input type="radio" name="party"/>Democrat</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="party"/>Republican</label>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <input type="radio" name="party"/>
                </span>
                <input type="text" className="form-control" placeholder="Other"/>
              </div>
            </form>

            <h3>Hispanic or Latino</h3>
            <form role="form">

              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>Hispanic/Latino</label>
              </div>

              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>Not Hispanic/Latino</label>
              </div>
            </form>

            <h3>Race</h3>
            <form role="form">
              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>White</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>African American/Black</label>
              </div>

              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>Asian</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>Pacific Islander</label>

              </div>

              <div className="radio indent">
                <label>
                  <input type="radio" name="ethnicity"/>Native American/Alaskan</label>
              </div>

              <div className="input-group">
                <span className="input-group-addon">
                  <input type="radio" name="ethnicity"/>
                </span>
                <input type="text" className="form-control" placeholder="Other"/>
              </div>


            </form>


          </div>

          <div className="col-md-5">

            <div className="media">
            </div>

            <h3>Email and Password</h3>
            <h6 className="indent">johndoe@cafebabe.com</h6>
            <h6 className="indent">********</h6>
            <button className="btn btn-default footer indent">
              Edit <span className="glyphicon glyphicon-edit"></span>
            </button>

            <h3>Age Range</h3>
            <form role="form">
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>Under 18</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>18-24</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>25-34</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>35-44</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>45-54</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>55-64</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="age"/>65+</label>
              </div>
            </form>

            <h3>Are You Registered In Real Life?</h3>
            <form role="form">
              <div className="radio indent">
                <label>
                  <input type="radio" name="register"/>Yes</label>
              </div>
              <div className="radio indent">
                <label>
                  <input type="radio" name="register"/>No</label>
              </div>

            </form>

            <h3>Want Email Notifications?</h3>
            <a href="emailsettings.html" className="indent">Notify me!</a>
              <br/>
              <br/>
              <br/>
              <button className="btn btn-default footer save">
                Save
              </button>
          </div>
          <div className="col-md-1">
          </div>
        </div>

      </div>
      </div>

    );
  }
}
