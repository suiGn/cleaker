import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Feather icon
import * as FeatherIcon from "react-feather";

function AddFriendModal(props) {
  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [showSubmit, setShowSubmit] = useState(false);

  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

  const [email, setEmail] = useState("");
  const [findUsers, setfindUsers] = useState([]);
  const [validate, setValidate] = useState(null);
  function SearchUserByEmailOrUserName(e) {
    e.preventDefault();
    var input = email;
    setEmail("");
    props.socket.emit("SearchUserByEmailOrUsername", {
      email: input,
      usrname: input,
      my_uid: props.my_uid.id,
    });
    props.socket.once("retrive SearchUserByEmailOrUsername", (data) => {
      setfindUsers(data.users);
      if (data.validate === 1) {
        notifyFriend();
      } else if (data.validate === 2) {
        notifyDontExist();
      }
    });
    if (setfindUsers.length <= 1) {
      setError("No existe el usuario");
    }
    setShowSubmit(false);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
    if (e.target.value != "") setShowSubmit(true);
  }
  function AddUserContact(u_id) {
    props.socket.emit("AddContact", { u_id: u_id, message: description });
    props.socket.once("retrive Addcontact", (mssg) => {
      props.socket.emit("GetContacts");
      // modalToggle();
      setfindUsers([]);
    });
    notify();
  }

  const notify = () =>
    toast.success("Usuario agregado con éxito", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyDontExist = () =>
    toast.success("Nombre de usuario o correo no encontrado", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyFriend = () =>
    toast.success("Usuario ya es amigo", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // try {
  //   props.socket.emit("AddContact", { u_id: u_id });
  //   props.socket.once("retrive Addcontact", (mssg) => {
  //     props.socket.emit("GetContacts");
  //     // modalToggle();
  //     setfindUsers([]);
  //   });
  //   setResponse("Se agrego con éxito");
  // } catch {
  //   setError("Hubo un error favor de intentarlo nuevamente");
  // }
  // }

  return (
    <div>
      <button
        className="btn btn-outline-light"
        onClick={modalToggle}
        id="Tooltip-Add-Friend"
      >
        <FeatherIcon.UserPlus />
      </button>
      <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target={"Tooltip-Add-Friend"}
        toggle={tooltipToggle}
      >
        Add Contact
      </Tooltip>

      <Modal
        className="modal-dialog-zoom"
        isOpen={modal}
        toggle={modalToggle}
        centered
      >
        <ToastContainer />
        <ModalHeader toggle={modalToggle}>
          <FeatherIcon.UserPlus className="mr-2" /> Add Contacts
        </ModalHeader>
        <ModalBody>
          {/* {response ? (
            <div class="text-success mt-0">{response}</div>
          ) : (
            <div class="text-error mt-0">{error}</div>
          )} */}
          <p>Send invitations to contacts.</p>
          <Label for="email">Email addresses</Label>
          <Input type="text" name="email" id="email" onChange={handleEmail} />
          <FormGroup>
            <Label for="description">Invitation message</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <div>
            {findUsers && findUsers.length > 0 ? (
              findUsers.map((userf, index) => {
                return (
                  <li className="custom-modal-text">
                    {userf.name}
                    <button
                      type="button"
                      onClick={() => AddUserContact(userf.u_id)}
                      data-dismiss="modal"
                      className="btn btn-primary ml-5 mt-2"
                    >
                      Add
                    </button>
                  </li>
                );
              })
            ) : (
              <span></span>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {showSubmit ? (
            <Button color="primary" onClick={SearchUserByEmailOrUserName}>
              Search
            </Button>
          ) : (
            <Button
              color="primary"
              disabled
              onClick={SearchUserByEmailOrUserName}
            >
              Search
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddFriendModal;
