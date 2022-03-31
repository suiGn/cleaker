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
    favProfileType,setFavProfileType, my_uid, favMedia, setFavMedia} = props;

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
            <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Favorite Messages</span>
            </h6>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <div>
                        <ul className="list-group list-group-flush">
                        {fav.map((message, i) => (
                            message.is_file?
                            "":
                            message.is_image?
                            <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                                <div class="messages-container">
                                <div id={message.message_id} className={"message-item"}>
                                    <div className="message-avatar">
                                    <div>
                                    <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                                    </div>
                                    </div>
                                    <div class="message-content position-relative img-chat">
                                        <div>
                                            <figure className="avatar img-chat">
                                                <ImagePreview file={message.file} images={favMedia} position={message.position} name={""}/>
                                            </figure>
                                            <div className="word-break">{message.message}</div>
                                        </div>
                                    </div>
                                    </div>
                                </div> 
                            </li>:
                            message.is_video?
                            <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                                <div class="messages-container">
                                <div id={message.message_id} className={"message-item"}>
                                    <div className="message-avatar">
                                    <div>
                                        <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                                    </div>
                                    </div>
                                    <div class="message-content position-relative img-chat">
                                    <div>
                                        <video className="video-container" controls>
                                            <source src={message.file} />
                                        </video>
                                        <div className="word-break">{message.message}</div>
                                    </div>
                                    </div>
                                </div>
                                </div> 
                            </li>:
                            message.ogDescription!=""?
                            <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                                <div className="messages-container">
                                    <div className={"message-item padding-no-response " }>
                                    <div className={"message-content position-relative message-content-media"}>
                                        <div className="message-response">
                                        <div>
                                            <div className="mini-preview-container mini-preview-container-url" style={{ backgroundImage: "url(" + message.ogImage + ")" }}>
                                            </div>
                                            <div className="word-break">{message.ogTitle}</div>
                                        </div>
                                        </div>
                                        <div className="word-break ">
                                        <a href={message.message} target="_blank"><p class="url-message">{message.message}</p></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                                <div class="messages-container">
                                <div id={message.message_id} className={"message-item"}>
                                <div className="message-avatar">
                                    <div>
                                    <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                                    </div>
                                </div>
                                    <div class="message-content position-relative img-chat">
                                    <div className="word-break">{message.message}</div>
                                    </div>
                                </div>
                                </div>
                            </li>
                            
                            ))
                        }
                        </ul>
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    </div>
  );
}

export default Fav;
