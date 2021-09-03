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
import MessageDetail from "./Sidebars/MessageDetail";
import Chat from "./Partials/Chat";
import { pageTourAction } from "../Store/Actions/pageTourAction";
import DisconnectedModal from "./Modals/DisconnectedModal";
import ChatNoMessage from "./Partials/ChatNoMessage";
import Media from "./Sidebars/Media";
import VideoCallModal from "./Modals/VideoCallModal";
import VoiceCallModal from "./Modals/VoiceCallModal";
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
  const [openMedia, setOpenMedia] = useState(false);
  const [openMessageDetail, setOpenMessageDetail] = useState(false);
  const [scrollEl, setScrollEl] = useState();
  const [imgPreview, setImgPreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [files, setFile] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [imageOrFile, setImageOrFile] = useState(0);
  const [limitChat, setLimitChat] = useState(20);
  const [chat_uid, setChat_uid] = useState("");
  const [messageRespond, setMessageRespond] = useState("");
  const [viewChatAnswerPreview, setViewChatAnswerPreview] = useState(true);
  const [isResponse, setisResponse] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaProfileType, setMediaProfileType] = useState(0);
  const [messageDetail, setMessageDetail] = useState(0); 

  const [nameCall, setNameCall] = useState(""); 
  const [pCall, setPCall] = useState("");
  const [modalCall, setModalCall] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);

  const modalToggleCall = () => setModalCall(!modalCall);

  const modalToggleVideo = () => setModalVideo(!modalVideo);


  const [filePreviewChange, setFilePreviewChange] = useState([]); 
  

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
          setChat={setChat}
        />
        <Chat
          user={user}
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
          messageRespond={messageRespond}
          setMessageRespond={setMessageRespond}
          viewChatAnswerPreview={viewChatAnswerPreview}
          setViewChatAnswerPreview={setViewChatAnswerPreview}
          isResponse={isResponse}
          setisResponse={setisResponse}
          openMessageDetail={openMessageDetail}
          setOpenMessageDetail={setOpenMessageDetail}
          setMessageDetail={setMessageDetail}
          filePreviewChange = {filePreviewChange}
          setFilePreviewChange = {setFilePreviewChange}
          setChat={setChat}
          setNameCall={setNameCall}
          setPCall={setPCall}
          modalToggleCall={modalToggleCall}
          modalToggleVideo={modalToggleVideo}
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
          setViewChatAnswerPreview={setViewChatAnswerPreview}
          isResponse={isResponse}
          setisResponse={setisResponse}
          messageRespond={messageRespond}
          clicked={clicked}
          my_uid={my_uid}
          filePreviewChange = {filePreviewChange}
          setFilePreviewChange = {setFilePreviewChange}
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
          openMedia={openMedia}
          setOpenMedia={setOpenMedia}
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
          openMedia={openMedia}
          setOpenMedia={setOpenMedia}
          socket={socket}
          user={user}
          chat={chat}
          setMedia={setMedia}
          media={media}
          setMediaProfileType={setMediaProfileType}
          clicked={clicked}
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
          openMedia={openMedia}
          setOpenMedia={setOpenMedia}
          socket={socket}
          group={group}
          clicked={clicked}
          chat={chat}
          my_uid={my_uid}
          setClicked={setClicked}
          setMedia={setMedia}
          media={media}
          setMediaProfileType={setMediaProfileType}
        />
        <Media 
        media={media}
        openMedia={openMedia}
        setOpenMedia={setOpenMedia}
        openUserProfile={openUserProfile}
        setOpenUserProfile={setOpenUserProfile}
        setOpenProfile={setOpenProfile}
        openProfile={openProfile}
        openGroupProfile={openGroupProfile}
        setOpenGroupProfile={setOpenGroupProfile}
        mediaProfileType={mediaProfileType}
        setMediaProfileType={setMediaProfileType}
        />
        <MessageDetail
        setOpenUserProfile={setOpenUserProfile}
        setOpenProfile={setOpenProfile}
        setOpenMedia={setOpenMedia}
        setOpenGroupProfile={setOpenGroupProfile}
        openMessageDetail={openMessageDetail}
        setOpenMessageDetail={setOpenMessageDetail}
        messageDetail={messageDetail}
        clicked={clicked}
        setUser={setUser}
        my_uid={my_uid}
        />
        <TourModal />
        <DisconnectedModal />
        <VoiceCallModal name={nameCall} 
        pphoto={pCall}
        modalCall={modalCall}
        modalToggle={modalToggleCall}/>
        <VideoCallModal name={nameCall} 
        pphoto={pCall}
        modalVideo={modalVideo}
        modalToggle={modalToggleVideo}/>
      </div>
    </div>
  );
}

export default Layout;