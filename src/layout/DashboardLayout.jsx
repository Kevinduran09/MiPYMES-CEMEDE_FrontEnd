import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink, Outlet } from "react-router-dom";
import { checkIsApplying } from "./CheckCuestionarioApplying";

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const { check } = checkIsApplying();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const disableNavRoutes = ["editar", "asignar", "aplicados", "organizacion", "aplicar"];
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "2rem" }}>
      <Link underline="hover" color="inherit" component={RouterLink} onClick={check} to="/">
        Inicio
      </Link>
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;
        if (disableNavRoutes.includes(value) && !isLast) {
          return (
            <Typography
              color="inherit"
              key={value}
              style={{ fontWeight: "inherit" }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          );
        }
        return isLast ? (
          <Typography
            color="textPrimary"
            key={value}
            style={{ fontWeight: "bold" }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            onClick={check}
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

export const DashboardLayout = ({ title }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "0.1rem",
      }}
    >
      <DynamicBreadcrumbs />

      <div
        style={{
          backgroundColor: "white",
          minWidth: "80%",
          borderRadius: "15px",
          margin: "25px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
