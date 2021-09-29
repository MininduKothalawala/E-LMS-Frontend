import React, {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ClassroomDataService from "./ClassroomDataService";
import "../../Stylesheets/Form-styles.css"
import axios from "axios";
import moment from "moment";
import AuthenticationService from "../Login/AuthenticationService";

class AddClassroom extends Component{

    constructor(props){
        super(props);

        this.state = {
            classGrade: '',
            classSubject: '',
            grades: [],
            subjects: [],
            isDisabled: true,
            topic : '',
            description: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
            time : moment(new Date()).format("h:mm"),
            link: '',
            username  :'',
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined
        }
    }

    componentDidMount() {
        this.getSubjectList();

        const loggedUser = AuthenticationService.loggedUserName();
        this.setState({
            username: loggedUser
        });
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLecFileChange = (event) => {
        event.preventDefault();

        this.setState({
            lecFile: event.target.files
        })
    }

    handleTuteFileChange = (event) => {
        event.preventDefault();

        this.setState({
            tuteFile: event.target.files
        })
    }

    handleClassImgChange = (event) => {
        event.preventDefault();

        this.setState({
            classImg: event.target.files
        })
    }

    handleChangeClassGrade = (event) => {
        this.setState({classGrade: event.target.value});

        axios.get(`http://localhost:8080/Subject/${event.target.value}`).then(
            response =>{
                this.setState({
                    subjects: response.data,
                    isDisabled: false
                })
            }
        )
    }

    handleChangeClassSubject = (event) => {
        this.setState({classSubject: event.target.value});
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

    handleSubmit = (e) => {
        e.preventDefault();
        const grade = this.state.classGrade;
        const subject = this.state.classSubject;
        const topic = this.state.topic;
        const description = this.state.description;
        const date = this.state.date;
        const time = this.state.time;
        const link = this.state.link;
        const addedBy = this.state.username;

        const lecFile = this.state.lecFile[0];
        const tuteFile = this.state.tuteFile[0];
        const classImg = this.state.classImg[0];


        const formData = new FormData();
        formData.append('grade', grade)
        formData.append('subject', subject)
        formData.append('topic', topic)
        formData.append('description', description)
        formData.append('date', date)
        formData.append('time', time)
        formData.append('link', link)
        formData.append('addedBy', addedBy)
        formData.append('lecFile', lecFile)
        formData.append('tuteFile', tuteFile)
        formData.append('classImg', classImg)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        ClassroomDataService.addClassroom(formData, config)
            .then(res => {
                console.log(formData);
                console.log(res);

                if (res.status === 201) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Classroom has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })
    }

    clearData = () => {
        this.setState({
            id: -1,
            classGrade: '',
            classSubject: '',
            grades: [],
            subjects: [],
            topic : '',
            description: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
            time : moment(new Date()).format('HH:mm'),
            link: '',
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined,
            isDisabled: true
        })
    }

    render() {
        const {topic, description, date, time, link, username} = this.state;

        return (
            <div>

                <p>CLASSROOM MANAGEMENT</p>

                <div className={"form-wrapper"}>
                    <div>
                        <h3>Add Classroom</h3>
                    </div>

                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Form.Group as={Col} controlId={"classGrd"}>
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Select required onChange={this.handleChangeClassGrade}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId={"classSubject"}>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Text className="text-muted">
                                        &nbsp; (Enables after selecting a grade)
                                    </Form.Text>
                                    <Form.Select required onChange={this.handleChangeClassSubject} disabled={this.state.isDisabled}>
                                        {
                                            this.state.subjects.map(subject =>
                                                <option value={subject}>{subject}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group controlId={"classT"}>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control as={"input"} name={"topic"} placeholder={"Enter a topic"}  required
                                              value={topic} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"Desc"}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as={"textarea"} name={"description"} placeholder={"Enter a description"} required
                                              value={description} onChange={this.handleChange}/>
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId={"classDate"}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type={"date"} name={"date"}
                                                  required
                                                  value={date}
                                                  min={moment().format("YYYY-MM-DD")}
                                                  onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId={"classTime"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control name={"time"} type={"time"}
                                                  required
                                                  value={time}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                            </Row>

                            <Form.Group controlId={"classLink"}>
                                <Form.Label>Link</Form.Label>
                                <Form.Control name={"link"} type={"link"} placeholder={"Enter a link"}
                                              required
                                              value={link} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"classAdd"}>
                                <Form.Label>AddedBy</Form.Label>
                                <Form.Control name={"username"}
                                              disabled
                                              required
                                              value={username}
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"formLectureFile"}>
                                <Form.Label>Lecture</Form.Label>
                                <Form.Control type={"file"}
                                              name={"lecFile"}
                                              accept={".pptx, .ppt, .pdf"}
                                              onChange={this.handleLecFileChange}
                                              required />
                            </Form.Group>

                            <Form.Group controlId={"formTuteFile"}>
                                <Form.Label>Tute</Form.Label>
                                <Form.Control type={"file"}
                                              name={"tuteFile"}
                                              accept={".docx, .doc"}
                                              onChange={this.handleTuteFileChange}
                                              required />
                            </Form.Group>

                            <Form.Group controlId={"formImageFile"}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type={"file"}
                                              name={"classImg"}
                                              accept={".jpg, .jpeg, .png"}
                                              onChange={this.handleClassImgChange}
                                              required />
                            </Form.Group>

                            <div className={"text-end"}>
                                <button type={"reset"} className={"reset-form-btn"}>Reset</button>
                                <button type={"submit"} className={"submit-form-btn"}>Add Classroom</button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        )

    }


}
export default AddClassroom;