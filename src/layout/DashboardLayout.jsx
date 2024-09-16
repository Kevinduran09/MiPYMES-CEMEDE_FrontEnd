import React from "react";
export const DashboardLayout = ({ title, component }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "0.1rem"
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
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)", // Sombra más oscura
        }}
      >
        <h2>{title}</h2>
      </div>
      <div
        style={{
          backgroundColor: "white",
          minWidth: "80%",
          borderRadius: "15px",
          margin: "25px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)", // Sombra más oscura
        }}
      >
        {component}
      </div>

    </div>
  );
};
