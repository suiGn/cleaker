import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ProfileDropdown = (props) => {
  const { modalToggleDelete,modalDelete,setToDelete } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function RemoveMember(chat){
    setToDelete(chat)
    modalToggleDelete(!modalDelete)
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-chat-message" >
      <div className="dropdown-view">
        <DropdownToggle className="dropdown-position" tag="span">
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
