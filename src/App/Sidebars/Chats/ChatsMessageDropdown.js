import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";
import { profileAction } from "../../../Store/Actions/profileAction";
import { mobileProfileAction } from "../../../Store/Actions/mobileProfileAction";
import { useDispatch } from "react-redux";

const ChatsMessageDropdown = (props) => {
  const dispatch = useDispatch();
  const { socket, setMessageRespond, setViewChatAnswerPreview} = props;
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

  function DeleteMessage(message_id) {
    if (props.message.message_user_uid != props.my_uid.id) {
      socket.emit("Delete message", { id: message_id, to: true });
    } else {
      socket.emit("Delete message", { id: message_id, to: false });
    }
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("get chats")
  }

  function AnswerMessage(message){
    setMessageRespond(message)
    setViewChatAnswerPreview(false)
  }

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className="dropdown-chat-message"
    >
      <div className="dropdown-view">
      <DropdownToggle className="dropdown-position" tag="span" style={{  position: "absolute", right: "0"}}>
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      </div>
      <DropdownMenu>
        <DropdownItem onClick={() => AnswerMessage(props.message)}>
          Answer
        </DropdownItem>
        <DropdownItem onClick={() => DeleteMessage(props.message.message_id)}>
          Delete
        </DropdownItem>
        {props.message.chat_type == 1 ? (
          props.message.message_user_uid != props.prop_id &&
          !props.message.favorite ? (
            <DropdownItem onClick={() => AddFavorite(props.message.message_id)}>
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
