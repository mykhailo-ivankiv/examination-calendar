import Select from "react-select";

const students = [
  { id: 0, name: "Dmytro Kushnir" },
  { id: 1, name: "Kovtun Matt" },
  { id: 2, name: "Maria Dobko" },
  { id: 3, name: "Maryana Mysak" },
  { id: 4, name: "Orest Rehusevych" },
  { id: 5, name: "Pankiv Andriy" },
  { id: 6, name: "Serhii Dubovyk" },
  { id: 7, name: "Taras Zelyk" },
  { id: 8, name: "Anton Tarasov" },
  { id: 9, name: "Vladyslav Velychko" },
  { id: 10, name: "Anastasia Vedernikova" },
  { id: 11, name: "Arsen Senkivskyy" },
  { id: 12, name: "Andriy Borovets" },
  { id: 13, name: "Bogdan Kovalchuk" },
  { id: 14, name: "Dzvinka Yarish" },
  { id: 15, name: "Korabliova Olya" },
  { id: 16, name: "Korduba Yaryna" },
  { id: 17, name: "Laba Yuriy" },
  { id: 18, name: "Lebedenko Roksoliana" },
  { id: 19, name: "Marc Soumoussou Kodjovi" },
  { id: 20, name: "Mohylevska Kateryna" },
  { id: 21, name: "Myroslav Syvokhip" },
  { id: 22, name: "Natalija Paranyak" },
  { id: 23, name: "Nina Bondar" },
  { id: 24, name: "Oleh Smolkin" },
  { id: 25, name: "Oleksandr Pryhoda" },
  { id: 26, name: "Olenyuk Oksana" },
  { id: 27, name: "Olya Bakay" },
  { id: 28, name: "Ostap Kharysh" },
  { id: 29, name: "Pavlyshyn Yaryna" },
  { id: 30, name: "Petro Karabyn" },
  { id: 31, name: "Petryshak" },
  { id: 32, name: "Skibinska Olena" },
  { id: 33, name: "Yasya Shpot" }
];

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

  openScheduler(hour) {
    console.log(hour.toLocaleString());
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

  reserved = [
    {
      student: "Laba Yuriy",
      time: Interval.after(DateTime.local(2018, 1, 2, 11), { hour: 1 })
    },
    {
      student: "Orest Rehusevych",
      time: Interval.after(DateTime.local(2017, 12, 29, 14), { hour: 1 })
    },
    {
      student: "Pankiv Andriy",
      time: Interval.after(DateTime.local(2017, 12, 29, 15), { hour: 1 })
    },
    {
      student: "Serhii Dubovyk",
      time: Interval.after(DateTime.local(2018, 1, 2, 10), { hour: 1 })
    },
    {
      student: "Mohylevska Kateryna",
      time: Interval.after(DateTime.local(2017, 12, 29, 11), { hour: 1 })
    },
    {
      student: "Nina Bondar",
      time: Interval.after(DateTime.local(2018, 1, 2, 12), { hour: 1 })
    },
    {
      student: "Vladyslav Velychko",
      time: Interval.after(DateTime.local(2018, 1, 2, 14), { hour: 1 })
    },
    {
      student: "Arsen Senkivskyy",
      time: Interval.after(DateTime.local(2018, 1, 3, 13), { hour: 1 })
    },
    {
      student: "Maryana Mysak",
      time: Interval.after(DateTime.local(2018, 1, 3, 12), { hour: 1 })
    },
    {
      student: "Pankiv Andriy",
      time: Interval.after(DateTime.local(2018, 1, 3, 14), { hour: 1 })
    },
    {
      student: "Maria Dobko",
      time: Interval.after(DateTime.local(2018, 1, 8, 12), { hour: 1 })
    },
    {
        student: "Olya Bakay",
        time: Interval.after(DateTime.local(2018, 1, 5, 12), { hour: 1 })
    },
    {
        student: "Skibinska Olena",
        time: Interval.after(DateTime.local(2018, 1, 1, 12), { hour: 1 })
    },
    {
        student: "Natalija Paranyak",
        time: Interval.after(DateTime.local(2018, 1, 4, 15), { hour: 1 })
    },

  ];
}
export default Calendar;
