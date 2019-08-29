import React from 'react';
import { connect } from 'react-redux';

// Material ui
import { Button, TextField, CircularProgress } from '@material-ui/core';

import { Link } from 'react-router-dom';

// Redux
import * as authActions from '../../../store/actions/auth';
import * as appSettingActions from '../../../store/actions/appSetting';

class ForgotPassword extends React.Component {

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

    //Confirm Email
    if (!fields["confirmEmail"]) {
      formIsValid = false;
      errors["confirmEmail"] = true;
    }

    if (typeof fields["confirmEmail"] !== "undefined") {
      if (fields["confirmEmail"] !== fields["email"]) {
        formIsValid = false;
        errors["confirmEmail"] = true;
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = () => {
    const { fields } = this.state;
    const { sendEmail, wait } = this.props;
    wait(true);
    const data = {
      email: fields.email
    }
    sendEmail(data);
  };

  render() {
    const { errors } = this.state;
    var { waiting } = this.props;

    return (
      <div className="iron-forgot-pwd-form form-margin iron-shadow bg-base p-sm-25 py-20 px-15 rounded">
        <h3 className="active-color">Forgot Password?</h3>
        <h4 className="mb-5">No Problem</h4>
        <form>
          <div className="mb-30">
            <TextField
              required
              id="standard-email"
              label="enter your email"
              className="iron-form-input-wrap"
              type="email"
              // autoComplete="current-email"
              name="email"
              error={errors['email']}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
          <div className="mb-30">
            <TextField
              required
              id="standard-retype-email"
              label="retype your email"
              className="iron-form-input-wrap"
              type="email"
              // autoComplete="current-email"
              name="confirmEmail"
              error={errors['confirmEmail']}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
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
  sendEmail: authActions.sendEmail,
  wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
