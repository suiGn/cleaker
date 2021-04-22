import React, {useState} from 'react'
import {
    Modal,
    ModalBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    ModalHeader,
    Input,
    CustomInput,
    Collapse
} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import classnames from 'classnames'

function SettingsModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const [isOpenDiv, setIsOpenDiv] = useState(false);

    const toggleDiv = () => setIsOpenDiv(!isOpenDiv);

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom">
            <ModalHeader toggle={props.toggle}>
                <FeatherIcon.Settings className="mr-2"/> Settings
            </ModalHeader>
            <ModalBody>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '1'})}
                            onClick={() => {
                                toggle('1');
                            }}
                        >
                            Account
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '2'})}
                            onClick={() => {
                                toggle('2');
                            }}
                        >
                            Notification
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '3'})}
                            onClick={() => {
                                toggle('3');
                            }}
                        >
                            Security
                        </NavLink>
                    </NavItem>
                </Nav>
                <Form>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch1" name="customSwitch"
                                             label="Allow connected contacts" defaultChecked/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch2" name="customSwitch"
                                             label="Allow connected contacts" defaultChecked/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch3" name="customSwitch"
                                             label="Profile privacy" defaultChecked/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch4" name="customSwitch"
                                             label="Developer mode options"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch5" name="customSwitch"
                                             label="Two-step security verification" defaultChecked/>
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="2">
                            <FormGroup>
                                <CustomInput type="switch" id="notificationCustomSwitch1" name="customSwitch"
                                             label="Allow mobile notifications" defaultChecked/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="notificationCustomSwitch2" name="customSwitch"
                                             label="Notifications from your friends"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="notificationCustomSwitch3" name="customSwitch"
                                             label="Send notifications by email"/>
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="3">
                            <FormGroup>
                                <CustomInput type="switch" id="securityCustomSwitch1" name="customSwitch"
                                             label="Suggest changing passwords every month."/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="switch" id="securityCustomSwitch2" name="customSwitch"
                                             label="Let me know about suspicious entries to your account" defaultChecked/>
                            </FormGroup>
                            <Button color="light" className="mb-3" onClick={toggleDiv}>
                                <FeatherIcon.Plus className="mr-2"/>
                                Security Questions
                            </Button>
                            <Collapse isOpen={isOpenDiv}>
                                <FormGroup>
                                    <Input type="text" name="question1" id="question1" placeholder="Question 1"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="question1" id="answer1" placeholder="Answer 1"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="question2" id="question2" placeholder="Question 2"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="question2" id="answer2" placeholder="Answer 2"/>
                                </FormGroup>
                            </Collapse>
                        </TabPane>
                    </TabContent>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary">Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default SettingsModal
