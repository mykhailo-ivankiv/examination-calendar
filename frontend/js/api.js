import { Interval, DateTime } from "luxon";
class API {
  access_token = localStorage.getItem("access_token");
  client_id = "c248798633e9dcc6d002";
  client_secret = "ade727b69c01e6a3ee9046823a8fd39db4e9d60e";

  headers = new Headers({
    Accept: "application/vnd.github.v3+json"
  });

  async getToken() {
    const { client_id, client_secret, headers, code } = this;
    const body = new FormData();

    body.set("client_id", client_id);
    body.set("client_secret", client_secret);
    body.set("code", code);

    let response = await (await fetch(
      "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
      {
        method: "POST",
        mode: "cors",
        headers,
        body
      }
    )).json();

    if (response.access_token) {
      const { access_token } = response;
      localStorage.setItem("access_token", access_token);
      headers.append("Authorization", `token ${access_token}`);
    }
  }

  async authenticate() {
    let { code, access_token } = this;
    if (!access_token && code) {
      access_token = await this.getToken();
    }

    this.headers.append("Authorization", `token ${access_token}`);
  }

  async getUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    const { headers } = this;

    if (user) {
      return user;
    }

    user = await (await fetch(`https://api.github.com/user`, {
      headers,
      mode: "cors"
    })).json();

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  constructor() {
    this.code = new URLSearchParams(window.location.search).get("code");
    if (this.code) {
      history.replaceState({}, "", location.origin + location.pathname);
    }

    if (this.access_token || this.code) {
      this.authenticate();
    }
  }

  async getStudents() {
    return await (await fetch("/api/students")).json();
  }

  async setSchedule(newSchedule) {

    let body = JSON.stringify(
      newSchedule.map(({ studentId, time: { start, end } }) => ({
        studentId,
        time: {
          start,
          end
        }
      }))
    );

    await fetch("/api/schedule", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body
    });
  }
  async getSchedule() {
    const schedule = await (await fetch("/api/schedule")).json();
    return schedule.map(({ studentId, time }) => ({
      studentId,
      time: Interval.fromDateTimes(
        DateTime.fromISO(time.start),
        DateTime.fromISO(time.end)
      )
    }));
  }
}

export default new API();
