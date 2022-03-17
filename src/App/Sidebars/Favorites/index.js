import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import FavoritesDropdown from "./FavoritesDropdown";
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
import * as FeatherIcon from "react-feather";
import ModalImage from "react-modal-image";
import ImageModal from "../../Modals/ImageModal";

function Index(props) {
  const { socket, my_uid } = props;
  const [favoriteChats, setfavoriteChats] = useState([]);
  const [favoriteChatsFiltered, setfavoriteChatsFiltered] = useState([]);
  const [searchFavorite, setSearchFavorite] = useState("");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    // inputRef.current.focus();
    socket.emit("GetFavorites", my_uid);
  }, props);

  function RetrieveGetFavorites(data) {
    if (data.favorites) {
      let i = 0;
      var arrayMedia = data.favorites.filter(function(item){
        if(item.is_image){
          item.position = i
          i++
          return item
        }
      })
      setMedia(arrayMedia)
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
                            <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                          </div>
                        </div>
                        <div class="message-content position-relative img-chat">
                          <ImageModal file={message.file} images={media} position={message.position} message={message}
                          name={message.name} pphoto={message.pphoto}
                          />
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
                          <h5>{message.name}</h5>
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
