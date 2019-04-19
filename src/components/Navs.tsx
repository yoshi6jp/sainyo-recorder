import React, { useContext } from "react";
import { RootContext } from "./Provider";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faChartBar,
  faBraille
} from "@fortawesome/free-solid-svg-icons";
export const Navs = () => {
  const {
    state: { isNavsDisplayed }
  } = useContext(RootContext);
  if (isNavsDisplayed) {
    return (
      <div className="fixed-bottom">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact={true}>
              <FaIcon icon={faList} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/chart" className="nav-link">
              <FaIcon icon={faChartBar} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/heatmap" className="nav-link">
              <FaIcon icon={faBraille} />
            </NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};
