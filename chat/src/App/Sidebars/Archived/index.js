import React, { useEffect, useRef, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import ArchivedDropdown from "./ArchivedDropdown";
import { useDispatch } from "react-redux";
// import {archivedChats} from "./Data"
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
import * as FeatherIcon from "react-feather";

function Index(props) {
  const { socket ,setOpenProfile ,openProfile ,setOpenUserProfile , setOpenSearchSidebar,
  openUserProfile , setOpenGroupProfile , openGroupProfile, setClicked, my_uid  } = props;
  const [archivedChats, setArchivedChats] = useState([]);
  const [favoritearchivedChatsFiltered, setArchivedChatsFiltered] = useState([]);
  const [searchArchivedChats, setSearchArchivedChats] = useState("");
  const [one, setIOne] = useState("");
  const [archivedL, setArchivedL] = useState([]);
  

  function RetrieveChatsArchived(data) {
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
    chats.forEach((info) => {
      if(!info.last_message_time){
        info.last_message_time =  "0001-01-01T00:54:31.000Z";
      }
    });
    chats.sort(function(a,b) {
      return Date.parse(b.last_message_time) - Date.parse(a.last_message_time)
    });
    setArchivedChats(data);
    setArchivedL(chats);
    setArchivedChatsFiltered(chats);
  }

  useEffect(() => {
    // inputRef.current.focus();
    socket.on("retrieve chats archived", RetrieveChatsArchived);
    return () => {
      socket.off("retrieve chats archived", RetrieveChatsArchived);
    };
  });
  useEffect(() => {
    socket.emit("get chats archived");
  }, [one]);

  const dispatch = useDispatch();

  const inputRef = useRef();

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

  function searchFav(wordToSearch) {
    setSearchArchivedChats(wordToSearch);
    var resultFavorits = archivedL.filter((val) => {
      return val.name.toLowerCase().includes(wordToSearch.toLowerCase());
    });
    setArchivedChatsFiltered(resultFavorits);
  }

  function setClickedValue(e, chat) {
    var element = document.getElementById("menu-hide");
    element.classList.add("nav-hide");
    e.preventDefault();
    if(chat.last_message_user_uid != my_uid){
      chat.unread_messages = 0;
    }
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

    if (chat.chat_type == 1 || my_uid.id != chat.user_chat) {
      chat_name = chat.name;
      if (chat.chat_type == 1) {
        chat.pphoto = chat.groupphoto;
      }
      chat_initial = chat_name.substring(0, 1);
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
          className={"list-group-item"
          }
        >
          <div>
            <figure className="avatar" onClick={(e) => setClickedValue(e, chat)}>{p}</figure>
          </div>
          <div className="users-list-body">
            <div i={chat.chat_uid} onClick={(e) => setClickedValue(e, chat)}>
              <h5
                i={chat.chat_uid}
              >
                {chat.name}
              </h5>
              <div className="last-message">
              {
                (chat.deleted_message || chat.deleted_message_to)
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
            </div>
            <div className="users-list-action">
              <div className="action-toggle">
                <ArchivedDropdown
                  setOpenProfile={setOpenProfile}
                  openProfile={openProfile}
                  openUserProfile={openUserProfile}
                  setOpenUserProfile={setOpenUserProfile}
                  openGroupProfile={openGroupProfile}
                  setOpenGroupProfile={setOpenGroupProfile}
                  setUser={props.setUser}
                  socket={socket}
                  id={chat.user_chat}
                  chat_id={chat.chat_uid}
                />
              </div>
            </div>
          </div>
        </li>
      );
    }
    return "";
  };

  return (
    <div className="sidebar active">
      <header>
        <span>Archived</span>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search archived"
          ref={inputRef}
          value={searchArchivedChats}
          onChange={(e) => searchFav(e.target.value)}
        />
      </form>
      <div className="sidebar-body">
        <PerfectScrollbar>
          <ul className="list-group list-group-flush">
            {archivedChats.chats &&
              favoritearchivedChatsFiltered.map((chat, i) => (
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
