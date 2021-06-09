import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as FeatherIcon from "react-feather";
function MessageDetail(props) {
  const {
    openUserProfile, setOpenUserProfile, openGroupProfile, setOpenGroupProfile,
    openMedia, setOpenMedia, openMessageDetail, setOpenMessageDetail, messageDetail } = props;

  const openMessageDetailToggler = (e) => {
    setOpenMessageDetail(!openMessageDetail)
  };


  useEffect(() => {
  }, [messageDetail]);

  return (
    <div className={`sidebar-group ${openMessageDetail ? "mobile-open" : ""} sidebar-media`}>
      <div className={openMessageDetail ? "sidebar active" : "sidebar"}>
        <header>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="#/"
                onClick={(e) => openMessageDetailToggler(e)}
                className="btn btn-outline-light sidebar-close"
              >
                <FeatherIcon.ArrowLeft />
              </a>
            </li>
          </ul>
        </header>
        <div className="sidebar-body">
          <PerfectScrollbar>
            <div className="pl-4 pr-4">
            <div class="messages-container">
                    <div id={messageDetail.message_id} className={"message-item"}>
                    <div className="message-avatar">
                      <div>
                        <h5>{messageDetail.name}</h5>
                      </div>
                    </div>
                      <div class="message-content position-relative img-chat">
                        <div className="word-break">{messageDetail.message}</div>
                      </div>
                    </div>
                  </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;
