const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
class DB {
  constructor() {
    this.FILEPATH = __dirname + "/data.json";
    this.subscriptions = {
      onInit: []
    };
    this.getData();
  }

  getStudents() {
    return this.data.students;
  }

  getSchedule() {
    return this.data.schedule;
  }

  async getData() {
    this.data = JSON.parse(await readFile(this.FILEPATH, "utf8"));
    this.subscriptions.onInit.map(fn => fn(this));
  }

  async setSchedule(schedule) {
    this.data.schedule = schedule;
    writeFile(this.FILEPATH, JSON.stringify(this.data, null, "  "));
  }

  onInit(fn) {
    this.subscriptions.onInit.push(fn);
  }
}

module.exports = new DB();
