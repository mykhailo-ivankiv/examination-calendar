import React, { Component } from "react";
import { DateTime } from "luxon";
import Select from "react-select";

import "react-select/dist/react-select.min.css";
import "../css/Hour.css";
import block from "./BEM";

const b = block("Hour");

class Hour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.getStudent(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: this.getStudent(nextProps)
    });
  }

  getStudent(props) {
    const { hour, schedule, students } = props;
    const reservation = schedule.find(({ time }) => time.equals(hour));
    return reservation &&
      reservation.studentId && {
        value: students[reservation.studentId].id,
        label: students[reservation.studentId].name
      };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(selectedOption);
  };

  render() {
    const { hour, schedule, students } = this.props;
    const reservation = schedule.find(({ time }) => time.equals(hour));
    const { selectedOption } = this.state;

    return (
      <div className={b({ reserved: reservation })}>
        <span className={b("time")}>
          {hour.start.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>

        <Select
          multi={false}
          placeholder=""
          value={selectedOption}
          onChange={this.handleChange}
          options={students.map(({ id, name }) => ({ value: id, label: name }))}
        />
      </div>
    );
  }
}

export default Hour;
