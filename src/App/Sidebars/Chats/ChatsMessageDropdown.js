import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";
import { useDispatch } from "react-redux";

const ChatsMessageDropdown = (props) => {
  const dispatch = useDispatch();
  const { socket, setMessageRespond, setViewChatAnswerPreview, deleteButton, 
    setMessageToDelete,openMessageDetail, setOpenMessageDetail,setMessageDetail} = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function AddFavorite(message_id) {
    socket.emit("FavoriteMessage", { id: message_id });
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("GetFavorites", props.my_uid);
  }

  function RemoveFavorite(message_id) {
    socket.emit("RemoveFavorite", { id: message_id });
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("GetFavorites", props.my_uid);
  }

  function AddFavoriteTo(message_id) {
    socket.emit("FavoriteMessage_to", { id: message_id });
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("GetFavorites", props.my_uid);
  }

  function RemoveFavoriteTo(message_id) {
    socket.emit("RemoveFavorite_to", { id: message_id });
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("GetFavorites", props.my_uid);
  }

  function DeleteMessage(message) {
    setMessageToDelete(message);
    deleteButton.current.click();
    toggle();
  }

  function AnswerMessage(message){
    props.setisResponse(true)
    setMessageRespond(message)
    setViewChatAnswerPreview(false)
  }

  function MessageInfo(){
    setOpenMessageDetail(!openMessageDetail)
    console.log(props.message)
    setMessageDetail(props.message)
  }

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className="dropdown-chat-message"
    >
      <div className="dropdown-view">
      <DropdownToggle className="dropdown-position" tag="span" style={{  position: "absolute", right: "0", top: props.dropdownType}}>
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      </div>
      <DropdownMenu>
        {props.message.chat_type == 1 ? (
          props.message.message_user_uid == props.prop_id?
            <DropdownItem onClick={() => MessageInfo(props.message)}>
            Message Info.
            </DropdownItem>:""
        ):
        (props.message.message_user_uid != props.prop_id?
            <DropdownItem onClick={() => MessageInfo(props.message)}>
            Message Info.
            </DropdownItem>  :""
        )}
        <DropdownItem onClick={() => AnswerMessage(props.message)}>
          Reply
        </DropdownItem>
        <DropdownItem onClick={() => DeleteMessage(props.message)}>
          Delete
        </DropdownItem>
        {props.message.chat_type == 1 ? (
          props.message.message_user_uid != props.prop_id &&
          !props.message.favorite ? (
            <DropdownItem onClick={() => AddFavorite(props.message)}>
              Favorite
            </DropdownItem>
            
          ) : (
            ""
          )
        ) : props.message.message_user_uid == props.prop_id &&
          !props.message.favorite ? (
          <DropdownItem onClick={() => AddFavorite(props.message.message_id)}>
            Favorite
          </DropdownItem>
        ) : props.message.message_user_uid != props.prop_id &&
          !props.message.favorite_to ? (
          <DropdownItem onClick={() => AddFavoriteTo(props.message.message_id)}>
            Favorite
          </DropdownItem>
        ) : (
          ""
        )}
        {props.message.chat_type == 1 ? (
          props.message.message_user_uid != props.prop_id &&
          props.message.favorite ? (
            <DropdownItem
              onClick={() => RemoveFavorite(props.message.message_id)}
            >
              Remove Favorite
            </DropdownItem>
          ) : (
            ""
          )
        ) : props.message.message_user_uid == props.prop_id &&
          props.message.favorite ? (
          <DropdownItem
            onClick={() => RemoveFavorite(props.message.message_id)}
          >
            Remove Favorite
          </DropdownItem>
        ) : props.message.message_user_uid != props.prop_id &&
          props.message.favorite_to ? (
          <DropdownItem
            onClick={() => RemoveFavoriteTo(props.message.message_id)}
          >
            Remove Favorite
          </DropdownItem>
        ) : (
          ""
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatsMessageDropdown;
