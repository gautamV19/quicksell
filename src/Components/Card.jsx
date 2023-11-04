import React from "react";

import no_priority from "../assets/icons/no_priority.png";
import low from "../assets/icons/low.png";
import medium from "../assets/icons/medium.png";
import high from "../assets/icons/high.png";
import urgent from "../assets/icons/urgent.png";

import backlog from "../assets/icons/backlog.png";
import in_progress from "../assets/icons/in_progress.png";
import todo from "../assets/icons/todo.png";
import done from "../assets/icons/done.png";
import canceled from "../assets/icons/canceled.png";
export default function Card({ ticket, users }) {
  const priority_arr = [no_priority, low, medium, high, urgent];
  const status_arr = {
    Backlog: backlog,
    "In progress": in_progress,
    Todo: todo,
    Done: done,
    Canceled: canceled,
  };

  const name = users[ticket.userId].name;
  const available = users[ticket.userId].available;
  const priority = priority_arr[ticket.priority];
  const status = status_arr[ticket.status];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #acacac",
        margin: "10px 2px",
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "16px",
            color: "#9c9c9c",
          }}
        >
          {ticket.id}
        </span>
        <div>
          <div
            style={{
              height: "25px",
              width: "30px",
              borderRadius: "50%",
              textAlign: "center",
              paddingTop: "5px",
              color: "white",
              backgroundColor: `rgb(${Math.random() * 255},${
                Math.random() * 255
              },${Math.random() * 255})`,
            }}
          >
            {name.trim()[0]}
          </div>
          {/* <Available flag={available} /> */}
          <div
            style={{
              marginTop: "-18px",
              color: `${available ? "green" : "grey"}`,
              textAlign: "right",
              fontSize: "20px",
            }}
          >
            &#9679;
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-start", gap: "10px" }}
      >
        <img src={status} height={"18px"} width={"18px"} alt={ticket.status} />
        <span
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#3c3c3c",
          }}
        >
          {ticket.title}
        </span>
      </div>

      {/* <p>{ticket.status}</p> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-start",
          gap: "10px",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <img
          src={priority}
          height={"18px"}
          width={"18px"}
          alt={ticket.priority}
        />
        {ticket.tag.map((t) => {
          return (
            <span
              style={{
                border: "1px solid #acacac",
                borderRadius: "5px",
                padding: "0 5px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#acacac",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                &#9679;
              </span>{" "}
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
