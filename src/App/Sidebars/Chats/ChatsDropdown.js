import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ChatsDropdown = (props) => {
  const { socket, setChat, setUser, setOpenUserProfile, chat_type,
    setOpenProfile, openProfile, openUserProfile, setOpenGroupProfile,
    chat_uid, id, openGroupProfile,setClicked, setGroup,groupExit,adminGroup } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function DeleteChat() {
    socket.emit("Delete Chat", { chat_uid: chat_uid});
    socket.once("retrive delete chat", () => {
      socket.emit("get chats");
      setClicked([]);
    });
  }

  function DeleteGroup(){
    socket.emit("Delete Group", { chat_uid: chat_uid, u_id: id });
    socket.once("retrive Delete Group", () => {
      socket.emit("get chats");
      setClicked([]);
    });
  }

  const openUserProfileToggler = (e) => {
    setChat({ id: chat_uid });
    setUser({ id: id });
    setOpenUserProfile(!openUserProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
    }
  };

  const GroupProfileAction = () => {
    setChat({ id:chat_uid });
    setGroup({ id:chat_uid });
    setOpenGroupProfile(!openGroupProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openUserProfile) {
      setOpenUserProfile(!openUserProfile);
    }
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span">
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu>
        {chat_type == 0 ? (
          <DropdownItem onClick={openUserProfileToggler}>Profile</DropdownItem>
        ) : (
          <DropdownItem onClick={GroupProfileAction}>Group Info.</DropdownItem>
        )}
        {chat_type == 0 ? 
          <DropdownItem onClick={() => DeleteChat()}>
            Delete
          </DropdownItem>
         : groupExit  == 1 ?
          <DropdownItem onClick={() => DeleteGroup()}>
            Delete group
          </DropdownItem>:""
      }
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatsDropdown;
