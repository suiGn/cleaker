import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as FeatherIcon from "react-feather";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import FriendsDropdown from "./FriendsDropdown";
import { mobileSidebarAction } from "../../../Store/Actions/mobileSidebarAction";
import { Button } from "reactstrap";

function Index(props) {
  const [friendLists, setContact] = useState([]);
  const [favoriteFriendFiltered, setfavoriteFriendFiltered] = useState([]);
  const [searchAll, setsearchAll] = useState([]);
  const [searchFavorite, setSearchFavorite] = useState("");

  const { socket } = props;
  const { setOpenProfile } = props;
  const { openProfile } = props;
  const { setOpenUserProfile } = props;
  const { openUserProfile } = props;
  const { setOpenGroupProfile } = props;
  const { openGroupProfile } = props;

  const inputRef = useRef();

  const dispatch = useDispatch();

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

  function RetriveGetContacts(contacts) {
    var chats = contacts.chats.filter((chats) => {
        if(chats.chat_type == 0&&chats.user_chat!=contacts.my_uid){
          return chats
        }
    });
    contacts.chats = chats;
    setContact(contacts);
    setfavoriteFriendFiltered(chats);
  }

  useEffect(() => {
    socket.on("retrive GetContacts", RetriveGetContacts);
    return () => {
      socket.off("retrieve GetContacts", RetriveGetContacts);
    };
  });

  useEffect(() => {
    socket.emit("GetContacts");
  }, []);

  function searchFav(wordToSearch) {
    setSearchFavorite(wordToSearch);
    if (wordToSearch.length){
      var uids = "";
      friendLists.chats.forEach((user)=>{
        uids +=("'"+ user.user_chat + "',");
      })
      uids = uids +"'"+friendLists.my_uid+"'"
      socket.emit("SearchContacts", 
      {
        wordToSearch:wordToSearch,
        uids: uids
      });
      socket.once("retrive SearchContacts",(data)=>{
        setsearchAll(data)
        var resultFavorits = friendLists.chats.filter((val) => {
          if(val.name.toLowerCase().includes(wordToSearch.toLowerCase())&&val.user_chat!=friendLists.my_uid){
            return val
          }
        });
        var NewresultFavorits = resultFavorits.concat(data.users)
        //console.log(NewresultFavorits)
        setfavoriteFriendFiltered(NewresultFavorits);
      })
    }else{
      var resultFavorits = friendLists.chats.filter((val) => {
        return val.name.toLowerCase().includes(wordToSearch.toLowerCase());
      });
      
      setfavoriteFriendFiltered(resultFavorits);
    }
  }

  const newchat = (chat_uid) => {
    socket.emit("newChat", chat_uid);
    socket.once("retrive newchat", (data) => {
      props.setClicked(data.chat);
      mobileSidebarClose();
    });
  };

  function AddUserContact(u_id) {
    props.socket.emit("AddContact", { u_id: u_id, message: "" });
    props.socket.once("retrive Addcontact", (mssg) => {
      props.socket.emit("GetContacts");
    });
  }

  return (
    <div className="sidebar active">
      <header>
        <span>Contacts</span>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search contacts"
          ref={inputRef}
          value={searchFavorite}
          onChange={(e) => searchFav(e.target.value)}
        />
      </form>
      <div className="sidebar-body">
        <PerfectScrollbar>
          {
            favoriteFriendFiltered.length>0?
            <ul className="list-group list-group-flush">
              {friendLists.chats &&
                favoriteFriendFiltered.map((item, i) => {
                  let chat_name = item.name;
                  let p;
                  let chat_initial = chat_name.substring(0, 1);
                  if (item.pphoto === "" || item.pphoto === null) {
                    p = (
                      <span className="avatar-title bg-info rounded-circle">
                        {chat_initial}
                      </span>
                    );
                  } else {
                    p = (
                      <img
                        src={item.pphoto}
                        className="rounded-circle"
                        alt="image"
                      />
                    );
                  }
                  return (
                    item.chat_uid?
                    <li
                      key={i}
                      className="list-group-item"
                      onClick={() => newchat(item.chat_uid)}
                    >
                      <figure className="avatar">{p}</figure>
                      <div className="users-list-body">
                        <div>
                          <h5>{item.name}</h5>
                        </div>
                        <div className="users-list-action">
                          <div className="action-toggle">
                            <FriendsDropdown
                              setOpenProfile={setOpenProfile}
                              openProfile={openProfile}
                              openUserProfile={openUserProfile}
                              setOpenUserProfile={setOpenUserProfile}
                              openGroupProfile={openGroupProfile}
                              setOpenGroupProfile={setOpenGroupProfile}
                              setUser={props.setUser}
                              id={item.user_chat}
                              chat_uid={item.chat_uid}
                              socket={props.socket}
                              setClicked={props.setClicked}
                            />
                          </div>
                        </div>
                      </div>
                    </li>:
                    <li key={i} className="list-group-item list-group-extra">
                      <figure className="avatar">{p}</figure>
                      <div className="users-list-body">
                        <div>
                          <h5>{item.name}</h5>
                        </div>
                        <div className="users-list-action">
                          <Button color="primary" onClick={()=>AddUserContact(item.u_id)}>
                            <FeatherIcon.UserPlus />
                          </Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            :
            <div className="user-help">
              Please search for users on the search bar above
            </div>
          }
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Index;
