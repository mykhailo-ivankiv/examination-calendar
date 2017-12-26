import {DateTime, Interval} from 'luxon'
import BEM from "./BEM";
const b = BEM("Calendar");

class Calendar {
    constructor (container) {
        const from = DateTime.local(2017, 12, 25);
        const to = DateTime.local(2018, 2, 1);

        Interval
            .fromDateTimes(from, to)
            .splitBy({days: 1})
            .map (this.renderDay)
            .forEach( dayEl => {
                container
                    .append(dayEl);
            });
    }

    renderDay = (day) => {
        const {start} = day;
        const workDay = Interval
            .after( start.set({hour: 10}),  {hours: 8} )
            .splitBy({hour: 1});

        const isWeekend = start.weekdayShort === "Sat" || start.weekdayShort === "Sun";
        const dayEl = document.createElement("time");
        dayEl
            .className = b("day", {weekend: isWeekend});

        dayEl.innerHTML += `
        <span class="${b("title")}">
            ${start.toLocaleString({
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric",
        })}
        </span>`;

        if (!isWeekend) {
            dayEl.innerHTML += workDay.map(this.renderHour).join("");
        }

        return dayEl;
    };

    renderHour = (hour) =>  `<div class="Hour">${hour.start.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>`

}

export default Calendar;