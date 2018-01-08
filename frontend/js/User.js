import React, { Component } from "react";
import api from "./api";
import block from "./BEM";

const b = block("User");

class User extends Component {
  constructor(props) {
    super(props);
    const {code, access_token} = api;
    if (access_token) { this.getUser(); }

    this.state = {
        code
    };
  }

  async getUser() {
    const user = await api.getUser();
    this.setState({ user });
  }

  renderLoginLink = () =>
    <a href={`/auth/github`}>
        Увійти через Github
    </a>

  render() {
    const {code, access_token} = api;
    const {user} = this.state;

    if (!code && !access_token) {
        return <div className={b()}>{this.renderLoginLink()}</div>
    }

    return (
      <div className={b()}>
          {user && <img className={b("avatar")} src={user.avatar_url} />}
      </div>
    );
  }
}

export default User;