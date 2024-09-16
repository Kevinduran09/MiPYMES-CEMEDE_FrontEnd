import React from "react";
export const DashboardLayout = ({ title, component }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "max-content",
        backgroundColor: "#E6E8E6",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          display: "flex",
          margin: "25px",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        <h2>{title}</h2>
      </div>
      <div
        style={{
          backgroundColor: "white",
          minWidth: "80%",
          height: "max-content",
          borderRadius: "15px",
          margin: "25px",
        }}
      >
        {component}
      </div>
    </div>
  );
};
