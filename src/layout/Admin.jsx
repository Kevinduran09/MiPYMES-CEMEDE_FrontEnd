import React, { useRef, useEffect } from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useLocation, Routes as RouterRoutes, Route } from "react-router-dom";
import { dashboardRoutes } from "../views/Routes";

export const Admin = () => {
  const mainPanel = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar routes={dashboardRoutes} />
        <div className="main-panel" ref={mainPanel}>
          <Navbar />
          <div className="content">
            <RouterRoutes>
              {dashboardRoutes.map((props, key) => (
                <Route path={props.path} element={props.component} key={key} />
              ))}
            </RouterRoutes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
