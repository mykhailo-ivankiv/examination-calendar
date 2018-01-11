import React, {Component} from 'react'
import Calendar from "./Calendar"
import User from "./User";
import '../css/Application.css'

import block from './BEM'
import api from "./api";

const b = block('Application');

class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
    }

    editCalendar = () => {
        this.setState({
            edit: true,
            schedule: null
        })
    }

    saveCalendar = () =>  {
        const {schedule} = this.state;
        if (schedule) {
            api.setSchedule (schedule);
        }
        this.setState ({edit: false})
    }

    onScheduleChange = (schedule) => {
        this.setState({schedule})
    }

    render() {
        const {edit} = this.state;
        return (
            <section className="Application">
                <h2>Розклад іспиту з Курсу веб-розробки</h2>
                <User
                    onEdit = { this.editCalendar }
                    onSave = { this.saveCalendar }
                />
                <Calendar
                    edit={edit}
                    onScheduleChange = {this.onScheduleChange}
                />
            </section>
        )
    }
}

export default Application