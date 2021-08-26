import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {Container, Card, Row, Image, Col, Form, Badge} from "react-bootstrap";
import "../../Stylesheets/Student-Teacher-UI-styles.css"
import cardImg from "../../Assets/404-Pages.jpg"
import {faCalendar, faCalendarAlt, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";


class ClassroomListStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            classrooms: []
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
        this.props.history.push(`/adminClassDetails/`+id)
    }

    render() {
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

                {/*--------------------------- Card Deck ---------------------------*/}
                { this.state.classrooms.length < 0 &&
                <div className={"no-data-text"}>
                    No classes are available.
                </div>
                }

                <Row>
                    {
                        this.state.classrooms.map(event =>

                            <Col className={"mb-5"}>
                                <Card className={"st-class-card"}
                                      key={event.id}
                                      onClick={() => this.gotoDetails(event.id)}>
                                    <Row className={"st-card-header"}>
                                        <Col className={"text-start"}>{event.subject}</Col>
                                        <Col className={"text-end"}>{event.grade}</Col>
                                    </Row>
                                    <Card.Img variant="top"
                                              src={cardImg}
                                        // src={event.classImg}
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
                    }
                </Row>

            </div>




            // <div >
            //     <Card>
            //     <Container>
            //
            //
            //         <div className={"conference-outer-div"}>
            //             {
            //                 this.state.classrooms.length > 0 ?
            //                     [
            //                         <Row key={0} className={"conference-card-row"}>
            //                             {
            //                                 this.state.classrooms.map(event =>
            //
            //                                     <div className={"conference-card-col mb-4"} key={event.id}>
            //                                         <div className={"conference-card"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
            //
            //                                             <div className={"text-center image-card"}>
            //                                                 <img alt={"card-background-image"} width={300}
            //                                                      src={event.classImg}/>
            //                                             </div>
            //                                             <div className={"conference-card-body"}>
            //                                                 <div><h5 className={"text-center"}>{event.grade}</h5>
            //                                                     <h5 className={"text-center"}>{event.subject}</h5></div>
            //
            //                                                <div><h2 className={"text-center"}> {event.topic}</h2></div>
            //                                                 <div><h4>By {event.addedBy}</h4></div>
            //                                               <div><p className={"text-center"}>Date : {event.date}</p>
            //                                                   <p className={"text-center"}>Time : {event.time}</p></div>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                 )
            //                             }
            //                         </Row>
            //                     ]
            //                     : <h1 className={"text-center my-5"}>No Classroom Available</h1>
            //             }
            //         </div>
            //
            //
            //     </Container>
            //     </Card>
            // </div>



        )
    }
}
export default withRouter(ClassroomListStudent);