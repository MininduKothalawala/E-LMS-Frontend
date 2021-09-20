import React, {Component} from "react";
import axios from "axios";
import {Card, Row, Col, Badge, Modal, Form} from "react-bootstrap";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import "../../Stylesheets/Student-Teacher-UI-styles.css"
import ClassroomDetailsAdmin from "./Classroom-Details-Admin";
import ClassroomDetailsStudent from "./Classroom-Details-Student";


class ClassroomListStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            classrooms: [],
            show: false,
            grades: [],
            filterGrade: '',
            filterSubject:'',
            classGrade:'',

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
        const {classrooms} = this.state;
        return (
            <div className={"st-wrapper"}>
                <Row className={"st-title mx-0"}>
                    <Col className={"px-0"}>
                        <div className={"tab-title"}>CLASSROOMS</div>
                    </Col>

                    {/*--------------------------- Search ---------------------------*/}
                    <Col className={"px-0"} xl={3}>
                        <Form>
                            <Form.Group controlId={"formResourceGrade"}>
                                <Form.Select onChange={this.filterChangeHandler}>
                                    {
                                        this.state.grades.map(item =>
                                            <option value={item.grade} key={item.grade}>{item.grade}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {/*--------------------------- Card Deck ---------------------------*/}

                <Row>
                    {
                        classrooms.length === 0 ?
                            <div align="center">
                                <h4 className={"mt-3"}>No classes are available.</h4>
                            </div>

                            : [
                                this.state.classrooms.map(event =>

                                    <Col className={"mb-5"} key={event.id}>
                                        <Card className={"st-class-card"}
                                              onClick={() => this.gotoDetails(event.id)}>
                                            <Row className={"st-card-header"}>
                                                <Col className={"text-start"}>{event.subject}</Col>
                                                <Col className={"text-end"}>{event.grade}</Col>
                                            </Row>
                                            <Card.Img variant="top" className={"st-class-img"}
                                                      src={`http://localhost:8080/classroom/image/${event.img_fileId}`}

                                            />
                                            <Card.Body className={"px-3"}>
                                                <Card.Title className={"mb-2 st-card-title"}>{event.topic}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">By {event.addedBy}</Card.Subtitle>
                                                <Row className={"mx-0 st-card-footer"}>
                                                    <Col className={"px-0"}>
                                                        <Badge className={"st-card-badge"}>
                                                            <FontAwesomeIcon icon={faCalendarAlt}/> &nbsp; {moment(event.date).format("YYYY-MM-DD")}
                                                        </Badge>
                                                    </Col>
                                                    <Col className={"px-0 text-end"}>
                                                        <Badge className={"st-card-badge"}>
                                                            <FontAwesomeIcon icon={faClock}/> &nbsp; {event.time}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            ]
                    }
                </Row>


                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Classroom Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ClassroomDetailsStudent classId={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

            </div>

        )
    }
}
export default ClassroomListStudent;