import React, { useState } from "react";
import Avatar from "react-avatar";
import { useEffect } from "react";

import Available from "./Available";

import no_priority from "../assets/icons/no_priority.png";
import low from "../assets/icons/low.png";
import medium from "../assets/icons/medium.png";
import high from "../assets/icons/high.png";
import urgent from "../assets/icons/urgent.png";

export default function Card({ ticket, users }) {
  const [name, setName] = useState("");
  const [available, setAvailable] = useState(false);
  const [priority, setpriority] = useState(0);

  const arr = [no_priority, low, medium, high, urgent];

  useEffect(() => {
    users.forEach((u) => {
      if (u.id == ticket.userId) {
        setName(u.name);
        setAvailable(u.available);
      }
    });

    setpriority(arr[ticket.priority]);
  }, []);

  const ticketIdStyle = {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        margin: "2px",
        padding: "5px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={ticketIdStyle}>{ticket.id}</p>
        <div>
          <Avatar name={name} size="40" round="20px" />
          <Available flag={available} />
        </div>
      </div>
      <h2>{ticket.title}</h2>
      {/* <p>{ticket.status}</p> */}
      <div
        style={{ display: "flex", justifyContent: "space-start", gap: "10px" }}
      >
        <img src={priority} alt={ticket.priority} />
        <p>{ticket.tag[0]}</p>
      </div>
    </div>
  );
}
