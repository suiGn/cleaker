import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg";
import classnames from "classnames";
import ModalImage from "react-modal-image";

function UserProfile(props) {
  const { socket } = props;
  const { openUserProfile } = props;
  const { setOpenUserProfile } = props;
  const { openProfile } = props;
  const { setOpenProfile } = props;
  const { openGroupProfile } = props;
  const { setOpenGroupProfile } = props;

  const openUserProfileToggler = (e) => {
    setOpenUserProfile(!openUserProfile);
    if (openProfile) {
      setOpenProfile(!openProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
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
  const [files, setFiles] = useState([]);

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
        } else {
          setP(<img src={pphotoD} className="rounded-circle" alt="image" />);
        }
        setFiles(data.files)
        setFavorites(data.favorites)
        setName(nameD);
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

  function addDefaultSrc(ev) {
    ev.target.src = WomenAvatar5;
  }

  return (
    <div className={`sidebar-group ${openUserProfile ? "mobile-open" : ""} sidebar-profile`}>
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
                  {
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
                    }
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
                      <li className="list-group-item pl-0 pr-0 d-flex align-items-center fav-message">
                          {message.message}
                      </li>
                      ))
                    }
                    </ul>
                  </div>
                </TabPane>
                <TabPane tabId="3">
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
                </TabPane>
              </TabContent>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
