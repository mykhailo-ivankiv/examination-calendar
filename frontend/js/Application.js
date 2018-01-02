import React, {Component} from 'react'
import Calendar from "./Calendar"
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
            <section class="Application">
                <h2>Розклад іспиту з Курсу веб-розробки</h2>
                <Calendar/>
            </section>
        )
    }
}

export default Application