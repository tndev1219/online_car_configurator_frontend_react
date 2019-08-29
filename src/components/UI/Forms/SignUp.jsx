import React from 'react';
import { connect } from 'react-redux';

// Material ui
import { Button, TextField, CircularProgress } from '@material-ui/core';

import { Link } from 'react-router-dom';

// Redux
import * as authActions from '../../../store/actions/auth';
import * as appSettingActions from '../../../store/actions/appSetting';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  handleClick = () => {
    if (this.handleValidation()) {
      this.handleSubmit();
    }
  };

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleClick();
    }
  };

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //First Name
    if (!fields["fname"]) {
      formIsValid = false;
      errors["fname"] = true;
    }

    //Last Name
    if (!fields["lname"]) {
      formIsValid = false;
      errors["lname"] = true;
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = true;
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = true;
      }
    }

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = true;
    }

    //Confirm Password
    if (!fields["confirmpassword"]) {
      formIsValid = false;
      errors["confirmpassword"] = true;
    }

    if (typeof fields["confirmpassword"] !== "undefined") {
      if (fields["confirmpassword"] !== fields["password"]) {
        formIsValid = false;
        errors["confirmpassword"] = true;
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = () => {
    const { fields } = this.state;
    const { signup, wait } = this.props;
    wait(true);
    const data = {
      fname: fields.fname,
      lname: fields.lname,
      email: fields.email,
      password: fields.password
    }
    signup(data);
  };

  render() {
    const { errors } = this.state;
    var { waiting } = this.props;

    return (
      <div className="iron-sign-up-form form-margin iron-shadow bg-base p-sm-25 py-20 px-15 rounded">
        <h4>Enter your details</h4>
        <form>
          <TextField
            required
            id="standard-fname"
            label="first Name"
            className="iron-form-input-wrap"
            type="name"
            name="fname"
            error={errors['fname']}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            // autoComplete="current-name"
          />
          <TextField
            required
            id="standard-lname"
            label="last Name"
            className="iron-form-input-wrap"
            type="name"
            name="lname"
            error={errors['lname']}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            // autoComplete="current-name"
          />
          <TextField
            required
            id="standard-email"
            label="email"
            className="iron-form-input-wrap"
            type="email"
            name="email"
            error={errors['email']}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            // autoComplete="current-email"
          />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            className="iron-form-input-wrap"
            type="password"
            name="password"
            error={errors['password']}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            //autoComplete="current-password"
          />
          <div className="mb-25">
            <TextField
              required
              id="standard-confirm-password-input"
              label="retype Password"
              className="iron-form-input-wrap"
              type="password"
              name="confirmpassword"
              error={errors['confirmpassword']}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              // autoComplete="current-password"
            />
          </div>
          <Button variant="contained" className="button btn-active btn-disabled btn-lg mb-10" onClick={this.handleClick.bind(this)} disabled={waiting}>
          {waiting && <CircularProgress size={24} style={{position: "absolute"}} />}
            sign up
          </Button>
        </form>
        <span className="text-14 text-capitalize pt-10 d-inline-block">already have an account ? then <Link to="/signin">sign in</Link></span>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => ({
  waiting: state.appSetting.waiting
})

const mapDispatchToProps = {
  signup: authActions.signup,
  wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);