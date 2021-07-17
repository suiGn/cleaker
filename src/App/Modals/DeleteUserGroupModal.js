import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import "emoji-mart/css/emoji-mart.css";
import * as FeatherIcon from "react-feather";

function DeleteUserGroupModal(props) {
  
  const { socket, deleteButton, ToDelete, modalToggleDelete , modalDelete, setToDelete } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

  function RemoveMember(){
    var remove = 
    {
      chat_uid: ToDelete.chat_uid,
      u_id: ToDelete.user_chat
    }
    socket.emit("RemoveGroupMember", remove );
    socket.once("retrive RemoveGroupMember", function (data) {
      socket.emit("GetGrupo", {id:ToDelete.chat_uid});
      modalToggleDelete(!modalDelete)
    });
  }


  return (
    <div>
      <button
        ref={deleteButton} 
        className="btn btn-outline-light"
        onClick={modalToggleDelete}
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
        isOpen={modalDelete}
        toggle={modalToggleDelete}
        centered
      >
        <ModalBody>
            <div>¿Quieres eliminar este usuario?</div>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-outline-light" onClick={modalToggleDelete} style={{margin: "5px"}}>Cancelar</button>
            <button className="btn btn-outline-light" onClick={() => RemoveMember()} style={{margin: "5px"}}>Eliminar del grupo</button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteUserGroupModal;
