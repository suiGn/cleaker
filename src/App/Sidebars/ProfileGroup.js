import React, { useState, useRef, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button,
  Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,CustomInput
} from "reactstrap";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import axios from "axios";
import ModalImage from "react-modal-image";
import ProfileDropdown from "./ProfileDropDown.js";
import DeleteUserGroupModal from "../Modals/DeleteUserGroupModal";

function ProfileGroup(props) {
  const { socket, openUserProfile, setOpenUserProfile, openProfile,setOpenProfile, 
    openGroupProfile, setOpenGroupProfile, setMedia, media, openMedia, setOpenMedia,
    setMediaProfileType} = props;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const openGroupProfileToggler = (e) => {
    setOpenGroupProfile(!openGroupProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openUserProfile) {
      setOpenUserProfile(!openUserProfile);
    }
  };

  const [name, setName] = useState("");
  const [pphoto, setPphoto] = useState("");
  const [fileState, setFileState] = useState(null);
  const [about, setAbout] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [p, setP] = useState("");
  const [members, setMembers] = useState([]);
  const [openContentEditable, setOpenContentEditable] = useState(false);
  const [openAboutEditable, setOpenAboutEditable] = useState(false);
  const [openPhoneEditable, setOpenPhoneEditable] = useState(false);
  const nameRef = useRef();
  const aboutRef = useRef();
  const inputFile = useRef(null);
  const [modalFriend, setModalFriend] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const modalToggleFriend = () => setModalFriend(!modalFriend);
  const modalToggleDelete = () => setModalDelete(!modalDelete);
  const [chooseFriend, setChooseFriend] = useState([]);
  const [chooseFriendSearch, setChooseFriendSearch] = useState([]);
  const [my_uid, setUid] = useState("");
  const [addFriends, setAddFriends] = useState([]);
  const [ToDelete, setToDelete] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    setActiveTab("1")
    if(props.chat.id){
      props.group.chat_id = props.chat.id
    }
    socket.emit("GetGrupo", props.group);
  }, [props.group]);

  function RetrieveGetGrupo(data){
    var userData = data.chats[0];
    if (userData) {
      let nameD = userData.chat_name != "null" ? userData.chat_name : "";
      let pphotoD = userData.pphoto != "null" ? userData.groupphoto : "";
      let about_chatD = userData.about_chat != "null" ? userData.about_chat : "";
      let chat_initial;
      let chat_name;
      if (pphotoD === "" || pphotoD === null) {
        chat_name = nameD;
        chat_initial = chat_name.substring(0, 1);
        setP(
          <span className="avatar-title bg-info rounded-circle">
            {chat_initial}
          </span>
        );
      } else {
        setP(<img src={pphotoD} className="rounded-circle" alt="image" />);
      }
      setName(nameD);
      setAbout(about_chatD)
      setMembers(data.chats)
      setMedia(data.files)
    }
  }

  useEffect(() => {
    socket.on("retrieve GetGrupo", RetrieveGetGrupo );
    return () => {
      socket.off("retrieve GetGrupo", RetrieveGetGrupo);
    };
  }, [name]);

  function SaveProfile() {
    var groupData;
    if (name != "") {
      groupData = {
        chat_name: name,
        about_chat: about ? about : "",
        chat_uid: props.group.id,
      };
      socket.emit("SaveGroup", groupData);
      socket.once("retrive SaveGroup", function (data) {
        socket.emit("GetGrupo", { id: data.chat_uid });
        socket.once("retrieve GetGrupo", ()=> {
          socket.emit("get chats");
          if(props.clicked.chat_uid==data.chat_uid){
            socket.emit("get group name", {chat_uid:data.chat_uid});
          }
        })
      });
    }
  }

  function SaveImg(e) {
    e.preventDefault();
    onFormSubmit(e);
  }

  const openContentEditableToggler = (save, e) => {
    if (save) {
      setOpenContentEditable(!openContentEditable);
      SaveProfile();
    } else {
      setOpenContentEditable(!openContentEditable);
    }
  };

  const openAboutEditableToggler = (save, e) => {
    if (save) {
      setOpenAboutEditable(!openAboutEditable);
      SaveProfile();
    } else {
      setOpenAboutEditable(!openAboutEditable);
    }
  };

  function handleSetName(e) {
    e.preventDefault();
    setName(nameRef.current.innerText);
  }

  function handleSetAbout(e) {
    e.preventDefault();
    setAbout(aboutRef.current.innerText);
  }

  const openFileUploader = (event) => {
    inputFile.current.click();
  };

  function onChangePhoto(e) {
    setFileState(e.target.files[0]);
    SaveImg(e);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    formData.append("chat_uid",props.group.id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/uploadpPhotoGroup", formData, config)
      .then((response) => {
        socket.emit("GetGrupo", props.group);
        socket.once("retrieve GetGrupo", ()=> {
          socket.emit("get chats");
          if(props.clicked.chat_uid==props.group.id){
            socket.emit("get group photo", {chat_uid:props.group.id});
          }
        })
      })
      .catch((error) => {});
  }

  const MemberView = (props) => {
    const { chat } = props;
    const { key } = props;
    let p = "";
    let chat_initial = chat.name.substring(0, 1);
    if (chat.pphoto === "" || chat.pphoto === null) {
      p = (
        <span className="avatar-title bg-info rounded-circle">
          {chat_initial}
        </span>
      );
    } else {
      p = <img src={chat.pphoto} className="rounded-circle" alt="image" />;
    }
    return (
      <li className={ "list-group-item" }>
          <div>
            <div>
              <figure className="avatar">{p}</figure>
            </div>
            <div className="users-list-body">
              <div i={key}>
                <h5
                  i={key}
                >
                  {chat.name}
                </h5>
              </div>
              <div className="group-member-list-dropdown" style={{  position: "absolute", left: "220px"}}>
                <ProfileDropdown
                  chat={chat}
                  modalToggleDelete={modalToggleDelete}
                  modalDelete={modalDelete}
                  setToDelete={setToDelete}/>
              </div>
            </div>
          </div>
      </li>
    )
  }

  function ExitGroup(chat){
    var remove = 
    {
      chat_uid: props.group.id,
      u_id: props.my_uid.id
    }
    socket.emit("RemoveGroupMember", remove );
    socket.once("retrive RemoveGroupMember", function (data) {
      setOpenGroupProfile(!openGroupProfile);
      socket.emit("get chats");
      props.setClicked([]);
    });
  }

  function OpenModal(){
    socket.emit("get group contacts");
    socket.once("retrieve groups", (contacts)=>{
      var chats = contacts.chats.filter((chats)=>{
        return (
          !chats.user_chat.includes(contacts.my_uid) && chats.chat_type != 1
        );
      })
      var arrayMembers = chats.filter( function( item ) {
        for( var i=0, len=members.length; i<len; i++ ){
            if( members[i].user_chat == item.user_chat ) {
                return false;
            }
        }
        return true;
      });
      contacts.chats = chats;
      setUid(contacts.my_uid);
      setChooseFriend(arrayMembers);
      setChooseFriendSearch(arrayMembers);
      setModalFriend(!modalFriend);
    });
  }

  function ModifyList(status, item) {
    if (status) {
      var newFriends = addFriends;
      item.checked = true;
      newFriends.push(item);
      setAddFriends(newFriends);
    } else {
      item.checked = false;
      var newFriends = addFriends;
      var removedFriend = newFriends.filter((val) => {
        return !val.user_chat.includes(item.user_chat);
      });
      setAddFriends(removedFriend);
    }
  }

  function AddMembers(){
    if(addFriends.length>0){
      var add = 
      {
        chat_uid: props.group.id,
        addFriends: addFriends
      }
      socket.emit("AddToGroup", add);
      socket.once("retrieve AddToGroup", (data)=>{
        socket.emit("get chats");
        if(props.clicked.chat_uid==props.group.id){
          socket.emit("GetGrupo", props.group);
        }
        setModalFriend(!modalFriend);
      })
    }
  }

  function searchUser(wordToSearch) {
    setSearch(wordToSearch);
    if (wordToSearch.length){
      var resultSearch = chooseFriend.filter((val) => {
        if(val.name.toLowerCase().includes(wordToSearch.toLowerCase())){
          return val
        }
      })
      setChooseFriendSearch(resultSearch)
    }else{
      setChooseFriendSearch(chooseFriend)
    }
  }

  const ModalAddFriend = (props) => {
    return (
      <div>
        <Modal
          className="modal-dialog-zoom"
          isOpen={modalFriend}
          toggle={modalToggleFriend}
          centered
        >
          <ModalHeader toggle={modalToggleFriend}>
            <FeatherIcon.UserPlus className="mr-2" /> Add Contacts
          </ModalHeader>
          <ModalBody>
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search contacts"
                value={search}
                onChange={(e) => searchUser(e.target.value)}
              />
            </form>
            <PerfectScrollbar>
              <FormGroup>
                {chooseFriendSearch.map((item, i) => {
                  return (
                    <div style={{display: "flex"}}>
                      {item.checked ? (
                        <CustomInput
                          type="checkbox"
                          id={"customCheckbox" + i}
                          onChange={(e) => ModifyList(e.target.checked, item)}
                          defaultChecked
                        />
                      ) : (
                        <CustomInput
                          type="checkbox"
                          id={"customCheckbox" + i}
                          onChange={(e) => ModifyList(e.target.checked, item)}
                        />
                      )}
                      <div className="profile-image-holder rounded-circle mb-4">
                        <figure className="avatar">
                        {
                          (item.pphoto === "" || item.pphoto === null)?
                          <span className="avatar-title bg-info rounded-circle">
                          {item.name.substring(0, 1)}
                          </span>
                          :
                          <img src={item.pphoto} className="rounded-circle " alt="image" />
                        }
                        </figure>
                      </div>
                      <label>{item.name}</label>
                    </div>
                  );
                })}
                </FormGroup>
            </PerfectScrollbar>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => AddMembers()}>
              Submit
            </Button>
            <hr></hr>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  function ViewMedia(e){
    setOpenGroupProfile(!openGroupProfile);
    setOpenMedia(!openMedia)
    setMediaProfileType(2)
  }

  return (
    <div className={`sidebar-group ${openGroupProfile ? "mobile-open" : ""}`}>
      <div className={openGroupProfile ? "sidebar active" : "sidebar"}>
        <header>
          <span>Group Info.</span>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="#/"
                onClick={(e) => openGroupProfileToggler(e)}
                className="btn btn-outline-light text-danger sidebar-close"
              >
                <FeatherIcon.X />
              </a>
            </li>
          </ul>
        </header>
        <div className="sidebar-body">
          <PerfectScrollbar>
            <div className="pl-4 pr-4">
              <div className="text-center">
                <input
                  type="file"
                  id="imgupload"
                  ref={inputFile}
                  className="d-none"
                  onChange={onChangePhoto}
                />
                <button
                  onClick={openFileUploader}
                  className="profile-image-holder rounded-circle mb-4"
                >
                  <div className="overlay">
                    <FeatherIcon.Camera color="white" />
                    <p className="pt-1">Cambiar foto de perfil</p>
                  </div>
                  <figure className="avatar w-100 h-100 mb-3">
                    {p}
                  </figure>
                </button>
                <div className="d-flex justify-content-center">
                  <div className="ml-3 mr-3">
                    <h5
                      ref={nameRef}
                      className={
                        openContentEditable
                          ? "outline-none selected-input mb-1 pl-2 pr-2 pb-2 pt-2"
                          : "fake-border mb-1 pl-2 pr-2 pb-2 pt-2"
                      }
                      contentEditable={openContentEditable}
                      onBlur={(e) => handleSetName(e)}
                    >
                      {name}
                    </h5>
                  </div>
                  <div className="border-none align-self-center">
                    {openContentEditable ? (
                      <Button
                        onClick={(e) => openContentEditableToggler(true, e)}
                        color="light"
                      >
                        <FeatherIcon.Save />
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => openContentEditableToggler(false, e)}
                        color="light"
                      >
                        <FeatherIcon.Edit />
                      </Button>
                    )}
                  </div>
                </div>

                <small className="text-muted font-italic">
                  Last seen: Today
                </small>

                {
                  media.length>0? 
                  <div className="media-show"  onClick={(e) => ViewMedia(e)}>
                    Files ( {media.length} )
                  </div>:""
                }

                <Nav tabs className="justify-content-center mt-5">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "1",
                      })}
                    >
                      About
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="mt-4 mb-4">
                    <div className="d-flex">
                      <div className="ml-3 mr-3">
                        <h6>About</h6>
                        <p
                          ref={aboutRef}
                          className={
                            openAboutEditable
                              ? "outline-none selected-input text-muted mb-1 pl-2 pr-2 pb-2 pt-2"
                              : "fake-border text-muted mb-1 pl-2 pr-2 pb-2 pt-2"
                          }
                          contentEditable={openAboutEditable}
                          onBlur={(e) => handleSetAbout(e)}
                          >
                          {about}
                        </p>
                      </div>
                      <div className="border-none align-self-end">
                        {openAboutEditable ? (
                          <Button
                            onClick={(e) => openAboutEditableToggler(true, e)}
                            color="light"
                          >
                            <FeatherIcon.Save />
                          </Button>
                        ) : (
                          <Button
                            onClick={(e) => openAboutEditableToggler(false, e)}
                            color="light"
                          >
                            <FeatherIcon.Edit />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div> 
                  <div className="sidebar-body">
                    <PerfectScrollbar>
                    <li  onClick={(e) => OpenModal(e)} className="list-group-item">
                      <FeatherIcon.UserPlus/>
                        Add members
                      </li>
                      <ul className="list-group list-group-flush">
                      {members.map((chat, i) => (
                        <MemberView
                          chat={chat}
                          key={i}
                        />
                      ))}  
                      <li  onClick={(e) => ExitGroup(e)} className="list-group-item">
                      <FeatherIcon.LogOut />
                        Exit group
                      </li>
                      </ul>
                    </PerfectScrollbar>
                  </div>        
                </TabPane>
              </TabContent>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      <ModalAddFriend />
      <DeleteUserGroupModal
      socket={socket}
      modalToggleDelete={modalToggleDelete}
      modalDelete={modalDelete}
      ToDelete={ToDelete}
      setToDelete={setToDelete}/>
    </div>
  );
}

export default ProfileGroup;
