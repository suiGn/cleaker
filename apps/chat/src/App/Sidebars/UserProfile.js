import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg";
import classnames from "classnames";
import ModalImage from "react-modal-image";
import ImagePreview from "../Modals/ImagePreview";

function UserProfile(props) {
  const { socket, openUserProfile, setOpenUserProfile, openProfile, 
    setOpenProfile, openGroupProfile, setOpenGroupProfile, setMedia,
    openMedia,setOpenMedia, media, setMediaProfileType,setMediaPreview,mediaPreview,my_uid,
    setFav, openFav, setOpenFav, favMedia, setFavMedia, setFavMediaName, setFavP} = props;

  const openUserProfileToggler = (e) => {
    setOpenUserProfile(!openUserProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
    }
    if(openMedia){
      setOpenMedia(!openMedia)
    }
  };
  

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebSite] = useState("");
  const [about, setAbout] = useState("");
  const [pphoto, setPphoto] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [p, setP] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoritesMedia, setFavoritesMedia] = useState([]);
  const [mediaImages, setMediaImages] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab("1")
    if(props.chat.id){
      props.user.chat_id = props.chat.id
    }
    socket.emit("ViewProfileUser", props.user);
  }, [props.user]);

  function RetrieveViewownprofile(data){
    var userData = data.usrprofile[0];
      if (userData) {
        let nameD = userData.name != "null" ? userData.name : "";
        let cityD = userData.city != "null" ? userData.city : "";
        let phoneD = userData.phone != "null" ? userData.phone : "";
        let aboutD = userData.about != "null" ? userData.about : "";
        let pphotoD = userData.pphoto != "null" ? userData.pphoto : "";
        let websiteD = userData.website != "null" ? userData.website : "";
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
          setFavP(
            <span className="avatar-title bg-info rounded-circle">
              {chat_initial}
            </span>
          );
        } else {
          setP(<img src={pphotoD} className="rounded-circle" alt="image" />);
          setFavP(<img src={pphotoD} className="rounded-circle" alt="image" />);
        }
        setMedia(data.files)
        let mediaImageArray = data.files.filter(function(item){
          return item.is_image
        })
        setMediaImages(mediaImageArray)
        let mediaPreviewArray = mediaImageArray? mediaImageArray.slice(0,4):[] 
        setMediaPreview(mediaPreviewArray)
        setFavorites(data.favorites)
        setFav(data.favorites)
        let i = 0;
        var favoritesMediaArray = data.favorites.filter(function(item){
            if(item.is_image){
              item.position = i
              i++
              return item
          }
        })
        setFavoritesMedia(favoritesMediaArray)
        setFavMedia(favoritesMediaArray)
        setName(nameD);
        setFavMediaName(nameD);
        setCity(cityD);
        setPhone(phoneD);
        setWebSite(websiteD);
        setAbout(aboutD);
        setPphoto(pphotoD);
      }
  }

  useEffect(() => {
    socket.on("retrieve viewProfileUser", RetrieveViewownprofile );
    return () => {
      socket.off("retrieve viewProfileUser", RetrieveViewownprofile);
    };
  }, [name]);

  function ViewMedia(e){
    setOpenUserProfile(!openUserProfile);
    setOpenMedia(!openMedia)
    setMediaProfileType(1)
  }

  function SearchInsideBody(id) {
    let lmt=0;
    let i=0;
    favorites.forEach((element) => {
      i++
      if(element.message_id == id ){
        lmt= i;
      }
    });
    lmt = lmt + 5
    socket.emit("get messages", {
      id: props.clicked.chat_uid,
      page: 1,
      inChat: true,
      limit: lmt,
      idSearch: id
    });
  }

  return (
    <div className={`sidebar-group ${openUserProfile ? "mobile-open" : ""} sidebar-profile sidebar-profile-group`}>
      <div className={openUserProfile ? "sidebar active" : "sidebar"}>
        <header>
          <span>Profile</span>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="#/"
                onClick={(e) => openUserProfileToggler(e)}
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
                <figure className="avatar user-profile mb-3">
                  {p}
                </figure>
                <h5 className="mb-1">{name}</h5>
                <small className="text-muted font-italic">
                  Last seen: Today
                </small>
                {
                    media.length>0? 
                    <div className="media-show-preview">
                      <div className="media-show-info">
                        <p>Media, links and docs</p>
                        <p className="media-show-arrow" onClick={(e) => ViewMedia(e)}> {media.length} <FeatherIcon.ArrowRight ></FeatherIcon.ArrowRight> </p>
                      </div>
                      <ul className="preview-list">
                        {mediaPreview.map((image, i) => (
                            <li>
                              <div>
                              <ImagePreview  classP={"mini-preview-container"}  file={image.file}
                               images={mediaImages} position={i} name={name} p={p}/>
                              </div>
                            </li>
                            ))}
                      </ul>
                    </div>:""
                  }
                <Nav tabs className="justify-content-center mt-5">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      About
                    </NavLink>
                  </NavItem>
                  {
                    favorites.length>0?
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle('2');
                        }}
                      >
                        Favorite Messages ( {favorites.length} )
                      </NavLink>
                    </NavItem>:""
                  }
                  {/*
                    files.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle('3');
                        }}
                      >
                        Files ( {files.length} )
                      </NavLink>
                    </NavItem>:""
                    */}
                </Nav>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="mt-4 mb-4">
                    <h6>About</h6>
                    <p className="text-muted">{about}</p>
                  </div>
                  <div className="mt-4 mb-4">
                    <h6>Phone</h6>
                    <p className="text-muted">{phone}</p>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Favorite Messages</span>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                    {favorites.map((message, i) => (
                        message.is_file?
                        "":
                        message.is_image?
                        <li onClick={() => SearchInsideBody(message.message_id)} className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                           <div class="messages-container">
                            <div id={message.message_id} className={"message-item"}>
                              <div className="message-avatar">
                                <div>
                                <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                                </div>
                              </div>
                              <div class="message-content position-relative img-chat">
                                  <div>
                                  <figure className="avatar img-chat">
                                    <ImagePreview file={message.file} images={favoritesMedia} position={message.position} name={name}/>
                                  </figure>
                                    <div className="word-break">{message.message}</div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                        </li>:
                        message.is_video?
                        <li onClick={() => SearchInsideBody(message.message_id)} className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                          <div class="messages-container">
                            <div id={message.message_id} className={"message-item"}>
                              <div className="message-avatar">
                                <div>
                                  <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                                </div>
                              </div>
                              <div class="message-content position-relative img-chat">
                                <div>
                                  <video className="video-container" controls>
                                      <source src={message.file} />
                                  </video>
                                  <div className="word-break">{message.message}</div>
                                </div>
                              </div>
                            </div>
                          </div> 
                        </li>:
                        message.ogDescription!=""?
                        <li onClick={() => SearchInsideBody(message.message_id)} className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                          <div className="messages-container">
                              <div className={"message-item padding-no-response " }>
                                <div className={"message-content position-relative message-content-media"}>
                                  <div className="message-response">
                                    <div>
                                      <div className="mini-preview-container mini-preview-container-url" style={{ backgroundImage: "url(" + message.ogImage + ")" }}>
                                      </div>
                                      <div className="word-break">{message.ogTitle}</div>
                                    </div>
                                  </div>
                                  <div className="word-break ">
                                  <a href={message.message} target="_blank"><p class="url-message">{message.message}</p></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </li>
                        :
                        <li onClick={() => SearchInsideBody(message.message_id)} className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                          <div class="messages-container">
                            <div id={message.message_id} className={"message-item"}>
                            <div className="message-avatar">
                              <div>
                                <h5>{message.u_id==my_uid.id?"Tu":message.name}</h5>
                              </div>
                            </div>
                              <div class="message-content position-relative img-chat">
                                <div className="word-break">{message.message}</div>
                              </div>
                            </div>
                          </div>
                        </li>
                      
                      ))
                    }
                    </ul>
                  </div>
                </TabPane>
                {/*<TabPane tabId="3">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Files</span>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                    {files.map((message, i) => (
                      <li className="list-group-item">
                        <ModalImage
                          small={message.file}
                          large={message.file}
                          alt="image"
                        />
                      </li>
                      ))
                    }
                    </ul>
                  </div>
                  </TabPane>*/}
              </TabContent>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;