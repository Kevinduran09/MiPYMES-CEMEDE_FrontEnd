import { Navigation } from "./Navigation";
import navigationLinks from "./NavigationLinks";
import { NavLink } from "react-router-dom";
import "../../public/css/styles.css";
import { useAuthStore } from "../components/auth/store/useAuthStore";
export const Sidebar = ({ isActive, setActive }) => {

  const { currentUser } = useAuthStore();
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
                <span className="icon">
                  <img src="/assets/img/logo.png" />
                </span>
                <span className="h2 ms-5 m-0 text-center">CEMEDE</span>
              </div>
            </a>
          </li>

          {navigationLinks.map((link, index) => {

            if (link.allowedRoles.includes(currentUser.rol)) {
              return (
                <li id={link.text} key={index} onClick={() => {
                  if (isActive) {
                    setActive();
                  }
                }}>
                  <NavLink
                    title={link.text}
                    to={link.href}
                    activeClassName="active"
                  >
                    <span className="icon">{link.iconClass}</span>
                    <span className="title">{link.text}</span>
                  </NavLink>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </>
  );
};
