import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="footer px-0 px-lg-3">
        <div className="container-fluid">
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
            </ul>

            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </nav>
        </div>
      </div>
    </>
  );
};
