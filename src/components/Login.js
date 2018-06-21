import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to Manage Your Stores Inventory.</p>
    <button className="facebook" onClick={() => props.authenticate("facebook")}>
      Log In With facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
