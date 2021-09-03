import React, {useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import ManAvatar5 from "../../assets/img/man_avatar5.jpg"

function VoiceCallModal(props) {

    const {name,pphoto,modalCall,modalToggle} = props

    return (
        <Modal isOpen={modalCall} toggle={modalToggle} centered className="modal-dialog-zoom">
            <ModalBody>
                <div className="call">
                    <div>
                        <figure className="avatar avatar-xl mb-4">
                            {pphoto}
                        </figure>
                        <h4>{name} <span className="text-success">calling...</span></h4>
                        <div className="action-button">
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-danger btn-floating btn-lg"
                                    data-dismiss="modal">
                                <FeatherIcon.X/>
                            </button>
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-success btn-pulse btn-floating btn-lg">
                                <FeatherIcon.Phone/>
                            </button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default VoiceCallModal
