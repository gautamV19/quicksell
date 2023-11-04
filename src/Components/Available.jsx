import React, { useEffect, useState } from "react";

export default function Available({ flag }) {
  const [color, setColor] = useState("grey");

  useEffect(() => {
    if (flag == true) {
      setColor("green");
    }
  }, []);

  return (
    <div
      style={{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        backgroundColor: `${color}`,
      }}
    ></div>
  );
}
