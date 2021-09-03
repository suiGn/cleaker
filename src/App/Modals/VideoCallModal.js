import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import WomenAvatar1 from "../../assets/img/women_avatar1.jpg"

function VideoCallModal(props) {

    const {name,pphoto,modalVideo,modalToggle} = props

    return (
        <Modal isOpen={modalVideo} toggle={modalToggle} centered className="modal-dialog-zoom call">
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
        </Modal>)
}

export default VideoCallModal
