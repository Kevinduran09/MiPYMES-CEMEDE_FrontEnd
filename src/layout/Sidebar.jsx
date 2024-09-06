import { Navigation } from "./Navigation";
export const Sidebar = ({ onToggle, isActive = true }) => {
  return (
    <>
      <section className={`container-sidebar ${isActive ? "" : "active"}`}>
        <div className="sidebar">
          <div className="pro_info">
            <img src="/assets/img/logo.png" />
          </div>

          <Navigation onToggle={onToggle} isActive={isActive} />
          
        </div>
      </section>
    </>
  );
};
