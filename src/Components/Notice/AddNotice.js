import React, {Component} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../../Stylesheets/Form-styles.css"
import {Col, Form, Row} from "react-bootstrap";
import moment from "moment";

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
            enteredTime: '',
            grades: [],
            subjects: [],
            isDisabled: true
        }
    }

    componentDidMount() {
        this.getSubjectList();
        this.createNoticeId();
    }

    createNoticeId = () =>{
        axios.get("http://localhost:8080/Notice/id").then(
            response =>{
                this.setState({
                    noticeId: response.data
                })
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        const notices = {
            noticeId: this.state.noticeId,
            noticeSubject: this.state.noticeSubject,
            noticeGrade: this.state.noticeGrade,
            noticeTopic: this.state.noticeTopic,
            noticeBody: this.state.noticeBody,
            enteredDate: moment(new Date()).format("YYYY-MM-DD"),
            enteredTime: moment(new Date()).format("HH:mm:ss")
        }

        console.log(notices);

        axios.post('http://localhost:8080/Notice/', notices)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    this.clearData();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Notice has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error occurred!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
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
                    subjects: response.data,
                    isDisabled: false
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

    clearData = () => {
        this.setState({
            noticeId: '',
            noticeSubject: '',
            noticeGrade: '',
            noticeTopic: '',
            noticeBody: '',
            grades: [],
            subjects: [],
            isDisabled: true
        })
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
                                              disabled
                                              name={"noticeId"}
                                              value={this.state.noticeId}
                                              onChange={this.handleChangeID}/>
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId={"formNoticeGrade"}>
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Select required onChange={this.handleChangeNoticeGrade}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId={"formNoticeSubject"}>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Text className="text-muted">
                                        &nbsp; (Enables after selecting a grade)
                                    </Form.Text>
                                    <Form.Select required onChange={this.handleChangeNoticeSubject} disabled={this.state.isDisabled}>
                                        {
                                            this.state.subjects.map(subject =>
                                                <option value={subject}>{subject}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group controlId={"formNoticeTopic"}>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" name="noticeTopic" placeholder="Notice topic"
                                              required value={this.state.noticeTopic}
                                              onChange={this.handleChangeNoticeTopic} />
                            </Form.Group>

                            <Form.Group controlId={"formNoticeBody"}>
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" name="noticeBody" value={this.state.noticeBody} placeholder="Type your notice here"
                                              required
                                              onChange={this.handleChangeNoticeBody} />
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

