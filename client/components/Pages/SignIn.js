import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";
import SignInWithGoogle from "./SignInWithGoogle";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(credentials);
  }

  render() {
    const { username, password } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="border-solid border-2 w-2/4 m-auto">
        <h2 className="text-center mt-15 text-xl">Sign In</h2>
        <form onSubmit={onSubmit} className="flex flex-col w-2/4 m-auto">
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={username}
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={onChange}
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={password}
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
            required
          ></input>
          <button className="bg-slate-400 rounded-md m-2 p-2 text-white">
            Sign In
          </button>
        </form>
        <a href="/auth/google">
          <button>Sign in with Google</button>
        </a>
        {/* <SignInWithGoogle /> */}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => dispatch(authenticate(credentials, "login")),
  };
};

export default connect((state) => state, mapDispatch)(SignIn);
