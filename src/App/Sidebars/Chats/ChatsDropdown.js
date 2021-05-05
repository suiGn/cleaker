import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ChatsDropdown = (props) => {
  const { socket } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  function DeleteChat(idchat) {
    socket.emit("Delete Chat", { chat_uid: idchat });
    socket.once("retrive delete chat", () => {
      socket.emit("get chats");
      props.setClicked([]);
    });
  }

  const openUserProfileToggler = (e) => {
    props.setUser({ id: props.id });
    props.setOpenUserProfile(!props.openUserProfile);
    if (props.openProfile) {
      props.setOpenProfile(!props.openProfile);
    }
    if (props.openGroupProfile) {
      props.setOpenGroupProfile(!props.openGroupProfile);
    }
  };

  const GroupProfileAction = () => {
    props.setGroup({ id: props.chat_uid });
    props.setOpenGroupProfile(!props.openGroupProfile);
    if (props.openProfile) {
      props.setOpenProfile(!props.openProfile);
    }
    if (props.openUserProfile) {
      props.setOpenUserProfile(!props.openUserProfile);
    }
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span">
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu>
        {props.chat_type == 0 ? (
          <DropdownItem onClick={openUserProfileToggler}>Profile</DropdownItem>
        ) : (
          <DropdownItem onClick={GroupProfileAction}>Group Info.</DropdownItem>
        )}
        {props.chat_type == 0 ? (
          <DropdownItem onClick={() => DeleteChat(props.chat_uid)}>
            Delete
          </DropdownItem>
        ) : (
          ""
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatsDropdown;
