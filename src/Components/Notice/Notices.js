import React, {Component} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
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

    refreshNotices = () => {
        axios.get(`http://localhost:8080/Notice/`)
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    noticeFilterHandler = (e) => {
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

    getSubjectList = () => {
        axios.get("http://localhost:8080/Subject/").then(
            response => {
                this.setState({
                    grades: response.data
                })
            }
        )
    }


    render() {
        return (
            <div className={"st-wrapper"}>
                <Row className={"st-title mx-0"}>
                    <Col className={"px-0"}>
                        <div className={"tab-title"}>NOTICES</div>
                    </Col>
                    <Col>
                        <Row>
                            <Col className={"px-3 text-end"} >
                                <Form.Group as={Col} controlId={"formNoticeGrade"}>
                                    <Form.Select onChange={this.noticeFilterHandler}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade} key={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col className={"px-0 text-end"} xxl={3} xl={2} lg={5}>
                                <button className={"clear-filter-btn"}
                                        onClick={this.refreshNotices}>
                                    Clear Filter
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/*--------------------------- Card Deck ---------------------------*/}
                {this.state.notices.length < 0 &&
                <div className={"no-data-text"}>
                    No notices are available.
                </div>
                }

                <Row>
                    {
                        this.state.notices.map(notice =>

                            <Col className={"mb-5"} sm={4}>
                                <Card className={"st-notice-card"}
                                      key={notice.id}>
                                    <Row className={"st-card-header"}>
                                        <Col className={"text-start"}>{notice.noticeSubject}</Col>
                                        <Col className={"text-end"}>{notice.noticeGrade}</Col>
                                    </Row>
                                    <Card.Body className={"px-3"}>
                                        <Card.Title className={"mb-2 st-card-title"}>{notice.noticeTopic}</Card.Title>
                                        <Card.Subtitle
                                            className="mb-2 pt-3 text-muted">{notice.noticeBody}</Card.Subtitle>
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
