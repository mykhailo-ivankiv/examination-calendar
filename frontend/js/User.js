import React, { Component } from "react";
import api from "./api";
import block from "./BEM";

const b = block("User");

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getProfile();
  }

  async getProfile() {
    const profile = await api.getProfile();
    this.setState({ profile });
  }

  renderLoginLink = () => <a href={`/auth/github`}>Увійти через Github</a>;

  render() {
    const { profile } = this.state;
    console.log(profile);
    if (!profile) {
      return "";
    } else if (profile.error) {
      return <div className={b()}>{this.renderLoginLink()}</div>;
    } else {
      return (
        <div className={b()}>
          {profile && <img className={b("avatar")} src={profile._json.avatar_url} />}
        </div>
      );
    }
  }
}

export default User;
