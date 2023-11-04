import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Board() {
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTicket(data.tickets);
        setUsers(data.users);
        console.log(users);
      });
  }, []);

  return (
    <div>
      <h1>Board</h1>
      {ticket.map((t, i) => {
        return <Card ticket={t} key={i} users={users} />;
      })}
    </div>
  );
}
