import React from 'react';
import { connect } from 'react-redux';

import { Button, TextField, CircularProgress } from '@material-ui/core';

import { Link } from 'react-router-dom';

// Redux
import * as authActions from '../../../store/actions/auth';
import * as appSettingActions from '../../../store/actions/appSetting';

class SignIn extends React.Component {

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
  };

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

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = true;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = () => {
    const { fields } = this.state;
    const { login, wait } = this.props;
    wait(true);
    const data = {
      email: fields.email,
      password: fields.password
    }
    login(data);
  };

  render() {
    const { errors } = this.state;
    var { waiting } = this.props;

    return (
      <div>
        <h4>user sign in</h4>
        <form>
          <div>
            <TextField
              required
              id="standard-email"
              label="email"
              className="iron-form-input-wrap"
              type="email"
              // autoComplete="current-email"
              name="email"
              error={errors['email']}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
          <div className="mb-15">
            <TextField
              required
              id="standard-password-input"
              label="Password"
              className="iron-form-input-wrap"
              type="password"
              // autoComplete="current-password"
              name="password"
              error={errors['password']}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
          <div className="d-sm-flex justify-content-between align-items-center mb-sm-10 mb-20" style={{float: 'right'}}>
            {/* <FormGroup >
              <FormControlLabel
                control={
                  <Checkbox
                    value="checkedA"
                    color="primary"
                  />
                }
                label="Remember Me"
              />
            </FormGroup> */}
            <p className="d-inline-block"><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
          <Button variant="contained" className="button btn-active btn-disabled btn-lg mb-25 mt-25" onClick={this.handleClick.bind(this)} disabled={waiting}>
          {waiting && <CircularProgress size={24} style={{position: "absolute"}} />}
            sign in
          </Button>
          <p className="mb-0">Don't have an account? <Link to="/signup">Click here to create one</Link></p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => ({
  waiting: state.appSetting.waiting
})

const mapDispatchToProps = {
  login: authActions.login,
  wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);