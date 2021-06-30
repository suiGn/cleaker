import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as FeatherIcon from "react-feather";
import Moment from "react-moment";
import ModalImage from "react-modal-image";
import VideoThumbnail from 'react-video-thumbnail';
function MessageDetail(props) {
  const {
    openUserProfile, setOpenUserProfile, openGroupProfile, setOpenGroupProfile,
    openMedia, setOpenMedia, openMessageDetail, setOpenMessageDetail, messageDetail } = props;

  const openMessageDetailToggler = (e) => {
    setOpenMessageDetail(!openMessageDetail)
  };

  const MessagesView = (props) => {
    const { message } = props;
    const { group } = props;
    let type;
    let timeType;
    let dropdownType;
    let fav = "";
    let search = "";
    if (message.favorite_to || message.favorite) {
      fav = " favorite-message";
    }
    if (message.chat_type == 1) {
      if (message.message_user_uid == props.id) {
        type = "outgoing-message";
        timeType = "time-right";
        dropdownType = "-20px";
      } else {
        type = "";
        timeType = "time-left";
        dropdownType = "0";
      }
    } else {
      if (message.message_user_uid == props.id) {
        type = "";
        timeType = "time-left";
        dropdownType = "0";
      } else {
        type = "outgoing-message";
        timeType = "time-right";
        dropdownType = "-20px";
      }
    }
    if (message.type === "divider") {
      return (
        <div className="messages-container">
          <div
            className="message-item messages-divider sticky-top"
            data-label={message.message}
          ></div>
        </div>
      );
    }
    else {
      if (message.is_response) {
        return (
          <div className="messages-container">
            <div id={message.message_id} className={"message-item padding-response " + type}>
              {message.media ? (
                message.media
              ) : (
                <div
                  className={"message-content position-relative img-chat" + search}
                >
                  <div className="message-response">
                    <div className="word-break response-from">
                      {message.response_from}
                    </div>
                    {group && message.message_user_uid != props.my_uid ? (
                      <div className="message-avatar">
                        <div>
                          <h5>{message.name}</h5>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {
                      message.response_type == 0 ?
                        <div className="word-break response-message">{message.response}</div>
                        : message.response_type == 1 ?
                          <div>
                            <div className="word-break">{message.response}</div>
                          </div>
                          : message.response_type == 2 ?
                            <div>
                              <div className="mini-preview-container" style={{ backgroundImage: "url(" + message.response_file + ")" }}>
                              </div>
                              <div className="word-break">{message.response}</div>
                            </div>
                            : message.response_type == 3 ?
                              <div>
                                <div className="mini-preview-container-video">
                                  <VideoThumbnail
                                    videoUrl={message.response_file}
                                    thumbnailHandler={(thumbnail) => { }}
                                  />
                                </div>
                                <div className="word-break">{message.response}</div>
                              </div>
                              : ""
                    }
                  </div>
                  {
                    !message.is_image && !message.is_file && !message.is_video ?
                      <div className="word-break word-break-more">{message.message}</div>
                      : message.is_image ?
                        <div>
                          <figure className="avatar img-chat">
                            <ModalImage
                              small={message.file}
                              large={message.file}
                              alt="image"
                            />
                          </figure>
                          <div className="word-break">{message.message}</div>
                        </div>
                        : message.is_file ?
                          <div>
                            <a href={message.file} download>
                              <FeatherIcon.Download /> {"file "}
                            </a>
                            <div className="word-break">{message.message}</div>
                          </div>
                          :
                          <div>
                            <video className="video-container" controls preload="none" preload="metadata">
                              <source src={message.file} />
                            </video>
                            <div className="word-break">{message.message}</div>
                          </div>
                  }
                  <div className="misc-container">
                    <div className={"time " + timeType}>
                      {fav.length > 0 ? (
                        <div className={fav}>
                          <FeatherIcon.Star />
                        </div>
                      ) : (
                        ""
                      )}
                      <Moment format="LT">{message.time}</Moment>
                      {message.type ? (
                        <i className="ti-double-check text-info"></i>
                      ) : null}
                    </div>
                    {
                      (message.chat_type == 1) ?
                        (message.message_user_uid == props.id) ?
                          message.unread_messages == 2 ?
                            <div className="check-mark"><FeatherIcon.Check /></div> :
                            message.unread_messages == 1 ?
                              <div className="check-mark">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> :
                              <div className="check-mark check-mark-seen">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> : ""
                        :
                        (message.message_user_uid != props.id) ?
                          message.unread_messages == 2 ?
                            <div className="check-mark"><FeatherIcon.Check /></div> :
                            message.unread_messages == 1 ?
                              <div className="check-mark">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> :
                              <div className="check-mark check-mark-seen">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> : ""
                    }
                  </div>
                </div>
              )}
            </div>
          </div>);
      } else {
        return (
          <div className="messages-container">
            <div id={message.message_id} className={"message-item padding-no-response " + type}>

              {message.media ? (
                message.media
              ) : (
                <div
                  className={"message-content position-relative img-chat" + search}
                >
                  {group && message.message_user_uid != props.my_uid.id ? (
                    <div className="message-avatar">
                      <div>
                        <h5>{message.name}</h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {
                    !message.is_image && !message.is_file && !message.is_video ?
                      <div className="word-break">{message.message}</div>
                      : message.is_image ?
                        <div>
                          <figure className="avatar img-chat">
                            <ModalImage
                              small={message.file}
                              large={message.file}
                              alt="image"
                            />
                          </figure>
                          <div className="word-break">{message.message}</div>
                        </div>
                        : message.is_file ?
                          <div>
                            <a href={message.file} download>
                              <FeatherIcon.Download /> {"file "}
                            </a>
                            <div className="word-break">{message.message}</div>
                          </div>
                          :
                          <div>
                            <video className="video-container" controls preload="none">
                              <source src={message.file} />
                            </video>
                            <div className="word-break">{message.message}</div>
                          </div>
                  }
                  <div className="misc-container">
                    <div className={"time " + timeType}>
                      {fav.length > 0 ? (
                        <div className={fav}>
                          <FeatherIcon.Star />
                        </div>
                      ) : (
                        ""
                      )}
                      <Moment format="LT">{message.time}</Moment>
                      {message.type ? (
                        <i className="ti-double-check text-info"></i>
                      ) : null}
                    </div>
                    {
                      (message.chat_type == 1) ?
                        (message.message_user_uid == props.id) ?
                          message.unread_messages == 2 ?
                            <div className="check-mark"><FeatherIcon.Check /></div> :
                            message.unread_messages == 1 ?
                              <div className="check-mark">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> :
                              <div className="check-mark check-mark-seen">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> : ""
                        :
                        (message.message_user_uid != props.id) ?
                          message.unread_messages == 2 ?
                            <div className="check-mark"><FeatherIcon.Check /></div> :
                            message.unread_messages == 1 ?
                              <div className="check-mark">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> :
                              <div className="check-mark check-mark-seen">
                                <FeatherIcon.Check />
                                <div className="check-mark-double"><FeatherIcon.Check /></div>
                              </div> : ""
                    }
                  </div>
                </div>
              )}
            </div>
          </div>);
      }
    }
  };

  function getDateLabel(date) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let today = new Date();
    var dateM = new Date(date)
    //
    let dateLabelDateyesterday =
    yesterday.getDate() < 10 ? "0" + yesterday.getDate() : yesterday.getDate();
    let dateLabelMonthyesterday =
    yesterday.getMonth() + 1 < 10
        ? "0" + (yesterday.getMonth() + 1)
        : yesterday.getMonth() + 1;
    let dateLabelYearyesterday = yesterday.getFullYear();
    let dateLabelyesterday = dateLabelDateyesterday + "/" + dateLabelMonthyesterday + "/" + dateLabelYearyesterday;

    let dateLabelDatetoday =
    today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let dateLabelMonthtoday =
    today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1;
    let dateLabelYeartoday = today.getFullYear();
    let dateLabeltoday = dateLabelDatetoday + "/" + dateLabelMonthtoday + "/" + dateLabelYeartoday;

    let dateLabelDate =
    dateM.getDate() < 10 ? "0" + dateM.getDate() : dateM.getDate();
    let dateLabelMonth =
    dateM.getMonth() + 1 < 10
        ? "0" + (dateM.getMonth() + 1)
        : dateM.getMonth() + 1;
    let dateLabelYear = dateM.getFullYear();
    let dateLabel = dateLabelDate + "/" + dateLabelMonth + "/" + dateLabelYear;
    //
    if (dateLabel == dateLabelyesterday) {
      dateLabel = "Ayer";
    } else if (dateLabel == dateLabeltoday) {
      dateLabel = "Hoy";
    }
    return dateLabel;
  }

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
              <div className="messages">
                <MessagesView
                  message={messageDetail}
                  id={props.clicked.user_chat}
                  my_uid={props.my_uid}
                  setUser={props.setUser}
                  chat_id={props.clicked.chat_uid}
                  group={props.clicked.chat_type}
                />
              </div>
              <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-item-mdetalle">
                      <div>Leido</div>
                      <div>{messageDetail.time_read?getDateLabel(messageDetail.time_read):"-"} {messageDetail.time_read?<Moment format="LT">{messageDetail.time_read}</Moment>:""}</div>
                    </li>
                    <li className="list-group-item list-item-mdetalle">
                      <div>Entregado</div>
                      <div>{getDateLabel(messageDetail.time)} <Moment format="LT">{messageDetail.time}</Moment></div>
                    </li>
                </ul>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;
