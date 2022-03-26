import React, { useState, useRef, useEffect } from "react";
import {
  TabContent, TabPane, Nav, NavItem, NavLink, CardImg, Row, Col
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import * as FeatherIcon from "react-feather";
import ImagePreview from "../Modals/ImagePreview"

function Fav(props) {
  const {fav,openFav,setOpenFav,setOpenUserProfile,openUserProfile,setOpenGroupProfile,openGroupProfile,
    favProfileType,setFavProfileType} = props;

  const openFavToggler = (e) => {
    setFavProfileType(0)
    setOpenFav(!openFav)
    if (favProfileType == 1) {
      setOpenUserProfile(!openUserProfile);
    }
    if (favProfileType == 2) {
      setOpenGroupProfile(!openGroupProfile)
    }
  };

  return (
    <div className={`sidebar-group ${openFav ? "mobile-open" : ""} sidebar-media`}>
         <div className={openFav ? "sidebar active" : "sidebar"}>
            <header>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a
                        href="#/"
                        onClick={(e) => openFavToggler(e)}
                        className="btn btn-outline-light sidebar-close"
                        >
                        <FeatherIcon.ArrowLeft />
                        </a>
                    </li>
                </ul>
            </header>
        </div>
    </div>
  );
}

export default Fav;
