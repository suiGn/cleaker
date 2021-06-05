import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
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

  const nameRef = useRef();
  const aboutRef = useRef();
  const phoneRef = useRef();
  const inputFile = useRef(null);


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
                    {p}
                  </figure>
                </button>
                <div className="d-flex justify-content-center" style={{ paddingBottom: "30px"}}>
                  <div className="ml-3 mr-3">
                    <h7 style={{ position: "absolute",left: "15px"}}>Name</h7>
                    <div>
                      <h5
                       style={{ position: "relative",top: "20px"}}
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
                      <div className="border-none align-self-center"  style={{ position: "relative",left: "110px",bottom:" 25px"}}>
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
                  </div>
                </div>
                <div className="d-flex justify-content-center" style={{ paddingBottom: "30px"}}>
                  <div className="ml-3 mr-3">
                    <h7 style={{ position: "absolute",left: "15px"}}>About</h7>
                    <div>
                      <h5
                        style={{ position: "relative",top: "20px"}}
                        ref={aboutRef}
                        className={
                          openAboutEditable
                            ? "outline-none selected-input mb-1 pl-2 pr-2 pb-2 pt-2"
                            : "fake-border mb-1 pl-2 pr-2 pb-2 pt-2"
                        }
                        contentEditable={openAboutEditable}
                        onBlur={(e) => handleSetAbout(e)}
                      >
                        {about}
                      </h5>
                      <div className="border-none align-self-center"  style={{ position: "relative",left: "110px",bottom:" 25px"}}>
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
                </div>
                <div className="d-flex justify-content-center">
                  <div className="ml-3 mr-3">
                    <h7 style={{ position: "absolute",left: "15px"}}>Phone</h7>
                    <div>
                      <h5
                        style={{ position: "relative",top: "20px"}}
                        ref={phoneRef}
                        className={
                          openPhoneEditable
                            ? "outline-none selected-input text-muted mb-1 pl-2 pr-2 pb-2 pt-2"
                            : "fake-border mb-1 pl-2 pr-2 pb-2 pt-2"
                        }
                        contentEditable={openPhoneEditable}
                        onBlur={(e) => handleSetAbout(e)}
                      >
                        {phone}
                      </h5>
                      <div className="border-none align-self-center"  style={{ position: "relative",left: "110px",bottom:" 25px"}}>
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
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default Profile;