import React, { useEffect, useState } from "react";
import { priority_arr, status_arr } from "./constants";

import Card from "./Card";
import Avatar from "./Avatar";
const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];

export default function Board() {
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("Status");
  const [order, setOrder] = useState("Priority");

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
            borderRadius: "5px",
            cursor: "pointer",
            height: "30px",
            width: "100px",
            fontSize: "15px",
            border: "0.5px solid #acacac",
            boxShadow: "0px 0.5px 1px 0.5px rgba(200,200,200,1.5)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setClick((prev) => !prev);
          }}
        >
          ≡ Display
        </button>
      </div>
      {click && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: "absolute",
            backgroundColor: "#f4f5f8",
            // border: "1px solid #acacac",
            boxShadow: "0px 0.5px 1px 0.5px rgba(200,200,200,1.5)",
            borderRadius: "5px",
            width: "200px",
            top: "5vh",
            left: "10px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9c9c9c", fontSize: "12px" }}>Grouping</span>
            <select
              value={display}
              style={{
                border: "1px solid #acacac",
                borderRadius: "5px",
                width: "100px",
                padding: "2px",
              }}
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
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9c9c9c", fontSize: "12px" }}>Ordering</span>
            <select
              value={order}
              style={{
                border: "1px solid #acacac",
                borderRadius: "5px",
                width: "100px",
                padding: "2px",
              }}
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
          marginTop: "10px",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  {display === "User" ? (
                    <>
                      <Avatar
                        name={_users[key].name}
                        available={_users[key].available}
                      />
                      <span>{_users[key].name} </span>
                      <span
                        style={{
                          color: "grey",
                          fontSize: "14px",
                        }}
                      >
                        {columns[key].length}
                      </span>
                    </>
                  ) : display === "Status" ? (
                    <>
                      <img
                        src={status_arr[key]}
                        height={"18px"}
                        width={"18px"}
                        alt={key}
                      />
                      <span>{key} </span>
                      <span
                        style={{
                          color: "grey",
                          fontSize: "14px",
                        }}
                      >
                        {columns[key].length}
                      </span>
                    </>
                  ) : display === "Priority" ? (
                    <>
                      <img
                        src={priority_arr[key]}
                        height={"18px"}
                        width={"18px"}
                        alt={key}
                      />
                      <span>{priorities[key]} </span>
                      <span
                        style={{
                          color: "grey",
                          fontSize: "14px",
                        }}
                      >
                        {columns[key].length}
                      </span>
                    </>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: "10px",
                    gap: "10px",
                    color: "grey",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    +
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    …
                  </span>
                </div>
              </div>
              <div>
                {columns[key].map((t, key) => {
                  return <Card ticket={t} users={_users} grouping={display} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
