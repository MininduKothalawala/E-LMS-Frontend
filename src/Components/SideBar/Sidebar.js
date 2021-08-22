import React, {Component} from 'react';
import {Button, ListGroup, Offcanvas} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faThLarge} from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    handleSideBarOpen = () => {
        this.setState({
            show: true
        })
    }

    handleSideBarClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return(
            <div>
                <Button variant="light" onClick={this.handleSideBarOpen}>
                    <FontAwesomeIcon className={"mr-3"} icon={faBars}/>
                </Button>

                <Offcanvas show={this.state.show} onHide={this.handleSideBarClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>ELMS</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ListGroup defaultActiveKey="#link1" variant="flush">
                            <ListGroup.Item action href="/dashboard">
                                <FontAwesomeIcon className={"mr-3"} icon={faThLarge}/>
                                Dashboard
                            </ListGroup.Item>
                            <ListGroup.Item action href="/user">
                                Users
                            </ListGroup.Item>
                            <ListGroup.Item action href="/classroom">
                                Classroom
                            </ListGroup.Item>
                            <ListGroup.Item action href="/addClassroom">
                                Add Classroom
                            </ListGroup.Item>
                            <ListGroup.Item action href="/adminClassroomList">
                                Admin Classroom List
                            </ListGroup.Item>
                            <ListGroup.Item action href="/teacherClassroomList">
                                Teacher Classroom List
                            </ListGroup.Item>
                            <ListGroup.Item action href="/classListAdmin">
                                Class List-Admin
                            </ListGroup.Item>
                            <ListGroup.Item action href="/notice">
                                Notices
                            </ListGroup.Item>
                            <ListGroup.Item action href="/library">
                                Library
                            </ListGroup.Item>
                            <ListGroup.Item action href="/">
                                Home
                            </ListGroup.Item>
                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>


            </div>
        )
    }
}

export default Sidebar;