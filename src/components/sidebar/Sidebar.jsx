import { useLocation, NavLink } from "react-router-dom";
import reactlogo from "../../assets/img/reactlogo.png";
export const Sidebar = ({ routes }) => {
<<<<<<< HEAD
=======
  console.log(routes);
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname == routeName ? "active" : "";
  };

  return (
    <div className="sidebar" data-color="black">
      <div className="sidebar-background"></div>
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={reactlogo} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="/">
            Dashboard
          </a>
        </div>
        <ul className="nav">
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              return (
                <li className={activeRoute(prop.layout + prop.path)} key={key}>
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
<<<<<<< HEAD
                    {prop.icon}
                    <p className="ms-3">{prop.name}</p>
=======
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};
