// import React, {Component} from 'react';
// import {Card, Container, Row} from "react-bootstrap";
// import axios from "axios";
// import {faMapMarkerAlt, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
//
// class Notices extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             id: '',
//             notices: []
//         }
//     }
//
//     componentDidMount() {
//         axios.get(`http://localhost:8080/Notice/`)
//             .then(response => {
//                 console.log(response.data)
//                 this.setState({notices: response.data})
//
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//
//     // gotoDetails = (id) => {
//     //     this.props.history.push(`/conference/`+id)
//     // }
//
//     render() {
//         return(
//             <div >
//                 <Container>
//                     <div className={"conference-outer-div"}>
//                         {
//                             this.state.notices.length > 0 ?
//                                 [
//                                     <Row key={0} className={"conference-card-row"}>
//                                         {
//                                             this.state.notices.map(event =>
//
//                                                 <div className={"conference-card-col mb-4"} key={event.id}>
//                                                     <div className={"conference-card"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
//                                                         <div className={"text-center image-card"}>
//                                                             <img alt={"card-background-image"} width={300}/>
//                                                         </div>
//                                                         <div className={"conference-card-body"}>
//                                                             <h5 className={"text-center"}>{event.noticeTopic}</h5>
//                                                             <p className={"text-center"}> {event.noticeGrade}</p>
//                                                             <p className={"text-center"}>{event.noticeBody}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )
//                                         }
//                                     </Row>
//                                 ]
//                                 : <h1 className={"text-center my-5"}>No Notices Available</h1>
//                         }
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
// }
//
// export default Notices;

import React, {Component} from 'react';
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {faCalendarAlt, faMapMarkerAlt, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import "../../Stylesheets/Student-Teacher-UI-styles.css"

class Notices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            notices: [],
            grades: [],
            filterGrade: ''
        }
    }

    componentDidMount() {
        this.refreshNotices();
        this.getSubjectList();
    }

    refreshNotices = () =>{
        axios.get(`http://localhost:8080/Notice/`)
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    noticeFilterHandler = (e) =>{
        this.setState({filterGrade: e.target.value});

        axios.get(`http://localhost:8080/Notice/grade/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})
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


        render() {
        return(
            <div className={"st-wrapper"}>
                <Row className={"st-title mx-0"}>
                    <Col className={"px-0"}>
                        <div className={"tab-title"}>NOTICES</div>
                    </Col>

                    <Col className={"px-0"} xl={3}>
                        <Form.Group as={Col} controlId={"formNoticeGrade"}>
                            <Form.Select onChange={this.noticeFilterHandler}>
                                {
                                    this.state.grades.map(item =>
                                        <option value={item.grade}>{item.grade}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Button variant={"outline-success"}
                                onClick={this.refreshNotices}>
                            Clear Filter
                        </Button>
                    </Col>
                </Row>

                {/*--------------------------- Card Deck ---------------------------*/}
                { this.state.notices.length < 0 &&
                <div className={"no-data-text"}>
                    No notices are available.
                </div>
                }

                <Row>
                    {
                        this.state.notices.map(notice =>

                            <Col className={"mb-5"}>
                                <Card className={"st-class-card"}
                                      key={notice.id}>
                                    <Row className={"st-card-header"}>
                                        <Col className={"text-start"}>{notice.noticeSubject}</Col>
                                        <Col className={"text-end"}>{notice.noticeGrade}</Col>
                                    </Row>
                                    <Card.Body className={"px-3"}>
                                        <Card.Title className={"mb-2 st-card-title"}>{notice.noticeTopic}</Card.Title>
                                        <Card.Subtitle className="mb-2 pt-3 text-muted">{notice.noticeBody}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>

                        )
                    }
                </Row>

            </div>
        )
    }
}

export default Notices;
