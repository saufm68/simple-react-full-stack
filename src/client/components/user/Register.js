import React from "react";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: null
    };
    this.checkRegister = this.checkRegister.bind(this);
  }

  checkRegister(event) {
    event.preventDefault();
    const username = event.target.childNodes[3].value;
    const fullName = event.target.childNodes[1].value;
    const password = event.target.childNodes[5].value;
    const email = event.target.childNodes[7].value;
    fetch("/api/checkRegister", {
      method: "post",
      body: JSON.stringify({
        username: username,
        fullName: fullName,
        password: password,
        email: email
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.eExist) {
          this.setState({ check: "emailExist" });
        } else if (data.uExist) {
          this.setState({ check: "usernameExist" });
        }
      });
  }

  render() {
    if (this.state.check === "emailExist") {
      var exist = <div>There is already an account using this email</div>;
    } else if (this.state.check === "usernameExist") {
      var exist = <div>This username already exist</div>;
    } else {
      var exist = undefined;
    }
    return (
      <div>
        {exist}
        <h1>Register</h1>
        <form id="registerForm" onSubmit={this.checkRegister}>
          <h3>Full Name:</h3>
          <input type="text" name="fname" />
          <h3>Username:</h3>
          <input type="text" name="username" />
          <h3>Password:</h3>
          <input type="password" name="password" />
          <h3>Email:</h3>
          <input type="email" name="email" />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
