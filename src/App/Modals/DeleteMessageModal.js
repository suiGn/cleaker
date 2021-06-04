import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
} from "reactstrap";
import "emoji-mart/css/emoji-mart.css";
import * as FeatherIcon from "react-feather";

function DeleteMessageModal(props) {
  const { socket, deleteButton, messageToDelete } = props;

  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

  function DeleteMessage() {
    modalToggle();
    if (messageToDelete.message_user_uid != props.my_uid.id) {
      socket.emit("Delete message", { id: messageToDelete.message_id, to: true });
    } else {
      socket.emit("Delete message", { id: messageToDelete.message_id, to: false });
    }
    socket.emit("get messages", {
      id: props.chat_id,
      page: props.page,
      inChat: true,
      limit: props.limit,
    });
    socket.emit("get chats")
  }

  return (
    <div>
      <button
        ref={deleteButton} 
        className="btn btn-outline-light"
        onClick={modalToggle}
        id="Tooltip-Delete-Message"
        hidden="hidden"
      >
      <FeatherIcon.Users />
      </button>
      <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target={"Tooltip-Delete-Message"}
        toggle={tooltipToggle}
        hidden="hidden"
      >
      </Tooltip>
      <Modal
        className="modal-dialog-zoom"
        isOpen={modal}
        toggle={modalToggle}
        centered
      >
        <ModalBody>
            <div>¿Quieres eliminar este mensaje?</div>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-outline-light" onClick={modalToggle} style={{margin: "5px"}}>Cancelar</button>
            <button className="btn btn-outline-light" onClick={() => DeleteMessage()} style={{margin: "5px"}}>Eliminar para mi</button>
            { (messageToDelete.message_user_uid == props.my_uid.id)?
            <button className="btn btn-outline-light" onClick={() => DeleteMessage()} style={{margin: "5px"}}>Eliminar para todos</button>:""
            }
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteMessageModal;
