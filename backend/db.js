const fs = require ("fs");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);

class DB {
    constructor () {
        this.subscriptions = {
            onInit: []
        };
        this.getData();
    }

    getStudents () {
        return this.data.students
    }

    getSchedule () {
        return this.data.schedule;
    }

    async getData () {
            this.data = JSON.parse(await readFile(__dirname + "/data.json", "utf8"));
            this.subscriptions.onInit.map(fn => fn(this));
    }

    onInit(fn) {
        this.subscriptions.onInit.push(fn);
    }
}

module.exports = new DB();
