import React, { useState, useRef, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import ModalImage from "react-modal-image";

function ProfileGroup(props) {
  const { openUserProfile,setOpenUserProfile, openProfile, setOpenProfile,
          openGroupProfile, setOpenGroupProfile } = props;

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

  const [activeTab, setActiveTab] = useState("1");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setActiveTab("1")
    setFiles(props.media)
  }, [props.media]);
  
  return (
    <div className={`sidebar-group ${openGroupProfile ? "mobile-open" : ""}`}>
      <div className={openGroupProfile ? "sidebar active" : "sidebar"}>
        <header>
        </header>
        <div className="sidebar-body">
          <PerfectScrollbar>
            <div className="pl-4 pr-4">
              <div className="text-center">
                <Nav tabs className="justify-content-center mt-5">
                  {
                    files.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle('1');
                        }}
                      >
                        Images ( {files.length} )
                      </NavLink>
                    </NavItem>:""
                    }
                    {
                    files.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle('1');
                        }}
                      >
                        Videos ( {files.length} )
                      </NavLink>
                    </NavItem>:""
                    }
                    {
                    files.length>0?
                  <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle('1');
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
                <TabPane tabId="2">
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

export default ProfileGroup;
