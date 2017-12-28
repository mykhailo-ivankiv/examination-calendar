import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar";
import User from "./User"

// new Calendar(document.querySelector("#calendar"));

// ReactDOM.render(
//     <User name="Taylor" />,
//     document.querySelector("#user")
// );

ReactDOM.render(
    <Calendar />,
    document.querySelector("#calendar")
);