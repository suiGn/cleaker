import React, { useState, useRef, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import ModalImage from "react-modal-image";
import * as FeatherIcon from "react-feather";
import VideoThumbnail from 'react-video-thumbnail';

function ProfileGroup(props) {
  const { 
  openUserProfile,setOpenUserProfile,openGroupProfile, setOpenGroupProfile,
  openMedia,setOpenMedia,setMediaProfileType, mediaProfileType } = props;
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const openMediaToggler = (e) => {
    toggle('1')
    setMediaProfileType(0)
    setOpenMedia(!openMedia)
    if (mediaProfileType==1) {
      setOpenUserProfile(!openUserProfile);
    }
    if(mediaProfileType==2){
      setOpenGroupProfile(!openGroupProfile)
    }
  };

  const [activeTab, setActiveTab] = useState("1");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    var imagesL =  props.media.filter((messages)=>{
      return messages.is_image
    })
    var videosL =  props.media.filter((messages)=>{
      return messages.is_video
    })
    var filesL =  props.media.filter((messages)=>{
      return messages.is_file 
    })
    setFiles(filesL)
    setImages(imagesL)
    setVideos(videosL)
  }, [props.media]);
  
  return (
    <div className={`sidebar-group ${openMedia ? "mobile-open" : ""}`}>
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
                <Nav tabs className="justify-content-center mt-5">
                  {
                    images.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle('1');
                        }}
                      >
                        Images ( {images.length} )
                      </NavLink>
                    </NavItem>:""
                    }
                    {
                    videos.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle('2');
                        }}
                      >
                        Videos ( {videos.length} )
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
                  <h6 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>Images</span>
                  </h6>
                  <div>
                    <ul className="list-group list-group-flush">
                      {images.map((message, i) => (
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
                          <a href={message.file} download>
                            <FeatherIcon.Download /> {"file "}
                          </a>
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

export default ProfileGroup;
