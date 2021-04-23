import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { profileAction } from "../../Store/Actions/profileAction";
import { mobileProfileAction } from "../../Store/Actions/mobileProfileAction";
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg";
import classnames from "classnames";
import axios from "axios";

function Profile(props) {
  const { socket } = props;
  const { openProfile } = props;
  const { setOpenProfile } = props;
  const { openUserProfile } = props;
  const { setOpenUserProfile } = props;
  const { openGroupProfile } = props;
  const { setOpenGroupProfile } = props;
  const dispatch = useDispatch();
  var userData;
  const { profileSidebar, mobileProfileSidebar } = useSelector(
    (state) => state
  );

  //const [activeTab, setActiveTab] = useState('1');
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebSite] = useState("");
  const [about, setAbout] = useState("");
  const [pphoto, setPphoto] = useState("");
  const [fileState, setFileState] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [p, setP] = useState("");
  const [openContentEditable, setOpenContentEditable] = useState(false);
  const [openAboutEditable, setOpenAboutEditable] = useState(false);
  const [openPhoneEditable, setOpenPhoneEditable] = useState(false);
  /*const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };*/
  const nameRef = useRef();
  const aboutRef = useRef();
  const phoneRef = useRef();
  const inputFile = useRef(null);

  const profileActions = (e, data) => {
    e.preventDefault();
    dispatch(profileAction(false));
    dispatch(mobileProfileAction(false));
  };

  const openProfileToggler = (e) => {
    setOpenProfile(!openProfile);
    if (openUserProfile) {
      setOpenUserProfile(!openUserProfile);
    }
    if (openGroupProfile) {
      setOpenGroupProfile(!openGroupProfile);
    }
  };

  useEffect(() => {
    socket.emit("ViewOwnProfile", props.user);
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
      setName(nameD);
      setCity(cityD);
      setPhone(phoneD);
      setWebSite(websiteD);
      setAbout(aboutD);
      setPphoto(pphotoD);
    }
  }

  useEffect(() => {
    socket.on("retrieve viewownprofile", RetrieveViewownprofile );
    return () => {
      socket.off("retrieve viewownprofile", RetrieveViewownprofile);
    };
  }, [name]);

  function addDefaultSrc(ev) {
    ev.target.src = WomenAvatar5;
  }

  function SaveProfile(e) {
    // e.preventDefault();
    if (name != "") {
      userData = {
        name: name,
        phone: phone,
        city: city,
        about: about ? about : "",
        website: website,
        id: props.user.id,
      };
      socket.emit("SaveOwnProfile", userData);
      socket.once("retrieve saveownprofile", function (data) {
        socket.emit("ViewOwnProfile", { id: data.u_id });
        socket.once("retrieve viewownprofile", ()=> {
          socket.emit("my_uid");
        })
      });
      socket.emit("my_uid");
    }
  }

  function SaveImg(e) {
    e.preventDefault();
    onFormSubmit(e);
  }

  const openContentEditableToggler = (save, e) => {
    if (save) {
      setOpenContentEditable(!openContentEditable);
      SaveProfile(e);
    } else {
      setOpenContentEditable(!openContentEditable);
    }
  };

  const openAboutEditableToggler = (save, e) => {
    if (save) {
      setOpenAboutEditable(!openAboutEditable);
      SaveProfile(e);
    } else {
      setOpenAboutEditable(!openAboutEditable);
    }
  };

  const openPhoneEditableToggler = (save, e) => {
    if (save) {
      setOpenPhoneEditable(!openPhoneEditable);
      SaveProfile(e);
    } else {
      setOpenPhoneEditable(!openPhoneEditable);
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

  function handleSetPhone(e) {
    e.preventDefault();
    setPhone(phoneRef.current.innerText);
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
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/uploadpPhoto", formData, config)
      .then((response) => {
        //alert("The file is successfully uploaded");
        socket.emit("ViewOwnProfile", { id: props.user.id });
        socket.once("retrieve viewownprofile", ()=> {
          socket.emit("my_uid");
        })
      })
      .catch((error) => {});
  }

  return (
    <div className={`sidebar-group ${openProfile ? "mobile-open" : ""} sidebar-profile`}>
      <div className={openProfile ? "sidebar active" : "sidebar"}>
        <header>
          <span>Profile</span>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="#/"
                onClick={(e) => openProfileToggler(e)}
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
                    {/* <img
                    onError={addDefaultSrc}
                    src={pphoto}
                    className="rounded-circle"
                    alt="avatar"
                  /> */}
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
                  {/*<NavItem>
                                        <NavLink
                                            className={classnames({active: activeTab === '2'})}
                                            onClick={() => {
                                                toggle('2');
                                            }}
                                        >
                                            Media
                                        </NavLink>
                                        </NavItem>*/}
                </Nav>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="mt-4 mb-4">
                    {/* <h6>About</h6>
                    <p className="text-muted">{about}</p> */}
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
                  <div className="mt-4 mb-4">
                    {/* <h6>Phone</h6>
                    <p className="text-muted">{phone}</p> */}
                    <div className="d-flex">
                      <div className="ml-3 mr-3">
                        <h6>Phone</h6>
                        <p
                          ref={phoneRef}
                          className={
                            openPhoneEditable
                              ? "outline-none selected-input text-muted mb-1 pl-2 pr-2 pb-2 pt-2"
                              : "fake-border text-muted mb-1 pl-2 pr-2 pb-2 pt-2"
                          }
                          contentEditable={openPhoneEditable}
                          onBlur={(e) => handleSetPhone(e)}
                        >
                          {phone}
                        </p>
                      </div>
                      <div className="border-none align-self-end">
                        {openPhoneEditable ? (
                          <Button
                            onClick={(e) => openPhoneEditableToggler(true, e)}
                            color="light"
                          >
                            <FeatherIcon.Save />
                          </Button>
                        ) : (
                          <Button
                            onClick={(e) => openPhoneEditableToggler(false, e)}
                            color="light"
                          >
                            <FeatherIcon.Edit />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-4 mb-4">
                    <h6>City</h6>
                    <p className="text-muted">{city}</p>
                  </div>
                  <div className="mt-4 mb-4">
                    <h6>Website</h6>
                    <p>
                      <a href="foo" className="text-muted">{website}</a>
                    </p>
                  </div> */}
                  {/*<div className="mt-4 mb-4">
                    <h6 className="mb-3">Social media accounts</h6>
                    <ul className="list-inline social-links">
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-facebook"
                          data-toggle="tooltip"
                          title="Facebook"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-twitter"
                          data-toggle="tooltip"
                          title="Twitter"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-dribbble"
                          data-toggle="tooltip"
                          title="Dribbble"
                        >
                          <i className="fa fa-dribbble"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-whatsapp"
                          data-toggle="tooltip"
                          title="Whatsapp"
                        >
                          <i className="fa fa-whatsapp"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-linkedin"
                          data-toggle="tooltip"
                          title="Linkedin"
                        >
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-google"
                          data-toggle="tooltip"
                          title="Google"
                        >
                          <i className="fa fa-google"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-behance"
                          data-toggle="tooltip"
                          title="Behance"
                        >
                          <i className="fa fa-behance"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="foo"
                          className="btn btn-sm btn-floating btn-instagram"
                          data-toggle="tooltip"
                          title="Instagram"
                        >
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 mb-4">
                    <h6 className="mb-3">Settings</h6>
                    <div className="form-group">
                      <div className="form-item custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch11"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customSwitch11"
                        >
                          Block
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-item custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked
                          id="customSwitch12"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customSwitch12"
                        >
                          Mute
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-item custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch13"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customSwitch13"
                        >
                          Get notification
                        </label>
                      </div>
                    </div>
                  </div> */}
                </TabPane>
                <TabPane tabId="2">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Recent Files</span>
                    <a href="foo" className="btn btn-link small">
                      <i data-feather="upload" className="mr-2"></i> Upload
                    </a>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item pl-0 pr-0 d-flex align-items-center">
                        <a href="foo">
                          <i className="fa fa-file-pdf-o text-danger mr-2"></i>{" "}
                          report4221.pdf
                        </a>
                      </li>
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

export default Profile;