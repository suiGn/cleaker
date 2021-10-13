import React, { useState,useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ProfileDropdown = (props) => {
  const { modalToggleDelete,modalDelete,setToDelete,socket } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function RemoveMember(chat){
    setToDelete(chat)
    modalToggleDelete(!modalDelete)
  }

  function MakeAdmin(chat){
    socket.emit("MakeAdmin", chat);
    socket.once("retrive MakeAdmin", function (data) {
      socket.emit("GetGrupo", {id:chat.chat_uid});
    });
  }

  function RemoveAdmin(chat){
    socket.emit("RemoveAdmin", chat);
    socket.once("retrive RemoveAdmin", function (data) {
      socket.emit("GetGrupo", {id:chat.chat_uid});
    });
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-chat-message" >
      <div className="dropdown-view">
        <DropdownToggle className="dropdown-position" tag="span">
          <FeatherIcon.MoreHorizontal />
        </DropdownToggle>
      </div>
      <DropdownMenu>
          {props.chat.admin_group==1?
          <DropdownItem onClick={() => RemoveAdmin(props.chat)}>Remove Admin</DropdownItem>:
          <DropdownItem onClick={() => MakeAdmin(props.chat)}>Make Admin</DropdownItem>}
          <DropdownItem onClick={() => RemoveMember(props.chat)}>Remove Member</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
