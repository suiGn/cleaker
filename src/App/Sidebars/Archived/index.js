import React, { useEffect, useRef, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import ArchivedDropdown from "./ArchivedDropdown";
import { useDispatch } from "react-redux";
// import {archivedChats} from "./Data"
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
import * as FeatherIcon from "react-feather";

function Index(props) {
  const { socket } = props;
  const { setOpenProfile } = props;
  const { openProfile } = props;
  const { setOpenUserProfile } = props;
  const { openUserProfile } = props;
  const { setOpenGroupProfile } = props;
  const { openGroupProfile } = props;
  const [archivedChats, setArchivedChats] = useState([]);
  const [favoritearchivedChatsFiltered, setArchivedChatsFiltered] = useState(
    []
  );
  const [searchArchivedChats, setSearchArchivedChats] = useState("");
  const [one, setIOne] = useState("");

  function RetrieveChatsArchived(data) {
    setArchivedChats(data);
    setArchivedChatsFiltered(data.chats);
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
    var resultFavorits = archivedChats.chats.filter((val) => {
      return val.name.toLowerCase().includes(wordToSearch.toLowerCase());
    });
    setArchivedChatsFiltered(resultFavorits);
  }

  return (
    <div className="sidebar active">
      <header>
        <span>Archived</span>
        <ul className="list-inline">
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
              favoritearchivedChatsFiltered.map((chat, i) => {
                if (chat.user_chat == archivedChats.my_uid) {
                  return "";
                }
                let chat_name = chat.name;
                let p;
                let chat_initial = chat_name.substring(0, 1);
                if (chat.pphoto === "" || chat.pphoto === null) {
                  p = (
                    <span className="avatar-title bg-info rounded-circle">
                      {chat_initial}
                    </span>
                  );
                } else {
                  p = (
                    <img
                      src={chat.pphoto}
                      className="rounded-circle"
                      alt="image"
                    />
                  );
                }
                return (
                  <li key={i} className="list-group-item">
                    <figure className="avatar">{p}</figure>
                    <div className="users-list-body">
                      <div>
                        <h5>{chat.name}</h5>
                        <p>{chat.title}</p>
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
              })}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Index;
