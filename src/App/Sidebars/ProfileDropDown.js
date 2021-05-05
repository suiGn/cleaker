import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ProfileDropdown = (props) => {
  const { socket, group } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function RemoveMember(chat){
    var remove = 
    {
      chat_uid: chat.chat_uid,
      u_id: chat.user_chat
    }
    socket.emit("RemoveGroupMember", remove );
    socket.once("retrive RemoveGroupMember", function (data) {
      socket.emit("GetGrupo", {id:chat.chat_uid});
    });
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-chat-message" >
      <div className="dropdown-view">
        <DropdownToggle className="dropdown-position" tag="span" style={{  position: "absolute", right: "0"}}>
          <FeatherIcon.MoreHorizontal />
        </DropdownToggle>
      </div>
      <DropdownMenu>
          <DropdownItem onClick={() => RemoveMember(props.chat)}>Remove Member</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
