import React from "react";

export default function Title({ title, fontsize, margin }) {
  return (
    <h1 style={{ fontSize: fontsize, margin, color: "#616161" }}>{title}</h1>
  );
}
