import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import FavoritesDropdown from "./FavoritesDropdown";
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
import * as FeatherIcon from "react-feather";
import ModalImage from "react-modal-image";

function Index(props) {
  const { socket } = props;
  const [favoriteChats, setfavoriteChats] = useState([]);
  const [favoriteChatsFiltered, setfavoriteChatsFiltered] = useState([]);
  const [searchFavorite, setSearchFavorite] = useState("");

  useEffect(() => {
    // inputRef.current.focus();
    socket.emit("GetFavorites", props.my_uid);
  }, props);

  function RetrieveGetFavorites(data) {
    if (data.favorites) {
      setfavoriteChats(data.favorites);
      setfavoriteChatsFiltered(data.favorites);
    }
  }

  useEffect(() => {
    socket.on("retrieve getfavorites", RetrieveGetFavorites);
    return () => {
      socket.off("retrieve getfavorites", RetrieveGetFavorites);
    };
  });

  const inputRef = useRef();

  const dispatch = useDispatch();

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

  function searchFav(wordToSearch) {
    setSearchFavorite(wordToSearch);
    var resultFavorits = favoriteChats.filter((val) => {
      return val.message.toLowerCase().includes(wordToSearch.toLowerCase());
    });
    setfavoriteChatsFiltered(resultFavorits);
  }
  return (
    <div className="sidebar active">
      <header>
        <span>Favorites</span>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search favorites"
          ref={inputRef}
          value={searchFavorite}
          onChange={(e) => searchFav(e.target.value)}
        />
      </form>
      <div className="sidebar-body sidebar-body-favorites">
        <PerfectScrollbar
        options={{ suppressScrollX: true }}>
          <ul className="list-group list-group-flush">
            {favoriteChatsFiltered.map((message, i) => {
              return (
                message.is_file?
                "":
                message.is_image?
                <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                    <div class="messages-container">
                    <div id={message.message_id} className={"message-item"}>
                      <div className="message-avatar">
                        <div>
                          <h5>{message.name}</h5>
                        </div>
                      </div>
                      <div class="message-content position-relative img-chat">
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
                        </div>
                      </div>
                    </div> 
                </li>:
                message.is_video?
                "":
                <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                  <div class="messages-container">
                    <div id={message.message_id} className={"message-item"}>
                    <div className="message-avatar">
                      <div>
                        <h5>{message.name}</h5>
                      </div>
                    </div>
                      <div class="message-content position-relative img-chat">
                        <div className="word-break">{message.message}</div>
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
