import Select from "react-select";

const schedule = [
    {
        student: "Laba Yuriy",
        time: Interval.after(DateTime.local(2018, 1, 2, 11), { hour: 1 }).toLocaleString()
    },
    {
        student: "Orest Rehusevych",
        time: Interval.after(DateTime.local(2017, 12, 29, 14), { hour: 1 }).toLocaleString()
    },
    {
        student: "Pankiv Andriy",
        time: Interval.after(DateTime.local(2017, 12, 29, 15), { hour: 1 }).toLocaleString()
    },
    {
        student: "Serhii Dubovyk",
        time: Interval.after(DateTime.local(2018, 1, 2, 10), { hour: 1 }).toLocaleString()
    },
    {
        student: "Mohylevska Kateryna",
        time: Interval.after(DateTime.local(2017, 12, 29, 11), { hour: 1 }).toLocaleString()
    },
    {
        student: "Nina Bondar",
        time: Interval.after(DateTime.local(2018, 1, 2, 12), { hour: 1 }).toLocaleString()
    },
    {
        student: "Vladyslav Velychko",
        time: Interval.after(DateTime.local(2018, 1, 2, 14), { hour: 1 }).toLocaleString()
    },
    {
        student: "Arsen Senkivskyy",
        time: Interval.after(DateTime.local(2018, 1, 3, 13), { hour: 1 }).toLocaleString()
    },
    {
        student: "Maryana Mysak",
        time: Interval.after(DateTime.local(2018, 1, 3, 12), { hour: 1 }).toLocaleString()
    },
    {
        student: "Pankiv Andriy",
        time: Interval.after(DateTime.local(2018, 1, 3, 14), { hour: 1 }).toLocaleString()
    },
    {
        student: "Maria Dobko",
        time: Interval.after(DateTime.local(2018, 1, 8, 12), { hour: 1 }).toLocaleString()
    },
    {
        student: "Olya Bakay",
        time: Interval.after(DateTime.local(2018, 1, 5, 12), { hour: 1 }).toLocaleString()
    },
    {
        student: "Skibinska Olena",
        time: Interval.after(DateTime.local(2018, 1, 2, 13), { hour: 1 }).toLocaleString()
    },
    {
        student: "Natalija Paranyak",
        time: Interval.after(DateTime.local(2018, 1, 4, 15), { hour: 1 }).toLocaleString()
    }
];

console.log(JSON.stringify(schedule));

import React, { Component } from "react";
import { DateTime, Interval } from "luxon";
import BEM from "./BEM";
const b = BEM("Calendar");

class Calendar extends Component {
  constructor(props) {
    super(props);

    const from = DateTime.local(2017, 12, 28);
    const to = DateTime.local(2018, 1, 18);

    const interval = Interval.fromDateTimes(from, to).splitBy({ days: 1 });
    this.state = { from, to, interval };
  }

  render() {
    const { interval } = this.state;
    return <div>{interval.map(this.renderDay.bind(this))}</div>;
  }

  renderHour(hour) {
    const reservation = this.reserved.find(({ time }) => time.equals(hour));
    const className = reservation ? "Hour Hour_reserved" : "Hour";

    return (
      <div className={className}>
        <span className="Hour__time">
          {hour.start.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>
        {reservation ? reservation.student : ""}
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
    // Interval.after(DateTime.local(2018, 1, 5), { day: 1 }),
    Interval.after(DateTime.local(2018, 1, 6), { day: 1 }),
    Interval.after(DateTime.local(2018, 1, 7), { day: 1 }),
    Interval.after(DateTime.local(2018, 1, 14), { day: 1 })
  ];

  reserved = [];
}
export default Calendar;
