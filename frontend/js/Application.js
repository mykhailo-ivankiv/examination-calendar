import React, {Component} from 'react'
import Calendar from "./Calendar"
import User from "./User";
import '../css/Application.css'

import block from './BEM'

const b = block('Application');

class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <section className="Application">
                <h2>Розклад іспиту з Курсу веб-розробки</h2>
                {/*<User/>*/}
                <Calendar/>
            </section>
        )
    }
}

export default Application