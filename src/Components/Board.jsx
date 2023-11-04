import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";

import Card from "./Card";

export default function Board() {
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("Status");
  const [order, setOrder] = useState("Priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTicket(data.tickets);
        setUsers(data.users);
        console.log(users);
      });
  }, []);

  const displayOptions = ["Status", "Priority", "User"];
  const orderOptions = ["Priority", "Title"];

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid black",
          margin: "5px",
          height: "5vh",
          position: "sticky",
        }}
      >
        <Popup trigger={<button> Display </button>} position="right center">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "15px",
            }}
          >
            <div>Grouping</div>
            <Dropdown
              options={displayOptions}
              onChange={(e) => setDisplay(e.value)}
              value={display}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "15px",
            }}
          >
            <div>Ordering</div>
            <Dropdown
              options={orderOptions}
              onChange={(e) => setOrder(e.value)}
              value={order}
            />
          </div>
        </Popup>
      </div>
      {ticket.map((t, i) => {
        return <Card ticket={t} key={i} users={users} />;
      })}
    </div>
  );
}
