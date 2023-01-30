import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {Button, Col, Modal, ModalBody, ModalFooter, Row} from "reactstrap"
import {ReactComponent as TourSvg} from "../../assets/tour.svg"
import {pageTourAction} from "../../Store/Actions/pageTourAction"

function TourModal() {

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const pageTourStart = () => {
        setModal(false);
        setTimeout(() => dispatch(pageTourAction(true)), 500)
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" centered
               className="modal-dialog-zoom">
            <ModalBody className="pt-5 text-center">
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <TourSvg/>
                        <p className="lead mt-5">Would you like to take a short page tour?</p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button color="primary" onClick={pageTourStart}>Start Tour</Button>{' '}
                <Button color="link" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default TourModal
