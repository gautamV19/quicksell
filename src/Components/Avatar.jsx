import React from "react";

export default function Avatar({ name, available }) {
  return (
    <>
      <div
        style={{
          display: "inline",
        }}
      >
        <div
          style={{
            height: "25px",
            width: "30px",
            borderRadius: "50%",
            textAlign: "center",
            paddingTop: "5px",
            color: "white",
            backgroundColor: "lightgreen",
          }}
        >
          {name.trim()[0]}
        </div>
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
    </>
  );
}
