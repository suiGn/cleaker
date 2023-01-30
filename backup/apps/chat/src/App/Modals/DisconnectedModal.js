import React, {useEffect, useState} from 'react'
import {Button, Col, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {ReactComponent as DisconnectedSvg} from "../../assets/disconnected.svg";

function DisconnectedModal() {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" centered backdrop="static"
               className="modal-dialog-zoom">
            <ModalBody>
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <DisconnectedSvg/>
                        <p className="lead mt-5 text-center">Application disconnected</p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button color="success" size="lg"
                        onClick={toggle}>Reconnect</Button>{' '}
                <Button color="link" onClick={toggle}>Logout</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DisconnectedModal
