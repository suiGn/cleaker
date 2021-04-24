import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tour from "reactour";
import TourModal from "./Modals/TourModal";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import UserProfile from "./Sidebars/UserProfile";
import SearchChat from "./Sidebars/SearchChats";
import ProfileGroup from "./Sidebars/ProfileGroup";
import Chat from "./Partials/Chat";
import ChatN from "./Partials/ChatNoMessage";
import { pageTourAction } from "../Store/Actions/pageTourAction";
import { profileAction } from "../Store/Actions/profileAction";
import DisconnectedModal from "./Modals/DisconnectedModal";
import ChatNoMessage from "./Partials/ChatNoMessage";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:5000/";

function Layout(props) {
  const [clicked, setClicked] = useState([]);
  const { pageTour } = useSelector((state) => state);
  const { socket, setLoaded } = props;
  const [user, setUser] = useState("");
  const [chat, setChat] = useState("");
  const [group, setGroup] = useState("");
  const [unread, setUnread] = useState(false);
  const [unreadChats, setUnreadChats] = useState([]);
  const dispatch = useDispatch();
  const [my_uid, setMy_Id] = useState("");
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openGroupProfile, setOpenGroupProfile] = useState(false);
  const [openSearchSidebar, setOpenSearchSidebar] = useState(false);
  const [scrollEl, setScrollEl] = useState();
  const [imgPreview, setImgPreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [files, setFile] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [imageOrFile, setImageOrFile] = useState(0);
  const [limitChat, setLimitChat] = useState(10);
  const [chat_uid, setChat_uid] = useState("");

  

  useEffect(() => {
    document.querySelector("*").addEventListener("click", (e) => {
      if (
        document.body.classList.contains("navigation-open") &&
        e.target.nodeName === "BODY"
      ) {
      }
    });
  }, []);

  useEffect(() => {
    props.socket.once("my_uid response", (data) => {
      setMy_Id({ id: data.user[0].u_id });
    });
  }, [my_uid]);

  const tourSteps = [
    {
      selector: "#Tooltip-New-Chat",
      content: "You can create a new chat here.",
    },
    {
      selector: "#Tooltip-Add-Group",
      content: "You can start a new group to chat with all your contacts.",
    },
    {
      selector: "#Tooltip-2",
      content:
        "Layout and messages you've added to your favorites appear here.",
    },
    {
      selector: "#Tooltip-3",
      content: "Layout and messages you've archived appear here.",
    },
    {
      selector: "#Tooltip-Voice-Call",
      content: "Start voice call from here.",
    },
    {
      selector: "#Tooltip-Video-Call",
      content: "Start a video call from here.",
    },
    {
      selector: "#user-menu",
      content: "Here you can manage your personal information and settings.",
    },
  ];

  return (
    <div className="layout">
      <Tour
        steps={tourSteps}
        isOpen={pageTour}
        onRequestClose={() => dispatch(pageTourAction(false))}
      />
      <div className="content">
        <SidebarIndex
          socket={socket}
          setClicked={setClicked}
          setOpenSearchSidebar={setOpenSearchSidebar}
          setUser={setUser}
          setGroup={setGroup}
          my_uid={my_uid}
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openUserProfile={openUserProfile}
          setOpenUserProfile={setOpenUserProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          setUnread={setUnread}
          setUnreadChats={setUnreadChats}
          setLoaded={setLoaded}
        />
        <Chat
          darkSwitcherTooltipOpen={props.darkSwitcherTooltipOpen}
          socket={socket}
          clicked={clicked}
          setUser={setUser}
          setGroup={setGroup}
          setOpenUserProfile={setOpenUserProfile}
          openUserProfile={openUserProfile}
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          my_uid={my_uid}
          scrollEl={scrollEl}
          openSearchSidebar={openSearchSidebar}
          setOpenSearchSidebar={setOpenSearchSidebar}
          setScrollEl={setScrollEl}
          setClicked={setClicked}
          setUnreadChats={setUnreadChats}
          unreadChats={unreadChats}
          setChat={setChat}
          setUnread={setUnread}
          setImgPreview={setImgPreview}
          setFile={setFile}
          imgPreview={imgPreview}
          files={files}
          viewPreview={viewPreview}
          setViewPreview={setViewPreview}
          setImageOrFile={setImageOrFile}
          setFilePreview={setFilePreview}
          setVideoPreview ={setVideoPreview}
          setLimitChat={setLimitChat}
          setChat_uid={setChat_uid}
        />
        <ChatNoMessage
          files={files}
          viewPreview={viewPreview}
          setViewPreview={setViewPreview}
          setImageOrFile={setImageOrFile}
          imageOrFile={imageOrFile}
          socket={socket}
          limitChat={limitChat}
          chat_uid={chat_uid}
          setFile={setFile}
        />
        <Navigation
          darkSwitcherTooltipOpen={props.darkSwitcherTooltipOpen}
          setDarkSwitcherTooltipOpen={props.setDarkSwitcherTooltipOpen}
          socket={socket}
          setUser={setUser}
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openUserProfile={openUserProfile}
          setOpenUserProfile={setOpenUserProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          openSearchSidebar={openSearchSidebar}
          setOpenSearchSidebar={setOpenSearchSidebar}
          my_uid={my_uid}
          data={clicked}
          unread={unread}
          unreadChats={unreadChats}
        />
        <Profile
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openUserProfile={openUserProfile}
          setOpenUserProfile={setOpenUserProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          socket={socket}
          user={user}
        />
        <UserProfile
          openUserProfile={openUserProfile}
          setOpenUserProfile={setOpenUserProfile}
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          socket={socket}
          user={user}
          chat={chat}
        />
        <SearchChat
          socket={socket}
          clicked={clicked}
          my_uid={my_uid}
          setOpenSearchSidebar={setOpenSearchSidebar}
          openSearchSidebar={openSearchSidebar}
          scrollEl={scrollEl}
        />
        <ProfileGroup
          openUserProfile={openUserProfile}
          setOpenUserProfile={setOpenUserProfile}
          setOpenProfile={setOpenProfile}
          openProfile={openProfile}
          openGroupProfile={openGroupProfile}
          setOpenGroupProfile={setOpenGroupProfile}
          socket={socket}
          group={group}
          clicked={clicked}
          chat={chat}
          my_uid={my_uid}
        />
        <TourModal />
        <DisconnectedModal />
      </div>
    </div>
  );
}

export default Layout;