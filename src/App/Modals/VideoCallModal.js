import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import WomenAvatar1 from "../../assets/img/women_avatar1.jpg"

function VideoCallModal(props) {

    const {name,pphoto} = props

    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <button className="btn btn-outline-light text-warning" onClick={modalToggle} id="Tooltip-Video-Call">
                <FeatherIcon.Video/>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Video-Call"}
                toggle={tooltipToggle}>
                Video Call
            </Tooltip>
            <Modal isOpen={modal} toggle={modalToggle} centered className="modal-dialog-zoom call">
                <ModalBody>
                    <div className="call">
                        <div>
                            <figure className="avatar avatar-xl mb-4">
                                {pphoto}
                            </figure>
                            <h4>{name} <span className="text-success">video calling...</span></h4>
                            <div className="action-button">
                                <button type="button" onClick={modalToggle}
                                        className="btn btn-danger btn-floating btn-lg"
                                        data-dismiss="modal">
                                    <FeatherIcon.X/>
                                </button>
                                <button type="button" onClick={modalToggle}
                                        className="btn btn-success btn-pulse btn-floating btn-lg">
                                    <FeatherIcon.Video/>
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default VideoCallModal
