import { Interval, DateTime } from "luxon";
class API {
  access_token = localStorage.getItem("access_token");
  client_id = "c248798633e9dcc6d002";
  client_secret = "ade727b69c01e6a3ee9046823a8fd39db4e9d60e";

  headers = new Headers({
    Accept: "application/vnd.github.v3+json"
  });


  constructor() {
    this.code = new URLSearchParams(window.location.search).get("code");
    if (this.code) {
      history.replaceState({}, "", location.origin + location.pathname);
    }

    if (this.access_token || this.code) {
      this.authenticate();
    }
  }

  async getProfile () {
      return await (await fetch("/api/profile", {
          credentials: 'include',
      })).json();
  }

  async getStudents() {
    return await (await fetch("/api/students", {
        credentials: 'include',
    })).json();
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
      credentials: 'include',
      body
    });
  }

  async getSchedule() {
    const schedule = await (await fetch("/api/schedule", {
        credentials: 'include'
    })).json();
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
