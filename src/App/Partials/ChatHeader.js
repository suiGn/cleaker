import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip
} from "reactstrap";
import * as FeatherIcon from "react-feather";
// import { searchChatAction } from "../../Store/Actions/searchChatAction";
import { mobileSidebarAction } from "../../Store/Actions/mobileSidebarAction";
import VideoCallModal from "../Modals/VideoCallModal"

function ChatHeader(props) {
  const dispatch = useDispatch();

  const {
    socket,
    openSearchSidebar,
    setOpenSearchSidebar,
    setOpenUserProfile,
    setOpenProfile,
    setOpenGroupProfile,
    openProfile,
    openGroupProfile,
    openUserProfile,
    setNameCall,
    setPCall,
    modalToggleCall,
    modalToggleVideo,
    chat_uid,
    id
  } = props;


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [p, setP] = useState("");

  const [tooltipOpenCall, setTooltipOpenCall] = useState(false);
  const [tooltipOpenVideo , setTooltipOpenVideo ] = useState(false);

  const tooltipToggleCall = () => setTooltipOpenCall(!tooltipOpenCall);

  const tooltipToggleVideo = () => setTooltipOpenVideo(!tooltipOpenVideo);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function RetrieveGroupName(data) {
    if (data.group.chat_uid == props.data.chat_uid) {
      setName(data.group.chat_name)
      setNameCall(data.group.chat_name)
    }
  }

  function RetrieveGroupPhoto(data) {
    if (data.group.chat_uid == props.data.chat_uid) {
      let chat_initial;
      let chat_name;
      if (data.group.groupphoto === "" || data.group.groupphoto === null) {
        chat_name = data.group.chat_name;
        chat_initial = chat_name.substring(0, 1);
        setP(
          <span className="avatar-title bg-info rounded-circle">
            {chat_initial}
          </span>
        );
        setPCall(
          <span className="avatar-title bg-info rounded-circle">
            {chat_initial}
          </span>
        );
      } else {
        setP(<img src={data.group.groupphoto} className="rounded-circle" alt="image" />);
        setPCall(<img src={data.group.groupphoto} className="rounded-circle" alt="image" />);
      }
    }
  }

  useEffect(() => {
    socket.on("retrieve group name", RetrieveGroupName);
    socket.on("retrieve group photo", RetrieveGroupPhoto);
    return () => {
      socket.off("retrieve group name", RetrieveGroupName);
      socket.off("retrieve group photo", RetrieveGroupPhoto);
    };
  });

  useEffect(() => {
    setName(props.data.name)
    setNameCall(props.data.name)
    let chat_initial;
    let chat_name;
    if (props.data.pphoto === "" || props.data.pphoto === null) {
      chat_name = props.data.name;
      chat_initial = chat_name.substring(0, 1);
      setP(
        <span className="avatar-title bg-info rounded-circle">
          {chat_initial}
        </span>
      );
      setPCall(
        <span className="avatar-title bg-info rounded-circle">
          {chat_initial}
        </span>
      );
    } else {
      setP(<img src={props.data.pphoto} className="rounded-circle" alt="image" />);
      setPCall(<img src={props.data.pphoto} className="rounded-circle" alt="image" />);
    }
  }, [props.data]);

  const openUserProfileToggler = (e) => {
    props.setUser({ id: props.id });
    setOpenUserProfile(!openUserProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
    }
    if (openSearchSidebar) {
      setOpenSearchSidebar(!openSearchSidebar);
    }
  };

  const GroupProfileAction = () => {
    props.setGroup({ id: props.chat_uid });
    setOpenGroupProfile(!openGroupProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openUserProfile) {
      setOpenUserProfile(!openUserProfile);
    }
    if (openSearchSidebar) {
      setOpenSearchSidebar(!openSearchSidebar);
    }
  };

  const OpenSearchBar = () => {
    setOpenSearchSidebar(!openSearchSidebar);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openUserProfile) {
      setOpenUserProfile(!openUserProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
    }
  };

  function ArchiveChat(chat_selected) {
    socket.emit("archived chat", { chat: chat_selected });
    socket.once("archived response", function () {
      socket.emit("get chats");
      socket.emit("get chats archived");
      props.setClicked([]);
    });
  }

  function CloseChat() {
    var element = document.getElementById("menu-hide");
    element.classList.remove("nav-hide");
    dispatch(mobileSidebarAction(true));

    //var element = document.getElementById("menu-hide");
    //document.body.classList.add("navigation-open");
    props.setClicked([]);
  }
  const handleVideo = (e) =>{
    modalToggleVideo();
    socket.emit('startCall',{chat_uid,id});
  }

  const handleCall = (e) =>{
    modalToggleCall();
    socket.emit('startVoiceCall',{chat_uid,id});
  }

  return (
    <div className="chat-header">
      <button onClick={CloseChat} className="hide-x-icon col-2">
        <a
          href="#/"
          className="btn text-danger"
        >
          <FeatherIcon.X />
        </a>
      </button>
      {props.data.chat_type == 1 ? (
        <button onClick={GroupProfileAction} className="chat-header-user col-4">
          <figure className="avatar auto-img-sm">{p}</figure>
          <div>
            <h5>{name}</h5>
          </div>
        </button>
      ) : (
        <button
          onClick={openUserProfileToggler}
          className="chat-header-user col-4"
        >
          <figure className="avatar auto-img-sm">{p}</figure>
          <div>
            <h5>{name}</h5>
          </div>
        </button>
      )}
      <div className="chat-header-action col-6">
        <ul className="list-inline">
          <li className="list-inline-item">
            <button onClick={OpenSearchBar} className="btn btn-outline-light">
              <FeatherIcon.Search />
            </button>
          </li>
          {/* <li className="list-inline-item d-xl-none d-inline">
            <button
              onClick={mobileMenuBtn}
              className="btn btn-outline-light mobile-navigation-button"
            >
              <FeatherIcon.Menu />
            </button>
          </li> */}
          <li className="list-inline-item">
            <button className="btn btn-outline-light text-success" onClick={handleCall} id="Tooltip-Voice-Call">
                <FeatherIcon.Phone/>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpenCall}
                target={"Tooltip-Voice-Call"}
                toggle={tooltipToggleCall}>
                Voice Call
            </Tooltip>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-outline-light text-success" onClick={handleVideo} id="Tooltip-Video-Call">
              <FeatherIcon.Video/>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpenVideo}
                target={"Tooltip-Video-Call"}
                toggle={tooltipToggleVideo}>
                Video Call
            </Tooltip>
          </li>
          <li
            className="list-inline-item"
            data-toggle="tooltip"
          >
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
              >
                <button className="btn btn-outline-light">
                  <FeatherIcon.MoreHorizontal />
                </button>
              </DropdownToggle>
              <DropdownMenu right>
                {props.data.chat_type == 1 ? (
                  <DropdownItem onClick={GroupProfileAction}>
                    Group Info.
                  </DropdownItem>
                ) : (
                  <DropdownItem onClick={openUserProfileToggler}>
                    Profile
                  </DropdownItem>
                )}
                <DropdownItem onClick={() => ArchiveChat(props.chat_uid)}>
                  Add to archive
                </DropdownItem>
                {/* <DropdownItem>Delete</DropdownItem> */}
                {/* <DropdownItem divider />
                <DropdownItem>Block</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChatHeader;