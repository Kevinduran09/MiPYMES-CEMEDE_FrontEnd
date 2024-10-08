import { Navigation } from "./Navigation";
import navigationLinks from "./NavigationLinks";
import { NavLink } from "react-router-dom";
import "../../public/css/styles.css";
export const Sidebar = ({ isActive }) => {
  return (
    <>
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <span class="icon">
                  <img src="/assets/img/logo.png" />
                </span>
                <span className="h2 ms-5 m-0 text-center">CEMEDE</span>
              </div>
            </a>
          </li>

          {navigationLinks.map((link, index) => (
            <li id={link.text} key={index}>
              <NavLink
                title={link.text}
                to={link.href}
                activeClassName="active"
              >
                <span className="icon">{link.iconClass}</span>
                <span className="title">{link.text}</span>
              </NavLink>
            </li>
          ))}

          {/* <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span class="title">Sign Out</span>
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
};
