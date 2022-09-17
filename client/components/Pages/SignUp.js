import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const user = this.state;
    this.props.signup(user);
  }
  render() {
    const { username, password, firstName, lastName, email } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="flex flex-col border-solid border-2 w-2/4 m-auto">
        <h2 className="text-center mt-5 text-xl">Create Your Account</h2>
        <form onSubmit={onSubmit} className="flex flex-col w-2/4 m-auto">
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={email}
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={username}
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={onChange}
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
          ></input>
          <button
            type="submit"
            className="bg-slate-400 rounded-md m-2 p-2 text-white"
          >
            Create account
          </button>
        </form>
        <a
          href="/auth/google"
          className="bg-red-600 rounded-md p-2 text-white text-center w-2/4 m-auto mb-5"
        >
          <button>Sign in with Google</button>
        </a>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    signup: (user) => dispatch(authenticate(user, "signup")),
  };
};

export default connect((state) => state, mapDispatch)(SignUp);
