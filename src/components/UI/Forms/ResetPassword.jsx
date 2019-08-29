import React from 'react';
import { connect } from 'react-redux';

// Material ui
import { Button, TextField, CircularProgress } from '@material-ui/core';

import { Link } from 'react-router-dom';

// Redux
import * as authActions from '../../../store/actions/auth';
import * as appSettingActions from '../../../store/actions/appSetting';

class ResetPassword extends React.Component {

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
    const { resetPassword, wait } = this.props;
    wait(true);
    const data = {
      password: fields.password,
      token: this.props.token
    }
    resetPassword(data);
  };

  render() {
    const { errors } = this.state;
    var { waiting } = this.props;

    return (
      <div className="iron-forgot-pwd-form form-margin iron-shadow bg-base p-sm-25 py-20 px-15 rounded">
        <h4 className="mb-5">Reset Password</h4>
        <form>
          <div className="mb-30">
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
          </div>
          <div className="mb-30">
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
          <Button variant="contained" className="button btn-active btn-disabled btn-lg mb-15" onClick={this.handleClick.bind(this)} disabled={waiting}>
          {waiting && <CircularProgress size={24} style={{position: "absolute"}} />}
            submit
          </Button>
        </form>
        <span className="d-block text-14">
          If have an account then
          <Link to="/signin"> Sign In</Link>
        </span>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => ({
  waiting: state.appSetting.waiting
})

const mapDispatchToProps = {
  resetPassword: authActions.resetPassword,
  wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
