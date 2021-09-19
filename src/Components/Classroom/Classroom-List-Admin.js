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
import jsPDF from "jspdf";


class ClassroomListAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            classrooms: [],
            show: false,
            filterGrade: '',
            filterSubject:'',
            classGrade:'',
            grades: [],
            classSubject:'',
            subjects:[]
        }
    }
    componentDidMount() {
        this.refreshTable();
        this.getSubjectList();
    }

    refreshTable = () => {
        axios.get('http://localhost:8080/classroom/')
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getSubjectList = () =>{
        axios.get("http://localhost:8080/Subject/").then(
            response =>{
                this.setState({
                    grades: response.data
                })
            }
        )
    }

    gotoDetails = (id) => {
        // set show:true so the modal box will be visible
        // set id to pass it to the next component through props,

        this.setState({
            id: id,
            show: true
        })
    }

    filterChangeHandler = (e) =>{
        this.setState({filterGrade: e.target.value});

        axios.get(`http://localhost:8080/classroom/getbygrade/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    filterBySubject = (e) =>{
        this.setState({filterSubject: e.target.value});

        axios.get(`http://localhost:8080/classroom/getbysubject/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    ExportPdfReport = () => {

        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 60;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Monthly Classrooms";
        const headers = [["Classroom Id", "Grade", "Subject", "Topic", "Description", "Date", "Time", "AddedBy"]];

        const classrooms = this.state.classrooms.map(
            cls => [
                cls.id,
                cls.grade,
                cls.subject,
                cls.topic,
                cls.description,
                cls.date,
                cls.time,
                cls.addedBy

            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: classrooms
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("ClassroomListReport.pdf")
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
                    <div className={"mb-2"}>
                        <Row>
                            <Col xl={5} lg={5}>
                                <InputGroup>
                                    <InputGroup.Text bsPrefix={"input-search-icon"}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                                  placeholder="Search By Subject"
                                                  required
                                                  value={this.state.search}
                                                  onChange={this.filterBySubject}/>
                                </InputGroup>
                            </Col>
                            <Col className={"text-end"}>
                                <button className={"view-more-btn"} onClick={this.ExportPdfReport}>Generate Report</button>


                            </Col>
                            <Col className={"text-end"} xl={4} lg={4}>

                                {/*<Row>*/}
                                <Form.Group as={Col} controlId={"formClassroomGrade"}>
                                    <Form.Select onChange={this.filterChangeHandler}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                {/*    <Form.Group as={Col} controlId={"classSubject"}>*/}
                                {/*        <Form.Label>Subject</Form.Label>*/}
                                {/*        <Form.Text className="text-muted">*/}
                                {/*            &nbsp; (Enables after selecting a grade)*/}
                                {/*        </Form.Text>*/}
                                {/*        <Form.Select required onChange={this.handleChangeClassSubject} disabled={this.state.isDisabled}>*/}
                                {/*            {*/}
                                {/*                this.state.subjects.map(subject =>*/}
                                {/*                    <option value={subject}>{subject}</option>*/}
                                {/*                )*/}
                                {/*            }*/}
                                {/*        </Form.Select>*/}
                                {/*    </Form.Group>*/}
                                {/*</Row>*/}

                            </Col>
                        </Row>
                    </div>

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
export default ClassroomListAdmin;