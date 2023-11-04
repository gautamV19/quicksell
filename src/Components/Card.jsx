import React from "react";

import Avatar from "./Avatar";
import { priority_arr, status_arr } from "./constants";
export default function Card({ ticket, users, grouping }) {
  const name = users[ticket.userId].name;
  const available = users[ticket.userId].available;
  const priority = priority_arr[ticket.priority];
  const status = status_arr[ticket.status];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px 2px",
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 0px 1px 0px rgba(100,100,100,0.75)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "16px",
            color: "#9c9c9c",
            marginBottom: "10px",
          }}
        >
          {ticket.id}
        </span>
        {grouping === "User" ? null : (
          <Avatar name={name} available={available} />
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-start", gap: "10px" }}
      >
        {grouping === "Status" ? null : (
          <img
            src={status}
            height={"18px"}
            width={"18px"}
            alt={ticket.status}
          />
        )}
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
        {grouping === "Priority" ? null : (
          <img
            src={priority}
            height={"18px"}
            width={"18px"}
            alt={ticket.priority}
          />
        )}
        {ticket.tag.map((t) => {
          return (
            <div
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
                  fontSize: "23px",
                  fontWeight: "600",
                }}
              >
                &#9679;
              </span>
              <span>{t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
