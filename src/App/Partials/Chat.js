import React, { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import "moment-timezone";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatAnswerPreview from "./ChatAnswerPreview";
import ChatURLPreview from "./ChatURLPreview"
import { selectedChat } from "../Sidebars/Chats/Data";
import PerfectScrollbar from "react-perfect-scrollbar";
import ChatsMessageDropdown from "../Sidebars/Chats/ChatsMessageDropdown.js";
import UIfx from "uifx";
import notificationAudio from "../../assets/sound/much.mp3";
import empty from "../../assets/img/undraw_empty_xct9.svg";
import emptyOne from "../../assets/img/background_cleaker.svg";
import emptyTwo from "../../assets/img/background_cleaker_web-02.svg";
import * as FeatherIcon from "react-feather";
import ModalImage from "react-modal-image";
import VideoThumbnail from 'react-video-thumbnail';
import DeleteMessageModal from "../Modals/DeleteMessageModal";

function Chat(props) {
  const [inputMsg, setInputMsg] = useState("");

  const [newMessage, setMessages] = useState(selectedChat);

  const [messages, setChatMessages] = useState([]);

  const [countrow, setCountrow] = useState([]);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(20);

  const [firstTime, setFirstTime] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const [messageToDelete, setMessageToDelete] = useState("");

  const [mensajeTemporal, setMensajeTemporal] = useState(false);

  const [dummyNumber, setDummyNumber] = useState(0);

  const [dummyArray, setDummyArray] = useState([]);

  const [ogTitle, setogTitle] = useState("");

  const [twitterDescription, settwitterDescription] = useState("");

  const [ogImage, setogImage] = useState("");

  const [viewUrlPreview, setviewUrlPreview] = useState(true);

  const [loadHidden, setLoadHidden] = useState(true);

  const [lastIsImage, setlastIsImage] = useState(false);
  

  let dayN = 0;

  let monthN = 0;

  let yearN = 0;


  const deleteButton = useRef(null);


  const mobileMenuBtn = () => document.body.classList.toggle("navigation-open");

  const notificationSound = new UIfx(notificationAudio, {
    volume: 0.4,
    throttleMs: 100,
  });

  const {
    socket, clicked, scrollEl, setScrollEl, setOpenSearchSidebar, openSearchSidebar,
    messageRespond, setMessageRespond, viewChatAnswerPreview, setViewChatAnswerPreview,
    isResponse, setisResponse, openMessageDetail, setOpenMessageDetail, setMessageDetail,
    filePreviewChange, setFilePreviewChange
  } = props;

  useEffect(() => {
    if (scrollEl) {
      if (firstTime && messages.length > 0) {
        console.log("Bruno")
        scrollEl.scrollTop = scrollEl.scrollHeight;
        setFirstTime(false);
        if(lastIsImage)
        {
          setTimeout(function () {
            scrollEl.scrollTop = scrollEl.scrollHeight;
          }, 350);
          setlastIsImage(false)
        }
      } else if (scrolled && !firstTime) {
        var idMess = messages[8].message_id;
        let size = document.getElementById(idMess).getBoundingClientRect();
        scrollEl.scrollTop = size.top;
      }
    }
  }, [messages]);

  useEffect(() => {
    if(filePreviewChange.chat_uid){
      messages.push(filePreviewChange)
      var dummyNumberN = dummyNumber + 1
      setFirstTime(true)
      setDummyNumber(dummyNumberN)
      var dummyArrayN = dummyArray;
      dummyArrayN.push(filePreviewChange)
      setDummyArray(dummyArrayN)
      setFilePreviewChange([])
      setMensajeTemporal(!mensajeTemporal)
    }
  }, [filePreviewChange]);

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight
    }
  }, [mensajeTemporal]);

  function scrollMove(container) {
    if ((container.scrollTop) == 0 && !firstTime) {
      if (limit <= countrow) {
        var newLimit = limit + 10;
        setPage(page + 1);
        setLimit(newLimit);
        props.setLimitChat(newLimit)
        setScrolled(true);
        setLoadHidden(false)
        socket.emit("get messages", {
          id: props.clicked.chat_uid,
          page: page,
          inChat: true,
          limit: newLimit,
        });
      }
    }
  }


  function RetrieveMessages(data) {
    if (data.messages.length != 0) {
      if (props.clicked.chat_uid == data.messages[0].chat_uid) {
        var messages = [];
        data.messages.forEach((element) => {
          if (data.idSearch) {
            if (element.message_id == data.idSearch) {
              element.search = 1;
            }
          }
          if (element.delete_message_to == 1) {
            if (element.message_user_uid == props.my_uid.id) {
              messages.push(element);
            }
          } else {
            messages.push(element);
          }
        });
        if(messages[0].is_image){
          setFirstTime(true)
          setlastIsImage(true)
        }
        messages = messages.reverse()
        if (dummyArray.length > 0) {
          dummyArray.splice(0, 1)
          messages.push.apply(messages, dummyArray);
        }
        setChatMessages(messages);
        props.setChat({ id: props.clicked.chat_uid });
        setCountrow(data.count[0].countrow);
      }
    } else {
      setChatMessages([]);
      setCountrow(0);
    }
    setLoadHidden(true)
  }

  function OnChatMessage(data) {
    setFirstTime(true)
    if (props.clicked.chat_uid) {
      if (props.clicked.chat_uid == data.chat) {
        socket.emit("get messages", {
          id: data.chat,
          page: page,
          inChat: true,
          limit: limit,
        });
      } else if (props.clicked.chat_uid != data.chat) {
        notificationSound.play();
        socket.emit("get messages", {
          id: data.chat,
          page: page,
          inChat: false,
          limit: limit,
        });
      }
    } else {
      notificationSound.play();
    }
    socket.emit("get chats");
  }

  useEffect(() => {
    setPage(1);
    setLimit(20);
    props.setLimitChat(10)
    setChatMessages([]);
    setCountrow(0);
    setFirstTime(true);
    setScrolled(false);
    props.setChat_uid(props.clicked.chat_uid)
    props.setViewPreview(false)

    var chat = props.unreadChats.filter((chat) => {
      return chat.chat_uid != props.clicked.chat_uid;
    });

    props.setUnreadChats(chat);
    if (chat.length == 0) {
      props.setUnread(false);
    }

    socket.emit("get messages", {
      id: props.clicked.chat_uid,
      page: page,
      inChat: true,
      limit: limit,
    });

    socket.on("retrieve messages", RetrieveMessages);
    socket.on("chat message", OnChatMessage);
    return () => {
      socket.off("chat message", OnChatMessage);
      socket.off("retrieve messages", RetrieveMessages);
    };
  }, [props.clicked]);

  const handleSubmit = (newValue) => {
    if (newMessage.length > 0) {
      if (isResponse) {
        setFirstTime(true)
        setisResponse(false)
        setViewChatAnswerPreview(true)
        socket.emit("chat message", {
          chat: newValue.chat_uid,
          message: newValue.text,
          is_image: newValue.is_image,
          is_file: newValue.is_file,
          is_video: newValue.is_video,
          is_response: 1,
          response: newValue.response,
          response_from: newValue.response_from,
          file: newValue.file,
          responseFile: newValue.responseFile,
          response_type: newValue.response_type
        });
        socket.emit("get chats");
        socket.emit("get messages", {
          id: newValue.chat_uid,
          page: page,
          limit: limit,
        });
      } else {
        var dummy = {
          chat_type: props.clicked.chat_type,
          chat_uid: newValue.chat_uid,
          delete_message: 0,
          delete_message_to: 0,
          favorite: 0,
          favorite_to: 0,
          file: "",
          is_file: 0,
          is_image: 0,
          is_response: 0,
          is_video: 0,
          message: newValue.text,
          message_id: 0,
          message_user_uid: props.my_uid.id,
          name: "",
          pphoto: "",
          response: "",
          response_file: "",
          response_from: "",
          response_type: 0,
          time: new Date().toISOString(),
          unread_messages: 2
        }
        var dummyNumberN = dummyNumber + 1
        messages.push(dummy)
        setFirstTime(true)
        setDummyNumber(dummyNumberN)
        var dummyArrayN = dummyArray;
        dummyArrayN.push(dummy)
        setDummyArray(dummyArrayN)

        setMensajeTemporal(!mensajeTemporal)
        socket.emit("chat message", {
          chat: newValue.chat_uid,
          message: newValue.text,
          is_image: newValue.is_image,
          is_file: newValue.is_file,
          is_video: newValue.is_video,
          is_response: 0,
          ogTitle:newValue.ogTitle,
          ogDescription:newValue.twitterDescription,
          ogImage:newValue.ogImage
        });
        socket.emit("get chats");
        socket.emit("get messages", {
          id: newValue.chat_uid,
          page: page,
          limit: limit,
        });
      }
      setInputMsg("");
      setviewUrlPreview(true)
    }
  };

  const handleChange = (newValue) => {
    //setInputMsg(newValue);
    setLimit(20)
    //bruno
  };

  function ReadMore(e){
    e.target.classList.remove("word-break-more");
  }

  function timeformat(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var x = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? "0" + m : m;
    var mytime = h + ":" + m + " " + x;
    return mytime;
  }

  function getDateLabel(date) {
    let dateLabelDate =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dateLabelMonth =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let dateLabelYear = date.getFullYear();
    let dateLabel = dateLabelDate + "/" + dateLabelMonth + "/" + dateLabelYear;
    return dateLabel;
  }

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let yesterdayLabel = getDateLabel(yesterday);
  let todayLabel = getDateLabel(new Date());
  let actualLabelDate = "";
  let userID = ""

  function getTodayLabel(dateLabel, message_user_uid) {
    if (dateLabel == yesterdayLabel) {
      dateLabel = "Ayer";
    } else if (dateLabel == todayLabel) {
      dateLabel = "Hoy";
    }

    if (actualLabelDate == dateLabel) {
      if (message_user_uid != userID) {
        userID = message_user_uid
        return (
          <br />
        );
      } else {
        return "";
      }
    } else {
      actualLabelDate = dateLabel;
      userID = message_user_uid
      return (
        <div
          className="message-item messages-divider sticky-top"
          data-label={actualLabelDate}
        ></div>
      );
    }
  }

  const MessagesView = (props) => {
    const { message } = props;
    const { group } = props;
    var dateM = new Date(message.time);
    const [month, day, year] = [dateM.getMonth(), dateM.getDate(), dateM.getFullYear()];
    if (year != 0) {
      yearN = yearN < year ? year : yearN
      monthN = monthN < month ? month : monthN
      dayN = dayN < day ? day : dayN
    }
    let type;
    let timeType;
    let dropdownType;
    let fav = "";
    let search = "";
    let isUrl = false;
    if (message.favorite_to || message.favorite) {
      fav = " favorite-message";
    }
    if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(message.message)) {
      isUrl = true
    }
    if (message.search) {
      search = " found";
      setTimeout(function () {
        //let size = document.getElementById(message.message_id).getBoundingClientRect();
        scrollEl.scrollTop = 200;
        setTimeout(function () {
          document.getElementById(message.message_id).classList.remove("found");
        }, 2000);
      }, 3000);
    }
    if (message.chat_type == 1) {
      if (message.message_user_uid == props.id) {
        type = "outgoing-message";
        timeType = "time-right";
        dropdownType = false;
      } else {
        type = "";
        timeType = "time-left";
        dropdownType = true;
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
            {year != 0 ? getTodayLabel(getDateLabel(dateM), message.message_user_uid) : ""}
            <div id={message.message_id} className={"message-item padding-response " + type}>
              {message.media ? (
                message.media
              ) : (
                <div className={"message-content position-relative img-chat" + search}>
                  <div className="message-response">
                    <div className="word-break response-from">
                      {
                        group && message.message_user_uid != props.my_uid.id ?
                          <div style={{ color: props.setColor(message.message_user_uid) }}>{message.name}</div> : ""
                      }
                      <p>{message.response_from}</p>
                    </div>
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
                      <div className="word-break word-break-more" onClick={(e) => ReadMore(e)}>{message.message}</div>
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
                    <div className="action-toggle action-dropdown-chat">
                      <ChatsMessageDropdown
                        message={message}
                        prop_id={props.id}
                        my_uid={props.my_uid}
                        chat_id={props.chat_id}
                        socket={socket}
                        page={page}
                        limit={limit}
                        dropdownType={dropdownType}
                        setMessageRespond={props.setMessageRespond}
                        setViewChatAnswerPreview={props.setViewChatAnswerPreview}
                        setisResponse={props.setisResponse}
                        deleteButton={deleteButton}
                        setMessageToDelete={setMessageToDelete}
                        openMessageDetail={openMessageDetail}
                        setOpenMessageDetail={setOpenMessageDetail}
                      />
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
            {year != 0 ? getTodayLabel(getDateLabel(dateM), message.message_user_uid) : ""}
            <div id={message.message_id} className={"message-item padding-no-response " + type}>
              {message.media ? (
                message.media
              ) : (
                <div
                  className={"message-content position-relative img-chat" + search}
                >
                  {
                    (message.ogTitle!=null&&message.ogTitle!=="")?
                    <div className="message-response">
                      <div>
                        <div className="mini-preview-container mini-preview-container-url" style={{ backgroundImage: "url(" + message.ogImage + ")" }}>
                        </div>
                        <div className="word-break">{message.ogTitle}</div>
                      </div>
                    </div>
                    :""
                  }
                  {
                    !message.is_image && !message.is_file && !message.is_video ?
                      <div className="word-break word-break-more" onClick={(e) => ReadMore(e)}>
                        {
                          group && message.message_user_uid != props.my_uid.id ?
                            <div style={{ color: props.setColor(message.message_user_uid) }}>{message.name}</div> : ""
                        }
                        {isUrl?
                        <a href={message.message} target="_blank"><p class="url-message">{message.message}</p></a>
                        :<p>{message.message}</p>}
                      </div>
                      : message.is_image ?
                        <div className="img-chat-cont"> 
                          
                          {message.unread_messages == 2?
                            <div className="loader-image-chat"></div>:
                            ""
                          }
                          {message.unread_messages == 2 ?
                            <figure className="avatar img-chat" style={{filter: "blur(8px)"}}>
                              <ModalImage
                                small={message.file}
                                large={message.file}
                                alt="image"
                              />
                            </figure>
                            :
                            <figure className="avatar img-chat">
                              <ModalImage
                                small={message.file}
                                large={message.file}
                                alt="image"
                              />
                            </figure>
                          }
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
                    <div className="action-toggle action-dropdown-chat">
                      <ChatsMessageDropdown
                        message={message}
                        prop_id={props.id}
                        my_uid={props.my_uid}
                        chat_id={props.chat_id}
                        socket={socket}
                        page={page}
                        limit={limit}
                        dropdownType={dropdownType}
                        setMessageRespond={props.setMessageRespond}
                        setViewChatAnswerPreview={props.setViewChatAnswerPreview}
                        setisResponse={props.setisResponse}
                        deleteButton={deleteButton}
                        setMessageToDelete={setMessageToDelete}
                        openMessageDetail={openMessageDetail}
                        setOpenMessageDetail={setOpenMessageDetail}
                        setMessageDetail={setMessageDetail}
                      />
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

  const colorMessage = (id) => {

    var userColor = localStorage.getItem(id);
    if (userColor) {

      return userColor
    } else {

      var colors = ['#a8d069', '#30ad64', '#25ccbf', '#20ac99', '#f8c740', '#e2a62b',
      '#face6a', '#e4b962', '#fd7072', '#cf404d', '#d39f9a',
      '#735260', '#af4173', '#822e50', '#e64c40', '#bf3a30', '#fc7d64', '#49647b'];

      var randomItem = colors[Math.floor(Math.random() * colors.length)];

      localStorage.setItem(id, randomItem);

      return randomItem

    }

  }

  return clicked.chat_uid ? (
    <div className="chat" hidden={props.viewPreview}>
      <ChatHeader
        data={props.clicked}
        socket={socket}
        chat_uid={props.clicked.chat_uid}
        id={props.clicked.user_chat}
        setUser={props.setUser}
        setGroup={props.setGroup}
        setOpenUserProfile={props.setOpenUserProfile}
        openUserProfile={props.openUserProfile}
        setOpenProfile={props.setOpenProfile}
        openProfile={props.openProfile}
        openGroupProfile={props.openGroupProfile}
        setOpenGroupProfile={props.setOpenGroupProfile}
        openSearchSidebar={openSearchSidebar}
        setOpenSearchSidebar={setOpenSearchSidebar}
        setClicked={props.setClicked}
      />
      <div className="loader-chat" hidden={loadHidden}></div>
      <PerfectScrollbar
        containerRef={(ref) => setScrollEl(ref)}
        onScrollY={(container) => scrollMove(container)}
        options={{ suppressScrollX: true }}
        style={
          {
            backgroundImage: "url(" + emptyTwo + ")",
            backgroundSize: "600px"
          }
        }
      >
        <div className="chat-body">
          <div className="messages">
            {messages.map((message, i) => (
              <MessagesView
                message={message}
                key={i}
                setColor={colorMessage}
                id={props.clicked.user_chat}
                my_uid={props.my_uid}
                setUser={props.setUser}
                chat_id={props.clicked.chat_uid}
                group={props.clicked.chat_type}
                setMessageRespond={setMessageRespond}
                setViewChatAnswerPreview={setViewChatAnswerPreview}
                setisResponse={setisResponse}
              />
            ))}
          </div>
        </div>
      </PerfectScrollbar>
      <ChatAnswerPreview
        messageRespond={messageRespond}
        viewChatAnswerPreview={viewChatAnswerPreview}
        setViewChatAnswerPreview={setViewChatAnswerPreview}
        setviewUrlPreview={setviewUrlPreview}
      />
      <ChatURLPreview
        ogTitle={ogTitle}
        setogTitle={setogTitle}
        twitterDescription={twitterDescription}
        settwitterDescription={settwitterDescription}
        ogImage={ogImage}
        setogImage={setogImage}
        viewUrlPreview={viewUrlPreview}
        setviewUrlPreview={setviewUrlPreview}
      />
      <ChatFooter
        onSubmit={handleSubmit}
        onChange={handleChange}
        inputMsg={inputMsg}
        setInputMsg={setInputMsg}
        chat_uid={props.clicked.chat_uid}
        darkSwitcherTooltipOpen={props.darkSwitcherTooltipOpen}
        setImgPreview={props.setImgPreview}
        setFile={props.setFile}
        imgPreview={props.imgPreview}
        file={props.file}
        viewPreview={props.viewPreview}
        setViewPreview={props.setViewPreview}
        setImageOrFile={props.setImageOrFile}
        setFilePreview={props.setFilePreview}
        setVideoPreview={props.setVideoPreview}
        isResponse={isResponse}
        messageRespond={messageRespond}
        socket={socket}
        setogTitle={setogTitle}
        settwitterDescription={settwitterDescription}
        setogImage={setogImage}
        setviewUrlPreview={setviewUrlPreview}
        ogTitle={ogTitle}
        twitterDescription={twitterDescription}
        ogImage={ogImage}
      />
      <DeleteMessageModal
        deleteButton={deleteButton}
        socket={socket}
        messageToDelete={messageToDelete}
        my_uid={props.my_uid}
        chat_id={props.clicked.chat_uid}
        socket={socket}
        page={page}
        limit={limit}
      />
    </div>
  ) : (
    <div className="chat background-home-img">
      <div className="chat-body ">
        <div
          id="nochatselected"
          className="justify-content-center align-items-center d-flex h-100"
        >
          <div className="no-message-container custom-chat-message">
            <div className="row mb-5 chat-body-custom">
              <div className="col-12 text-center">
                <img src={empty} width="400px" className="img-logo-auto" alt="image" />
              </div>
            </div>
            <p className="lead text-center">Welcome to cleaker!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
