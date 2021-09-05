import React, {Component} from "react";
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import {Badge, Button, ButtonGroup, CloseButton, Col, Form, InputGroup, Modal, Row, Table} from "react-bootstrap";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLinkAlt, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faFilePdf} from "@fortawesome/free-regular-svg-icons";
import "../../Stylesheets/Admin-Tables-styles.css"
import Login from "../Login/Login";
import ClassroomDetailsAdmin from "./Classroom-Details-Admin";


class ClassroomListAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            classrooms: [],
            show: false
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/classroom/`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoDetails = (id) => {
        // set show:true so the modal box will be visible
        // set id to pass it to the next component through props,

        this.setState({
            id: id,
            show: true
        })
    }

    //Modal box
    showModalBox = () => {
        this.setState({show: true})
    }
    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
    }

    render() {
        return (
            <div>

                <p>CLASSROOM MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Classrooms</h3>
                    </div>
                    {/*<div className={"mb-2"}>*/}
                    {/*    <Row>*/}
                    {/*        <Col xl={5} lg={5}>*/}
                    {/*            <InputGroup>*/}
                    {/*                <InputGroup.Text bsPrefix={"input-search-icon"}>*/}
                    {/*                    <FontAwesomeIcon icon={faSearch}/>*/}
                    {/*                </InputGroup.Text>*/}
                    {/*                <Form.Control type="text"*/}
                    {/*                              placeholder="Search"*/}
                    {/*                              required*/}
                    {/*                              value={this.state.search}*/}
                    {/*                              onChange={this.handleSearchInput}/>*/}
                    {/*            </InputGroup>*/}
                    {/*        </Col>*/}
                    {/*        <Col className={"text-end"}>*/}
                    {/*            <button className={"filter-btn-guide"}>TEACHERS' GUIDE</button>*/}
                    {/*            <button className={"filter-btn-syllabus"}>SYLLABUS</button>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</div>*/}

                    <Table responsive bordered>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th>Grade</th>
                            <th>Subject</th>
                            <th>Topic</th>
                            <th className={"text-center"}>Date</th>
                            <th className={"text-center"}>Time</th>
                            <th className={"text-center"}>Added By</th>
                            <th className={"text-center"}>More Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.classrooms.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    this.state.classrooms.map(event =>
                                        <tr key={event.id}>
                                            <td>{event.grade}</td>
                                            <td>{event.subject}</td>
                                            <td>{event.topic}</td>
                                            <td className={"text-center"}>{moment(event.date).format('YYYY-MM-DD')}</td>
                                            <td className={"text-center"}>{event.time}</td>
                                            <td className={"text-center"}>
                                                <Badge bg={"success"} className={"user-badge"}>{event.addedBy}</Badge>
                                            </td>
                                            <td className={"text-center"}>
                                                <Button variant={"primary"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
                                                    <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>

                </div>


                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Classroom Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ClassroomDetailsAdmin classId={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}


            </div>
        )
    }
}
export default withRouter(ClassroomListAdmin);