import React, {useEffect, useState} from 'react'
import {Modal, ModalBody} from 'reactstrap'
import * as FeatherIcon from 'react-feather'

function VideoCallModal(props) {

    const {name,pphoto,modal,setModal} = props

    
    const modalToggle = () => setModal(!modal);

    return (
        <div>
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