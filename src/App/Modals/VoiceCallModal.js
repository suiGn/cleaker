import React, {useState} from 'react'
import {Modal, ModalBody} from 'reactstrap'
import * as FeatherIcon from 'react-feather'

function VoiceCallModal(props) {

    const {name,pphoto,modal,setModal,idCall,socket} = props

    const modalToggle = () => setModal(!modal);

    const handleReject = ()=>{
        modalToggle();
    }

    const handleCall = ()=>{
        modalToggle();

    }

    return (
        <Modal isOpen={modal} toggle={modalToggle} centered className="modal-dialog-zoom">
            <ModalBody>
                <div className="call">
                    <div>
                        <figure className="avatar avatar-xl mb-4">
                            {pphoto}
                        </figure>
                        <h4>{name} <span className="text-success">calling...</span></h4>
                        <div className="action-button">
                            <button type="button" onClick={handleReject}
                                    className="btn btn-danger btn-floating btn-lg"
                                    data-dismiss="modal">
                                <FeatherIcon.X/>
                            </button>
                            <button type="button" onClick={handleCall}
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
