import React, { useState } from "react";
import { profileAction } from "../../../Store/Actions/profileAction";
import { mobileProfileAction } from "../../../Store/Actions/mobileProfileAction";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const ArchivedDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { socket } = props;

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // const profileActions = () => {
  //   props.setUser({ id: props.id });
  //   dispatch(userProfileAction(true));
  //   dispatch(mobileUserProfileAction(true));
  // };

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

  function Unarchive(chat_selected) {
    socket.emit("Unarchive chat", { chat: chat_selected });
    socket.once("Unarchive response", function (data) {
      socket.emit("get chats archived");
    });
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span">
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => Unarchive(props.chat_id)}>
          Remove from archive
        </DropdownItem>
        <DropdownItem onClick={openUserProfileToggler}>Profile</DropdownItem>
        {/* <DropdownItem divider />
        <DropdownItem>Block</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ArchivedDropdown;
