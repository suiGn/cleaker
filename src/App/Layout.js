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
import VideoCallUserModal from "./Modals/VideoCallUserModal";
import VoiceCallUserModal from "./Modals/VoiceCallUserModal";
import VoiceCallModal from "./Modals/VoiceCallModal";
import VideoCallModal from "./Modals/VideoCallModal";
import CallView from "./Partials/CallView";
import Fav from "./Sidebars/Fav";
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
  const [openFav, setOpenFav] = useState(false);
  const [openMessageDetail, setOpenMessageDetail] = useState(false);
  const [scrollEl, setScrollEl] = useState();
  const [imgPreview, setImgPreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [files, setFile] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [viewCall, setViewCall] = useState(false);
  const [imageOrFile, setImageOrFile] = useState(0);
  const [limitChat, setLimitChat] = useState(20);
  const [chat_uid, setChat_uid] = useState("");
  const [messageRespond, setMessageRespond] = useState("");
  const [viewChatAnswerPreview, setViewChatAnswerPreview] = useState(true);
  const [isResponse, setisResponse] = useState(false);
  const [media, setMedia] = useState([]);
  const [fav, setFav] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);
  const [mediaProfileType, setMediaProfileType] = useState(0);
  const [favProfileType, setFavProfileType] = useState(0);
  const [messageDetail, setMessageDetail] = useState(0); 

  const [nameCallU, setNameCallU] = useState(""); 
  const [pCall, setPCall] = useState("");
  const [modalCall, setModalCall] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);

  const modalToggleCall = () => setModalCall(!modalCall);

  const modalToggleVideo = () => setModalVideo(!modalVideo);


  const [filePreviewChange, setFilePreviewChange] = useState([]); 

  //video call state
  const [modal, setModal] = useState(false);
  const [nameCall,setNameCall] =  useState(null);
  const [photoCall,setPhotoCall] = useState(null);
  const [modalVoice, setModalVoice] = useState(false);
  const [idUserCall, setIdUserCall] =  useState(null);
  const [idCall, setIdCall] =  useState(null);
  const [roomid,setRoomid] =  useState(null);
  

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
    props.socket.on("NotifyCall",NotifyCall);
    props.socket.on("NotifyVoiceCall",NotifyVoiceCall);
    props.socket.on("rejectVideoCallModal",rejectVideoCall);
    props.socket.on("rejectVoiceCallModal",rejectVoiceCall);
    props.socket.on('rejectCallModal',rejectCallModal);
    props.socket.on('rejectCallModalVoice',rejectVoiceModal);
    props.socket.on('aceptedVideoCallRedirect',aceptedVideoCall);
    props.socket.on('aceptedVoiceCallRedirect',aceptedVoiceCall);
    props.socket.on('aceptedVoiceCallRedirectUser',aceptedVoiceCallUser);
    return () => {
      props.socket.off("NotifyCall", NotifyCall);
      props.socket.off("NotifyVoiceCall", NotifyVoiceCall);
      props.socket.off("rejectVideoCallModal",rejectVideoCall);
      props.socket.off("rejectVoiceCallModal",rejectVoiceCall);
      props.socket.off('rejectCallModal',rejectCallModal);
      props.socket.off('rejectCallModalVoice',rejectVoiceModal);
      props.socket.off('aceptedVideoCallRedirect',aceptedVideoCall);
      props.socket.off('aceptedVoiceCallRedirect',aceptedVoiceCall);
      props.socket.off('aceptedVoiceCallRedirectUser',aceptedVoiceCallUser);
    };
  }, [my_uid]);

  const NotifyCall=({chat_uid,name,pphoto,idUserCall,roomid})=>{
    if (pphoto === "" || pphoto === null) {
      const chat_initial = name.substring(0, 1);
      setPhotoCall(
        <span className="avatar-title bg-info rounded-circle">
          {chat_initial}
        </span>
      );
    } else {
      setPhotoCall(<img src={pphoto} className="rounded-circle" alt="image" />);
    }
    setNameCall(name);
    setRoomid(roomid);
    setIdCall(idUserCall);
    setModal(!modal);
  };

  const rejectCallModal = () =>{
    setModalVideo(!modalVideo)
  }
  const rejectVideoCall = () =>{
    setModal(modal);
  }

  const rejectVoiceCall = ()=>{
    setModalVoice(false);
  }

  const rejectVoiceModal = ()=>{
    setModalCall(false)
  }
  
  const NotifyVoiceCall=({name,pphoto,idUserCall,roomid})=>{
    if (pphoto === "" || pphoto === null) {
      const chat_initial = name.substring(0, 1);
      setPhotoCall(
        <span className="avatar-title bg-info rounded-circle">
          {chat_initial}
        </span>
      );
    } else {
      setPhotoCall(<img src={pphoto} className="rounded-circle" alt="image" />);
    }
    setNameCall(name);
    setIdCall(idUserCall);
    setRoomid(roomid);
    setModalVoice(!modalVoice);
  };

  const aceptedVideoCall = ({roomid})=>{
    window.location = "/call/"+roomid;
  };

  function aceptedVoiceCallUser(roomid){
    //window.location = "/call/"+roomid;
  }

  function aceptedVoiceCall({roomid}){
    window.location = "/voicecall/"+roomid;
  }

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
          setNameCall={setNameCallU}
          setPCall={setPCall}
          modalToggleCall={modalToggleCall}
          modalToggleVideo={modalToggleVideo}
          setIdUserCall={setIdUserCall}
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
          setMediaPreview={setMediaPreview}
          mediaPreview={mediaPreview}
          setMediaProfileType={setMediaProfileType}
          clicked={clicked}
          my_uid={my_uid}
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
          setMediaPreview={setMediaPreview}
          mediaPreview={mediaPreview}
          setMediaProfileType={setMediaProfileType}
        />
        <SearchChat
          socket={socket}
          clicked={clicked}
          my_uid={my_uid}
          setOpenSearchSidebar={setOpenSearchSidebar}
          openSearchSidebar={openSearchSidebar}
          scrollEl={scrollEl}
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
        <Fav 
        fav={fav}
        openFav={openFav}
        setOpenFav={setOpenFav}
        openUserProfile={openUserProfile}
        setOpenUserProfile={setOpenUserProfile}
        setOpenProfile={setOpenProfile}
        openProfile={openProfile}
        openGroupProfile={openGroupProfile}
        setOpenGroupProfile={setOpenGroupProfile}
        favProfileType={favProfileType}
        setFavProfileType={setFavProfileType}
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
        <VideoCallModal 
        setModal={setModal}
        modal={modal}
        name={nameCall}
        pphoto={photoCall}
        idCall={idCall}
        socket={socket}
        roomid={roomid}
        setViewCall={setViewCall}/>
        <VoiceCallModal 
        setModal={setModalVoice}
        modal={modalVoice}
        name={nameCall}
        pphoto={photoCall}
        socket={socket}
        idCall={idCall}
        roomid={roomid}
        setViewCall={setViewCall}/>
        <DisconnectedModal />
        <VoiceCallUserModal name={nameCallU} 
        pphoto={pCall}
        modalCall={modalCall}
        modalToggle={modalToggleCall}
        socket={socket}
        idUserCall={idUserCall}/>
        <VideoCallUserModal name={nameCallU} 
        pphoto={pCall}
        modalVideo={modalVideo}
        modalToggle={modalToggleVideo}
        socket={socket}
        idUserCall={idUserCall}/>
        <CallView
        viewCall={viewCall}
        setViewCall={setViewCall}
        />
      </div>
    </div>
  );
}

export default Layout;