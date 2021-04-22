import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as FeatherIcon from "react-feather";
import { Tooltip } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddGroupModal from "../../Modals/AddGroupModal";
import ChatsDropdown from "./ChatsDropdown";
import { sidebarAction } from "../../../Store/Actions/sidebarAction";
// import {chatLists} from "./Data";
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
const ENDPOINT = "http://localhost:5000/";

function Index(props) {
  const {
    socket,
    setOpenSearchSidebar,
    setOpenProfile,
    openProfile,
    setOpenUserProfile,
    openUserProfile,
    openGroupProfile,
    setOpenGroupProfile,
    setClicked,
    setLoaded,
  } = props;
  const [chatLists, setChatList] = useState([]);
  const [chatsL, setChatL] = useState([]);
  const [favoriteFriendFiltered, setfavoriteFriendFiltered] = useState([]);
  const [searchFavorite, setSearchFavorite] = useState("");
  const [one, setIOne] = useState("");

  function RetrieveChats(data) {
    var chats = data.chats.filter((chats) => {
      return chats.chat_type == 0;
    });
    var grupos = data.chats.filter((grupos) => {
      return grupos.chat_type == 1 && grupos.user_chat == data.my_uid;
    });
    grupos.forEach((info) => {
      info.name = info.chat_name;
    });
    chats.push.apply(chats, grupos);
    setChatList(data);
    setChatL(chats);
    setfavoriteFriendFiltered(chats);
    var chatsUnread = data.chats.filter((chats) => {
      return (
        chats.unread_messages == 1 &&
        chats.last_message_user_uid != data.my_uid &&
        chats.user_chat != data.my_uid
      );
    });
    if (chatsUnread.length > 0) {
      props.setUnread(true);
      props.setUnreadChats(chatsUnread);
    }
    setLoaded(true);
  }

  useEffect(() => {
    socket.on("retrieve chats", RetrieveChats);
    return () => {
      socket.off("retrieve chats", RetrieveChats);
    };
  }, one);

  useEffect(() => {
    socket.emit("get chats");
    // inputRef.current.focus();
  }, [one]);

  const dispatch = useDispatch();

  const inputRef = useRef();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

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
  let my_uid = chatLists.my_uid;

  function setClickedValue(e, chat) {
    e.preventDefault();
    chat.unread_messages = 0;
    setClicked(chat);
    mobileSidebarClose();
    setOpenSearchSidebar(false);
    socket.off("retrieve messages");
  }

  const ChatListView = (props) => {
    const { chat } = props;
    let chat_initial;
    let chat_name;
    let p;
    let chat_with_usr = chat.user_chat;
    if (chat.chat_type == 1 || my_uid != chat.user_chat) {
      chat_name = chat.name;
      if (chat.chat_type == 1) {
        chat.pphoto = chat.groupphoto;
      }
      chat_initial = chat_name.substring(0, 1);
      let timeMessage = new Date(chat.last_message_time);
      let timeLabel;
      let today = new Date();
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (
        timeMessage.getDate() == today.getDate() &&
        timeMessage.getMonth() == today.getMonth() &&
        timeMessage.getFullYear() == today.getFullYear()
      ) {
        timeLabel = timeformat(timeMessage);
      } else if (
        timeMessage.getDate() == yesterday.getDate() &&
        timeMessage.getMonth() == yesterday.getMonth() &&
        timeMessage.getFullYear() == yesterday.getFullYear()
      ) {
        timeLabel = "Yesterday";
      } else {
        timeLabel = getDateLabel(timeMessage);
      }
      if (chat.pphoto === "" || chat.pphoto === null) {
        p = (
          <span className="avatar-title bg-info rounded-circle">
            {chat_initial}
          </span>
        );
      } else {
        p = <img src={chat.pphoto} className="rounded-circle" alt="image" />;
      }
      return (
        <li
          className={
            chat.unread_messages && chat.last_message_user_uid != my_uid
              ? "list-group-item open-chat"
              : "list-group-item " + (chat.selected ? "open-chat" : "")
          }
          onClick={(e) => setClickedValue(e, chat)}
        >
          <div>
            <figure className="avatar">{p}</figure>
          </div>
          <div className="users-list-body">
            <div i={chat.chat_uid}>
              <h5
                className={
                  chat.unread_messages && chat.last_message_user_uid != my_uid
                    ? "text-primary"
                    : ""
                }
                i={chat.chat_uid}
              >
                {chat.name}
              </h5>
              {(chat.deleted_message || chat.deleted_message_to)
                ? "no messages"
                : chat.is_file
                ? "file"
                : chat.is_image
                ? "picture"
                : chat.is_video
                ? "video"
                : chat.last_message_message?
                chat.last_message_message:"no messages"}
            </div>
            {(chat.unread_messages && chat.last_message_user_uid != my_uid) >
            0 ? (
              <div className="users-list-action">
                <div className="new-message-count">{chat.unread_messages}</div>
                <small
                  className={
                    chat.unread_messages ? "text-primary" : "text-muted"
                  }
                  className="text-muted"
                >
                  {timeLabel}
                </small>
                <div className="action-toggle">
                  <ChatsDropdown
                    setGroup={props.setGroup}
                    setUser={props.setUser}
                    id={chat.user_chat}
                    socket={socket}
                    chat_uid={chat.chat_uid}
                    chat_type={chat.chat_type}
                    setClicked={setClicked}
                    setOpenProfile={setOpenProfile}
                    openProfile={openProfile}
                    openUserProfile={openUserProfile}
                    setOpenUserProfile={setOpenUserProfile}
                    openGroupProfile={openGroupProfile}
                    setOpenGroupProfile={setOpenGroupProfile}
                  />
                </div>
              </div>
            ) : (
              <div className="users-list-action">
                <small className="text-muted">{timeLabel}</small>
                <div className="action-toggle">
                  <ChatsDropdown
                    setGroup={props.setGroup}
                    setUser={props.setUser}
                    id={chat.user_chat}
                    socket={socket}
                    chat_uid={chat.chat_uid}
                    chat_type={chat.chat_type}
                    setClicked={setClicked}
                    setOpenProfile={setOpenProfile}
                    openProfile={openProfile}
                    openUserProfile={openUserProfile}
                    setOpenUserProfile={setOpenUserProfile}
                    openGroupProfile={openGroupProfile}
                    setOpenGroupProfile={setOpenGroupProfile}
                  />
                </div>
              </div>
            )}
          </div>
        </li>
      );
    }
    return "";
  };

  function searchChat(wordToSearch) {
    setSearchFavorite(wordToSearch);
    var resultFavorits = chatsL.filter((val) => {
      return val.name.toLowerCase().includes(wordToSearch.toLowerCase());
    });
    setfavoriteFriendFiltered(resultFavorits);
  }

  return (
    <div className="sidebar active">
      <header>
        <span>Chats</span>
        <ul className="list-inline">
          <li className="list-inline-item">
            <AddGroupModal socket={socket} chatLists={chatLists} />
          </li>
          {/*<li className="list-inline-item">
            <button
              onClick={() => dispatch(sidebarAction("Friends"))}
              className="btn btn-outline-light"
              id="Tooltip-New-Chat"
            >
              <FeatherIcon.PlusCircle />
            </button>
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              target={"Tooltip-New-Chat"}
              toggle={toggle}
            >
              New chat
            </Tooltip>
          </li>*/}
          <li className="list-inline-item d-xl-none d-inline">
            <button
              onClick={mobileSidebarClose}
              className="btn btn-outline-light text-danger sidebar-close"
            >
              <FeatherIcon.X />
            </button>
          </li>
        </ul>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search chats"
          ref={inputRef}
          value={searchFavorite}
          onChange={(e) => searchChat(e.target.value)}
        />
      </form>
      <div className="sidebar-body">
        <PerfectScrollbar>
          <ul className="list-group list-group-flush">
            {chatLists.chats &&
              favoriteFriendFiltered.map((chat, i) => (
                <ChatListView
                  chat={chat}
                  key={i}
                  setClicked={setClicked}
                  setUser={props.setUser}
                  setGroup={props.setGroup}
                />
              ))}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
export default Index;
