import { Navigation } from "./Navigation";
export const Sidebar = ({ onToggle, isActive }) => {
  return (
    <>
      <section className={`container-sidebar ${isActive ? "" : "active"}`}>
        <div className="sidebar">
          <div className="pro_info">
            <img src="/assets/img/logo.png" />
          </div>

          <Navigation onToggle={onToggle} isActive={isActive} />
          <div className="button-open" onClick={onToggle}>
            {isActive ? (
              <i className="fa-solid fa-times" />
            ) : (
              <i className="fa-solid fa-bars" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
