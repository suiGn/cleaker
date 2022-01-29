import React, { useState, useRef, useEffect } from "react";
import {
  TabContent, TabPane, Nav, NavItem, NavLink, CardImg, Row, Col
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import * as FeatherIcon from "react-feather";
import ImageModal from "../Modals/ImageModal";

function Media(props) {
  const {
    openUserProfile, setOpenUserProfile, openGroupProfile, setOpenGroupProfile,
    openMedia, setOpenMedia, setMediaProfileType, mediaProfileType, media } = props;
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  let dayN = 0;
  let monthN = 0;
  let yearN = 0;
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let yesterdayLabel = getDateLabel(yesterday);
  let todayLabel = getDateLabel(new Date());
  let actualLabelDate = "";
  let userID = ""

  const openMediaToggler = (e) => {
    setMediaProfileType(0)
    setOpenMedia(!openMedia)
    if (mediaProfileType == 1) {
      setOpenUserProfile(!openUserProfile);
    }
    if (mediaProfileType == 2) {
      setOpenGroupProfile(!openGroupProfile)
    }
  };

  const [activeTab, setActiveTab] = useState("1");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    var imagesL = media.filter((messages) => {
      return messages.is_image
    })
    var videosL = media.filter((messages) => {
      return messages.is_video
    })
    var filesL = media.filter((messages) => {
      return messages.is_file
    })
    var linksL = media.filter((messages) => {
      return messages.ogDescription!=""
    })
    setFiles(filesL)
    setImages(imagesL)
    setVideos(videosL)
    setLinks(linksL)
    if(imagesL.length>0)
    {
      toggle('1')
    }else if(videosL.length>0){
      toggle('2')
    }else if(filesL.length>0){
      toggle('3')
    }else if(linksL.length>0){
    toggle('4')
    }
   
  }, [props.media]);

  function getDateLabel(date) {
    let dateLabelDate =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dateLabelMonth =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let dateLabelYear = date.getFullYear();
    let dateLabel = dateLabelDate + "/" + dateLabelMonth + "/" + dateLabelYear;
    return dateLabel;
  }

  function getTodayLabel(dateLabel, message_user_uid) {
    if (dateLabel == yesterdayLabel) {
      dateLabel = "Ayer";
    } else if (dateLabel == todayLabel) {
      dateLabel = "Hoy";
    }

    if (actualLabelDate == dateLabel) {
      if (message_user_uid != userID) {
        userID = message_user_uid
        return (
          <br />
        );
      } else {
        return "";
      }
    } else {
      actualLabelDate = dateLabel;
      userID = message_user_uid
      return (
        <div
          className="message-item messages-divider sticky-top"
          data-label={actualLabelDate}
        ></div>
      );
    }
  }

  function getDateMessage(message){
    var dateM = new Date(message.time);
    const [month, day, year] = [dateM.getMonth(), dateM.getDate(), dateM.getFullYear()];
    if (year != 0) {
      yearN = yearN < year ? year : yearN
      monthN = monthN < month ? month : monthN
      dayN = dayN < day ? day : dayN
    }
    return dateM
  }

  return (
    <div className={`sidebar-group ${openMedia ? "mobile-open" : ""} sidebar-media`}>
      <div className={openMedia ? "sidebar active" : "sidebar"}>
        <header>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="#/"
                onClick={(e) => openMediaToggler(e)}
                className="btn btn-outline-light sidebar-close"
              >
                <FeatherIcon.ArrowLeft />
              </a>
            </li>
          </ul>
        </header>
        <div className="sidebar-body">
          <PerfectScrollbar>
            <div className="pl-4 pr-4">
              <div className="text-center">
                <Nav tabs className="justify-content-center">
                  {
                    images.length > 0 ?
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggle('1');
                          }}
                        >
                          Images
                      </NavLink>
                      </NavItem> : ""
                  }
                  {
                    videos.length > 0 ?
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggle('2');
                          }}
                        >
                          Videos
                      </NavLink>
                      </NavItem> : ""
                  }
                  {
                    files.length > 0 ?
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggle('3');
                          }}
                        >
                          Files
                      </NavLink>
                      </NavItem> : ""
                  }
                  {
                    links.length > 0 ?
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle('4');
                        }}
                      >
                        Links
                    </NavLink>
                    </NavItem> : ""
                  }
                </Nav>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Images</span>
                  </h6>
                  <div className="flex-container" >
                    <ul class="flex-container wrap" style={{ cursor: "pointer",width:"100%"}}>
                      {images.map((message, i) => (
                        <li class="flex-item">
                          <ImageModal file={message.file} images={images} position={i}/>
                        </li>
                      ))
                      }
                    </ul>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Videos</span>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                      {videos.map((message, i) => (
                        <li className="list-group-item">
                          <video className="video-container" controls>
                            <source src={message.file} />
                          </video>
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
                          <div className="messages-container">
                            {getTodayLabel(getDateLabel(getDateMessage(message)), message.message_id)}
                            <div className={"message-item padding-no-response " }>
                              <div className={"message-content position-relative message-content-media"}>
                                <div className="word-break ">
                                <a href={message.file} download>
                                  <FeatherIcon.File /> {message.file.replace("https://bucketeer-506dd049-2270-443e-b940-ab6a2c188752.s3.amazonaws.com/","")}
                                </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                      }
                    </ul>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Links</span>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                      {links.map((message, i) => (
                        <li className="list-group-item">
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

export default Media;
