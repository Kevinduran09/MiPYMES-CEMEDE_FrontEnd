import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "2rem" }}>
      <Link
        underline="hover"
        color="inherit"
        component={RouterLink}
        to="/"
      >
        Inicio
      </Link>
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography color="textPrimary" key={value} style={{ fontWeight: 'bold' }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={routeTo}
            key={value}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export const DashboardLayout = ({ title, component }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "0.1rem"
      }}
    >

      <DynamicBreadcrumbs />

      {/* Header 
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
      </div>*/}
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
