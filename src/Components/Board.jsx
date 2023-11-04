import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";

import Card from "./Card";

export default function Board() {
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("");
  const [order, setOrder] = useState("");

  const columns = ticket.reduce((acc, t) => {
    const groupByKey =
      display === "Status"
        ? "status"
        : display === "Priority"
        ? "priority"
        : "userId";

    const groupByValue = t[groupByKey];
    acc[groupByValue] = acc[groupByValue] || [];
    acc[groupByValue].push(t);

    return acc;
  }, {});

  Object.keys(columns).forEach((key) => {
    columns[key] = columns[key].sort((a, b) => {
      if (order === "Priority") {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  });

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTicket(data.tickets);
        setUsers(data.users);
      });

    setDisplay("Status");
    setOrder("Priority");
  }, []);

  const _users = users.reduce((acc, u) => {
    acc[u.id] = { name: u.name, available: u.available };
    return acc;
  }, {});

  const displayOptions = ["Status", "Priority", "User"];
  const orderOptions = ["Priority", "Title"];

  const [click, setClick] = useState(false);

  return (
    <div
      onClick={() => {
        setClick(false);
      }}
    >
      <div
        style={{
          height: "60px",
          position: "sticky",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid #acacac",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setClick((prev) => !prev);
          }}
        >
          ≡ Display 🔽{" "}
        </button>
      </div>
      {click && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #acacac",
            borderRadius: "5px",
            width: "250px",
            top: "4.5vh",
            left: "10px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Grouping</span>
            <select
              onChange={(e) => {
                setDisplay(e.target.value);
              }}
            >
              {displayOptions.map((option) => {
                return <option>{option}</option>;
              })}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Ordering</span>
            <select
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              {orderOptions.map((option) => {
                return <option>{option}</option>;
              })}
            </select>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(columns).map((key) => {
          return (
            <div
              style={{
                display: "inline-block",
                width: `${
                  (90 + Object.keys(columns).length * 1.5) /
                  Object.keys(columns).length
                }%`,
              }}
            >
              <div>{key}</div>
              <div>
                {columns[key].map((t, key) => {
                  return <Card ticket={t} users={_users} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
