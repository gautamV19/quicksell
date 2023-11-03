import React from "react";

export default function Card({ ticket }) {
  return (
    <div>
      {/* {console.log("inside card", props)} */}
      <h3>Card</h3>
      <p>{ticket.id}</p>
      <p>{ticket.userId}</p>
      <p>{ticket.title}</p>
      <p>{ticket.status}</p>
      <p>{ticket.priority}</p>
      <p>{ticket.tag[0]}</p>
    </div>
  );
}
