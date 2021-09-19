import React, {Component} from "react";
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

class EditNotice extends Component{
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeNoticeSubject = this.handleChangeNoticeSubject.bind(this);
        this.handleChangeNoticeGrade = this.handleChangeNoticeGrade.bind(this);
        this.handleChangeNoticeTopic = this.handleChangeNoticeTopic.bind(this);
        this.handleChangeNoticeBody = this.handleChangeNoticeBody.bind(this);

        this.state = {
            noticeId: props.noticeId,
            noticeSubject: '',
            noticeGrade: '',
            noticeTopic: '',
            noticeBody: '',
            enteredTime: '',
            grades: [],
            subjects: [],
            notice:'',
            isDisabled: true
        }
    }

    componentDidMount() {
        this.getSubjectList();
        this.getNoticeDetails();
    }

    handleSubmit(e) {
        e.preventDefault();

        const notices = {
            noticeId: this.state.noticeId,
            noticeSubject: this.state.noticeSubject,
            noticeGrade: this.state.noticeGrade,
            noticeTopic: this.state.noticeTopic,
            noticeBody: this.state.noticeBody,
            enteredTime: new Date().toLocaleString()
        }

        console.log(notices);

        axios.put('http://localhost:8080/Notice/', notices)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    this.clearData();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Notice has been updated!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })
                    this.setState({})

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

    getNoticeDetails = () =>{
        axios.get(`http://localhost:8080/Notice/${this.state.noticeId}`).then(
            response =>{
                //console.log(response);
                this.setState({
                    // notice: response.data,
                    noticeGrade: response.data.noticeGrade,
                    noticeSubject: response.data.noticeSubject,
                    noticeTopic: response.data.noticeTopic,
                    noticeBody: response.data.noticeBody
                })
            }
        )
    }

    handleChangeID(e) {
        this.setState({noticeId: e.target.value});
    }

    handleChangeNoticeSubject(e) {
        this.setState({noticeSubject: e.target.value});
    }

    handleChangeNoticeGrade(e) {
        this.setState({noticeGrade: e.target.value});

        axios.get(`http://localhost:8080/Subject/${this.state.noticeGrade}`).then(
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
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId={"formNoticeId"}>
                        <Form.Label>Notice ID</Form.Label>
                        <Form.Control type="text" placeholder="Notice ID"
                                      required
                                      disabled
                                      name={"noticeId"}
                                      value={this.state.noticeId}/>
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} controlId={"formNoticeGrade"}>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type="text" name="noticeGrade" placeholder="Notice Grade"
                                          required disabled value={this.state.noticeGrade}
                                          onChange={this.handleChangeNoticeTopic} />
                            {/*<Form.Select required value={this.state.noticeGrade} onChange={this.handleChangeNoticeGrade}>*/}
                            {/*    {*/}
                            {/*        this.state.grades.map(item =>*/}
                            {/*            <option value={item.grade}>{item.grade}</option>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</Form.Select>*/}
                        </Form.Group>

                        <Form.Group as={Col} controlId={"formNoticeSubject"}>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" name="noticeSubject" placeholder="Notice Subject"
                                          required disabled value={this.state.noticeSubject}
                                          onChange={this.handleChangeNoticeTopic} />
                            {/*<Form.Select required value={this.state.noticeSubject} onChange={this.handleChangeNoticeSubject}>*/}
                            {/*    {*/}
                            {/*        this.state.subjects.map(subject =>*/}
                            {/*            <option value={subject}>{subject}</option>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</Form.Select>*/}
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
                        <button type={"submit"} className={"submit-form-btn"}>Update Notice</button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default EditNotice;
