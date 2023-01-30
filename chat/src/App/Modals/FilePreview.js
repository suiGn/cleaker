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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Feather icon
import * as FeatherIcon from "react-feather";

function FilePreview(props) {

    const{inputPreview,file} = props

    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    function Send(){
        modalToggle();
        /*const formData = new FormData();
        formData.append("myFile", file);
        const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
        };
        axios
        .post("/uploadpChatFile", formData, config)
        .then((response) => {
            props.onSubmit({
            text:  response.data.url,
            chat_uid: props.chat_uid,
            is_image: 1,
            is_file: 0,
            });
        })
        .catch((error) => {});*/
    }

    return (
        <div>
            <button
            className="btn btn-outline-light"
            onClick={modalToggle}
            id="Tooltip-Add-Friend"
            hidden
            ref={inputPreview}
            >
            </button>
            <Tooltip
            placement="bottom"
            isOpen={tooltipOpen}
            target={"Tooltip-Add-Friend"}
            toggle={tooltipToggle}
            >
            </Tooltip>
            <Modal
            className="modal-dialog-zoom"
            isOpen={modal}
            toggle={modalToggle}
            centered
            >
            <ToastContainer />
            <ModalHeader toggle={modalToggle}>
                Preview
            </ModalHeader>
            <div class="img-preview-container-header">
            <ModalBody>
                <div class="img-preview-container">
                    <img src={props.imgPreview} class="img-preview" alt="image"/>
                </div>
            </ModalBody>
            </div>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={Send}
                >
                Send
                </Button>
            </ModalFooter>
            </Modal>
        </div>);
    }

export default FilePreview;
