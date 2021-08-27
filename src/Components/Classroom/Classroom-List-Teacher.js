import React, {Component} from "react";
import axios from "axios";
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLinkAlt, faPrint, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../Stylesheets/Admin-Tables-styles.css"
import ClassroomDetailsTeacher from "./Classroom-Details-Teacher";


class ClassroomListTeacher extends Component {

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

    handleUpdate = (id) => {
        this.props.history.push(`/updateClassDetails/`+id)
        // this.handleShow()
    }

    render() {
        return (
            <div>

                <p>CLASSROOM MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Classrooms</h3>
                    </div>
                    <div className={"mb-2"}>
                        <Row>
                            <Col xl={5} lg={5}>
                                <InputGroup>
                                    <InputGroup.Text bsPrefix={"input-search-icon"}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                                  placeholder="Search"
                                                  required
                                                  value={this.state.search}
                                                  onChange={this.handleSearchInput}/>
                                </InputGroup>
                            </Col>
                            <Col className={"text-end"}>
                                <button className={"view-more-btn"}>Generate Report</button>
                            </Col>
                            <Col className={"text-end"} xl={4} lg={4}>
                                <Form>
                                    <Form.Group controlId={"formFilterGrade"}>
                                        <Form.Select>
                                            <option>Select grade</option>
                                            <option value={1}>Grade 1</option>
                                            <option value={2}>Grade 2</option>
                                            <option value={3}>Grade 3</option>
                                            <option value={4}>Grade 4</option>
                                            <option value={5}>Grade 5</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    <Table responsive bordered>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th className={"text-center"}>Grade</th>
                            <th className={"text-center"}>Subject</th>
                            <th className={"text-center"}>Topic</th>
                            <th className={"text-center"}>Date</th>
                            <th className={"text-center"}>Time</th>
                            <th className={"text-center"}>Action</th>
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
                                            <td className={"text-center"}>{event.grade}</td>
                                            <td className={"text-center"}>{event.subject}</td>
                                            <td className={"text-center"}>{event.topic}</td>
                                            <td className={"text-center"}>{moment(event.date).format('YYYY-MM-DD')}</td>
                                            <td className={"text-center"}>{event.time}</td>
                                            <td className={"text-center"}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
                                                        <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                                    </Button>
                                                    <Button variant={"warning"} key={event.id} onClick={() => this.handleUpdate(event.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} key={event.id} onClick={() => this.handleUpdate(event.id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/></Button>
                                                </ButtonGroup>

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
                        <ClassroomDetailsTeacher classId={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

            </div>
        )
    }
}
export default ClassroomListTeacher;