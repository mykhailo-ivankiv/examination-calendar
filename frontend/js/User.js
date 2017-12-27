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
    <a href="https://github.com/login/oauth/authorize?client_id=c248798633e9dcc6d002">
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

class _User {
  client_id = "c248798633e9dcc6d002";
  client_secret = "ade727b69c01e6a3ee9046823a8fd39db4e9d60e";

  headers = new Headers({
    Accept: "application/vnd.github.v3+json"
  });

  getData = async () => {
    const { headers, access_token } = this;
    const user = await (await fetch(`https://api.github.com/user`, {
      headers: {
        // "Accept": "application/json",
        Authorization: `token ${access_token}`
      },
      mode: "cors"
    })).json();

    document.getElementById("user").innerHTML = `<img src="${
      user.avatar_url
    }" />`;
  };

  constructor() {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      this.headers.append("Authorization", `token ${access_token}`);
      this.access_token = access_token;
      this.getData();
    }

    if (!access_token) {
      let code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        const { client_id, client_secret, headers } = this;
        const body = new FormData();

        body.set("client_id", client_id);
        body.set("client_secret", client_secret);
        body.set("code", code);

        (async () => {
          let responce = await (await fetch(
            "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
            {
              method: "POST",
              mode: "cors",
              headers,
              body
            }
          )).json();

          if (responce.access_token) {
            const { access_token } = user;
            localStorage.setItem("access_token", access_token);
            headers.append("Authorization", `token ${access_token}`);
          }
        })();
      }
    }
  }
}

new _User();