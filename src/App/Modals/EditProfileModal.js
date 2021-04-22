import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  ModalHeader,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  CustomInput,
} from "reactstrap";
import * as FeatherIcon from "react-feather";
import classnames from "classnames";
import ManAvatar4 from "../../assets/img/man_avatar4.jpg";
import io from "socket.io-client";
import axios from "axios";

function EditProfileModal(props) {
    const {socket} =  props;
    const [activeTab, setActiveTab] = useState('1');
    var userData;
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebSite] = useState("");
    const [about, setAbout] = useState("");
    const [pphoto, setPphoto] = useState("");
    const [fileState, setFileState] = useState(null);
    const [p, setP] = useState("");

    useEffect(() => {   
        socket.emit('ViewOwnProfile2', props.userEdit); 
        socket.once('retrieve viewownprofile2', function (data) {
            userData = data.usrprofile[0];
            if(userData){
                setName(userData.name!="null"?userData.name:"");
                setCity(userData.city!="null"?userData.city:"");
                setPhone(userData.phone!="null"?userData.phone:"");
                setWebSite(userData.website!="null"?userData.website:"");
                setAbout(userData.about!="null"?userData.about:"");
                setPphoto(userData.pphoto!="null"?userData.pphoto:"");
                let chat_initial;
                let chat_name;
                if (userData.pphoto === "" || userData.pphoto === null) {
                chat_name = name;
                chat_initial = chat_name.substring(0, 1);
                    setP(
                        <span className="avatar-title bg-info rounded-circle">
                        {chat_initial}
                        </span>
                    );
                } else {
                    setP(<img src={userData.pphoto} className="rounded-circle" alt="image" />)
                }
            }
        });
    },[props.userEdit]);

  function SaveProfile(e) {
    e.preventDefault();
    if (fileState) {
      onFormSubmit(e);
    }
    if (name != "") {
      userData = {
        name: name,
        phone: phone,
        city: city,
        about: about ? about : "",
        website: website,
        id: props.userEdit.id,
      };
      socket.emit("SaveOwnProfile", userData);
      socket.once("retrieve saveownprofile", (data) =>{
        socket.emit("ViewOwnProfile", { id: data.u_id });
        socket.once("retrieve viewownprofile", ()=> {
            socket.emit("my_uid");
        })
      });
      props.toggle();
    }
  }
  function onChangePhoto(e) {
    setFileState(e.target.files[0]);
  }
  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", fileState);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/uploadpPhoto", formData, config)
      .then((response) => {
        //alert("The file is successfully uploaded");
      })
      .catch((error) => {});
  }

  function PreventSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        centered
        className="modal-dialog-zoom"
      >
        <ModalHeader toggle={props.toggle}>
          <FeatherIcon.Edit2 className="mr-2" /> Edit Profile
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Personal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                About
              </NavLink>
            </NavItem>
            {/*<NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '3'})}
                                onClick={() => {
                                    toggle('3');
                                }}
                            >
                                Social Links
                            </NavLink>
                            </NavItem>*/}
                    </Nav>
                    <Form>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <FormGroup>
                                    <Label for="fullname">Full Name</Label>
                                    <InputGroup>
                                        <Input type="text" name="fullname" id="fullname"  value={name}  onChange={(e) => setName(e.target.value)}/>
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={(e) => PreventSubmit(e)} color="light">
                                                <FeatherIcon.User/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="avatar">Avatar</Label>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <figure className="avatar mr-3 item-rtl">
                                                {/* <img src={pphoto} className="rounded-circle" alt="avatar"/> */}
                                                {p}
                                            </figure>
                                        </div>
                                        <CustomInput type="file" id="customFile" name="customFile" onChange={onChangePhoto}/>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <InputGroup>
                                        <Input type="text" name="city" id="city" placeholder="Ex: Columbia" value={city}  onChange={(e) => setCity(e.target.value)}/>
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={(e) => PreventSubmit(e)} color="light">
                                                <FeatherIcon.Target/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <InputGroup>
                                        <Input type="text" name="phone" id="phone" placeholder="(555) 555 55 55"  value={phone}  onChange={(e) => setPhone(e.target.value)}/>
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={(e) => PreventSubmit(e)} color="light">
                                                <FeatherIcon.Phone/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Website</Label>
                                    <InputGroup>
                                        <Input type="text" name="website" id="website" placeholder="https://"  value={website}  onChange={(e) => setWebSite(e.target.value)}/>
                                        <InputGroupAddon addonType="append">
                                            <Button  onClick={(e) => PreventSubmit(e)} color="light">
                                                <FeatherIcon.Link/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </TabPane>
                            <TabPane tabId="2">
                                <FormGroup>
                                    <Label for="about">Write a few words that describe you</Label>
                                    <Input type="textarea" name="about" id="about"  value={about}  onChange={(e) => setAbout(e.target.value)}/>
                                </FormGroup>
                            </TabPane>
                            <TabPane tabId="3">
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="facebook" id="facebook" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-facebook">
                                                <i className="fa fa-facebook"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="twitter" id="twitter" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-twitter">
                                                <i className="fa fa-twitter"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="instagram" id="instagram" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-instagram">
                                                <i className="fa fa-instagram"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="linkedin" id="linkedin" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-linkedin">
                                                <i className="fa fa-linkedin"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="dribbble" id="dribbble" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-dribbble">
                                                <i className="fa fa-dribbble"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="youtube" id="youtube" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-youtube">
                                                <i className="fa fa-youtube"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="google" id="google" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-google">
                                                <i className="fa fa-google"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input type="text" name="whatsapp" id="whatsapp" placeholder="Username"/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-whatsapp">
                                                <i className="fa fa-whatsapp"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </TabPane>
                        </TabContent>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => SaveProfile(e)}>Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditProfileModal;
