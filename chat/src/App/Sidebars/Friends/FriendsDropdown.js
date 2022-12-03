import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

const FriendsDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [one, setIOne] = useState("");
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

  // function RetriveNewChat(chat){
  //   console.log(chat.chat_uid);
  // }
  // useEffect(() => {
  //   socket.on("retrive newchat", RetriveNewChat);
  //   return () => {
  //     socket.off("retrive newchat", RetriveNewChat);
  //   };
  // },one);

  const newchat = (chat_uid) => {
    socket.emit("newChat", chat_uid);
    socket.once("retrive newchat", (data) => {
      props.setClicked(data.chat);
    });
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span">
        <FeatherIcon.MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu>
        {/*<DropdownItem onClick={() => newchat(props.chat_uid)}>
          New chat
        </DropdownItem>*/}
        <DropdownItem onClick={openUserProfileToggler}>Profile</DropdownItem>
        {/* <DropdownItem divider/> */}
        {/* <DropdownItem>Block</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FriendsDropdown;
