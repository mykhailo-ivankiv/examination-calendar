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

  toggleEdit = () => {
      this.setState({edit: !this.state.edit});

      if (!this.state.edit) {this.props.onEdit(); }
      else { this.props.onSave(); }


  }

  render() {
    const { profile, edit } = this.state;

    if (!profile) {
      return "";
    } else if (profile.error) {
      return <div className={b()}>{this.renderLoginLink()}</div>;
    } else {
      return (
        <div className={b()}>
          {profile.admin && !edit && <button className={b("button")} onClick={this.toggleEdit}>Edit</button>}
          {profile.admin && edit && <button className={b("button")} onClick={this.toggleEdit}>Done</button>}

          {profile && <img className={b("avatar")} src={profile.avatar_url} />}
        </div>
      );
    }
  }
}

export default User;
