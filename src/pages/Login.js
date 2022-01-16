import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../actions/index';
import trybeLogo from '../imgs/logo_login.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validation());
  }

  validation() {
    const { email, password } = this.state;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const emailValid = (regex.test(email));

    if (emailValid && password.length >= 6) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { login, history } = this.props;
    login({ email, password });
    this.setState({
      disabled: true,
    });
    history.push('/carteira');
  }

  renderInput() {
    const { email, password } = this.state;
    return (
      <>
        <label htmlFor="login-email">
          Email:
          <input
            className="form-control"
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            data-testid="email-input"
            placeholder="Email"
          />
        </label>
        <p></p>
        <label htmlFor="login-password">
          Senha:
          <input
            className="form-control"
            placeholder="Senha"
            data-testid="password-input"
            id="login-password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>
      </>
    );
  }

  renderForm() {
    const { disabled } = this.state;
    return (
      <div className="form">
        <img
          id="login-img"
          className="login-img-card"
          src={trybeLogo}
          alt="trybe-login"
        />
        <p id="profile-name" className="profile-name-card" />
        <form className="form-signin">
          <div className="form-group">
            {this.renderInput()}
            <button
              className="btn btn-success btn-block"
              type="submit"
              value="Entrar"
              onClick={this.handleClick}
              disabled={disabled}
            >
              Entrar
            </button>
          </div>
        </form>
      </div >
    );
  }

  render() {
    return (
      <div className="container  d-flex justify-content-center">
        <span className="border border-secondary rounded">
          {this.renderForm()}
        </span>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actionLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
