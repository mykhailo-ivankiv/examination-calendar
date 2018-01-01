import Select from "react-select";
import React, { Component } from "react";
import { DateTime, Interval } from "luxon";
import api from "./api";

import "../css/Calendar.css";
import BEM from "./BEM";
const b = BEM("Calendar");

class Calendar extends Component {
  constructor(props) {
    super(props);

    // const from = DateTime.local(2017, 12, 28);
    const from = DateTime.local().set({
      hours: 0,
      minutes: 0,
      seconds: 0,
      millisecond: 0
    });
    const to = DateTime.local(2018, 1, 18);

    const interval = Interval.fromDateTimes(from, to).splitBy({ days: 1 });
    this.state = {
      from,
      to,
      interval,
      schedule: [],
      students: []
    };
    this.getData();
  }
  async getData() {
    const [students, schedule] = await Promise.all([
      api.getStudents(),
      api.getSchedule()
    ]);

    console.log("studentId", students);

    this.setState({ students, schedule });
  }
  render() {
    const { interval } = this.state;
    return <div>{interval.map(this.renderDay.bind(this))}</div>;
  }

  renderHour(hour) {
    const { schedule, students } = this.state;

    const reservation = schedule.find(({ time }) => time.equals(hour));
    const className = reservation ? "Hour Hour_reserved" : "Hour";

    return (
      <div className={className}>
        <span className="Hour__time">
          {hour.start.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>
        {reservation &&
          reservation.studentId &&
          students[reservation.studentId].name}
      </div>
    );
  }

  renderDay(day) {
    const { start } = day;
    const workDay = Interval.after(start.set({ hour: 10 }), {
      hours: 8
    }).splitBy({ hour: 1 });

    const isWeekend =
      start.weekdayShort === "Sat" || start.weekdayShort === "Sun";

    const isHoliday = this.holidays.some(holiday => holiday.equals(day));

    return (
      <time className={b("day", { weekend: isWeekend || isHoliday })}>
        {/*<Select*/}
        {/*options={students.map(({ id, name }) => ({ value: id, label: name }))}*/}
        {/*/>*/}
        <span className={b("title")}>
          {start.toLocaleString({
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </span>
        {!isWeekend && !isHoliday && workDay.map(this.renderHour.bind(this))}
      </time>
    );
  }

  holidays = [
    Interval.after(DateTime.local(2018, 1, 6), { day: 1 }),
    Interval.after(DateTime.local(2018, 1, 7), { day: 1 }),
    Interval.after(DateTime.local(2018, 1, 14), { day: 1 })
  ];
}
export default Calendar;
