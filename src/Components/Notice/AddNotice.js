import React, {Component} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../../Stylesheets/Form-styles.css"
import {Col, Form, Row} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";

class AddNotice extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeNoticeSubject = this.handleChangeNoticeSubject.bind(this);
        this.handleChangeNoticeGrade = this.handleChangeNoticeGrade.bind(this);
        this.handleChangeNoticeTopic = this.handleChangeNoticeTopic.bind(this);
        this.handleChangeNoticeBody = this.handleChangeNoticeBody.bind(this);

        this.state = {
            noticeId: '',
            noticeSubject: '',
            noticeGrade: '',
            noticeTopic: '',
            noticeBody: '',
            grades: [],
            subjects: []
        }
    }

    componentDidMount() {
        this.getSubjectList();
    }

    handleSubmit(e) {
        e.preventDefault();

        const notices = {
            noticeId: this.state.noticeId,
            noticeSubject: this.state.noticeSubject,
            noticeGrade: this.state.noticeGrade,
            noticeTopic: this.state.noticeTopic,
            noticeBody: this.state.noticeBody
        }

        console.log(notices);

        axios.post('http://localhost:8080/Notice/', notices)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Conference added successfully!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error uploading!!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            });
    }


    handleChangeID(e) {
        this.setState({noticeId: e.target.value});
    }

    handleChangeNoticeSubject(e) {
        this.setState({noticeSubject: e.target.value});
    }

    handleChangeNoticeGrade(e) {
        this.setState({noticeGrade: e.target.value});

        axios.get(`http://localhost:8080/Subject/${e.target.value}`).then(
            response =>{
                this.setState({
                    subjects: response.data
                })
            }
        )
    }

    handleChangeNoticeTopic(e) {
        this.setState({noticeTopic: e.target.value});
    }

    handleChangeNoticeBody(e) {
        this.setState({noticeBody: e.target.value});
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
        return (
            <div>

                <p>NOTICE MANAGEMENT</p>
                <div className={"form-wrapper"}>
                    <div>
                        <h3>Add Notice</h3>
                    </div>

                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId={"formNoticeId"}>
                                <Form.Label>Notice ID</Form.Label>
                                <Form.Control type="text" placeholder="Notice ID"
                                              required
                                              isInvalid={false}
                                              onChange={this.handleChangeID}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter the notice ID.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId={"formNoticeGrade"}>
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Control as ={"select"} onChange={this.handleChangeNoticeGrade}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId={"formNoticeSubject"}>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control as ={"select"} onChange={this.handleChangeNoticeSubject}>
                                        {
                                            this.state.subjects.map(subject =>
                                                <option value={subject}>{subject}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Row>

                            <Form.Group controlId={"formNoticeTopic"}>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" name="Topic" placeholder="Notice topic"
                                              required isInvalid={false}
                                              onChange={this.handleChangeNoticeTopic} />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a topic.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId={"formNoticeBody"}>
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" name="Notice" placeholder="Type your notice here"
                                              required isInvalid={false}
                                              onChange={this.handleChangeNoticeBody} />
                                <Form.Control.Feedback type="invalid">
                                    Please type your notice.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className={"text-end"}>
                                <button type={"reset"} className={"reset-form-btn"}>Reset</button>
                                <button type={"submit"} className={"submit-form-btn"}>Add Notice</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNotice;

