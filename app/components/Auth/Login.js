import React, { PropTypes } from 'react';
import './styles.css';

export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    email: '',
    password: ''
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
  }

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.handleLogin(email, password);
  }

  render() {
    const { auth: { error } } = this.props;
    const { email, password } = this.state;

    return (
      <div className='wrapper' style={{marginTop: '100px'}}>
        <div className="title">Login</div>

        {error
          ? <div>{error.message}</div>
          : null}

        <div className="code">
          <code>
            <span className="hilight">email@adress</span>
          </code>
          <br />
          <code>
            <span className="hilight">pass</span>
          </code>
        </div>

        <form onSubmit={this.handleLogin}>
            <label htmlFor="email">E-mail</label>

            <input
              className="input"
              value={email}
              onChange={this.handleChange('email')}
              id="email"
              type="email"
              placeholder="Email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="input"
              value={password}
              onChange={this.handleChange('password')}
              id="password"
              type="password"
              placeholder="Password"
              required
            />

            <button
              className="btn"
              type="submit"
            >
            Login
            </button>
        </form>
      </div>
    );
  }
}
