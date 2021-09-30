import React, {Component} from "react";
import Swal from "sweetalert2";
import ClassroomDataService from "./ClassroomDataService";
import {Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

class ClassroomUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.classId,
            classGrade: '',
            classSubject: '',
            grades: [],
            subjects: [],
            grade: '',
            subject: '',
            topic: '',
            description: '',
            date: new Date(),
            time: '',
            link: '',
            addedBy: '',
            lec_filename: undefined,
            lec_fileId: undefined,
            tute_filename: undefined,
            tute_fileId: undefined,
            img_filename: undefined,
            img_fileId: undefined,
            isChecked: false,
            withFile: false


        }
    }

    handleChangeClassGrade = (event) => {
        this.setState({grade: event.target.value});
        console.log(event.target.value);
        this.setSubjectList(event.target.value);
    }

    setSubjectList = (grade) => {
        axios.get(`http://localhost:8080/Subject/${grade}`).then(
            response => {
                this.setState({
                    subjects: response.data,
                    isDisabled: false
                })
            }
        )
    }

    handleChangeClassSubject = (event) => {
        this.setState({subject: event.target.value});
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

    handleToggle = (event) => {
        this.setState({
            isChecked: event.target.checked
        })

        console.log(event.target.checked)
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

    componentDidMount() {
        this.getSubjectList();
        this.retrieveById();
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

    retrieveById = () => {
        axios.get(`http://localhost:8080/classroom/getbyid/` + this.state.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    id: response.data.id,
                    grade: response.data.grade,
                    subject: response.data.subject,
                    topic: response.data.topic,
                    description: response.data.description,
                    date: response.data.date,
                    time: response.data.time,
                    link: response.data.link,
                    addedBy: response.data.addedBy,
                    lec_filename: response.data.lec_filename,
                    lec_fileId: response.data.lec_fileId,
                    tute_filename: response.data.tute_filename,
                    tute_fileId: response.data.tute_fileId,
                    img_fileId: response.data.img_fileId,
                    img_filename: response.data.img_filename,
                })
                this.setSubjectList(response.data.grade);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleUpdate = (e) => {
        e.preventDefault();

        const id = this.state.id;
        const grade = this.state.grade;
        const subject = this.state.subject;
        const topic = this.state.topic;
        const description = this.state.description;
        const date = this.state.date;
        const time = this.state.time;
        const link = this.state.link;
        const addedBy = this.state.addedBy;

        const lecFile = this.state.lecFile;
        const tuteFile = this.state.tuteFile;
        const classImg = this.state.classImg;


        //update only description
        if (!this.state.isChecked) {
            console.log("UPDATING...");

            const formData = new FormData();

            formData.append('id', id)
            formData.append('grade', grade)
            formData.append('subject', subject)
            formData.append('topic', topic)
            formData.append('description', description)
            formData.append('date', date)
            formData.append('time', time)
            formData.append('link', link)
            formData.append('addedBy', addedBy)

            console.log(formData);

            ClassroomDataService.editClassroomWithoutFiles(formData)
                .then(res => {
                    if (res.status === 200) {

                        this.refreshTable();
                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Classroom details has been updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })


                    }
                })

        } else {
            // update all including files

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

            ClassroomDataService.editClassroomWithFiles(formData, config)
                .then(res => {
                    console.log(res);

                    if (res.status === 200) {
                        this.refreshTable();
                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Classroom details has been updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })

        }

    }


    render() {
        const {
            isChecked,
            grade,
            subject,
            topic,
            description,
            date,
            time,
            link,
            addedBy,
            lec_filename,
            tute_filename,
            img_filename
        } = this.state

        return (

            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Form onSubmit={this.handleUpdate}>

                        <Row>
                            <Form.Group as={Col} controlId={"classGrd"}>
                                <Form.Label>Grade</Form.Label>
                                <Form.Select required value={grade} onChange={this.handleChangeClassGrade}>
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
                                <Form.Select required value={subject} onChange={this.handleChangeClassSubject}
                                             disabled={this.state.isDisabled}>
                                    {
                                        this.state.subjects.map(subject =>
                                            <option value={subject}>{subject}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group>
                            <Form.Label>Topic</Form.Label>
                            <Form.Control as={"input"} name={"topic"} placeholder={"Enter a topic"} required
                                          value={topic} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"Desc"}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} name={"description"} placeholder={"Enter a description"}
                                          required
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
                                          value={addedBy}/>
                        </Form.Group>

                        <Form.Group controlId="togglebutton" className={"my-4"}>
                            <Form.Switch type="switch" name={"isChecked"} label="Update file"
                                         onChange={this.handleToggle}/>
                        </Form.Group>
                        {
                            isChecked ?
                                <>
                                    <Form.Group controlId={"formLectureFile"}>
                                        <Form.Label>Lecture</Form.Label>
                                        <div>{lec_filename}</div>
                                        <Form.Control type={"file"}
                                                      name={"lecFile"}

                                                      accept={".pptx, .ppt, .pdf"}
                                                      onChange={this.handleLecFileChange}
                                        />

                                    </Form.Group>
                                    <Form.Group controlId={"formTuteFile"}>
                                        <Form.Label>Tute</Form.Label>
                                        <div>{tute_filename}</div>
                                        <Form.Control type={"file"}
                                                      name={"tuteFile"}
                                                      accept={".docx, .doc"}
                                                      onChange={this.handleTuteFileChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={"formImageFile"}>
                                        <Form.Label>Image</Form.Label>
                                        <div>{img_filename}</div>
                                        <Form.Control type={"file"}
                                                      name={"classImg"}
                                                      accept={".jpg, .jpeg, .png"}
                                                      onChange={this.handleClassImgChange}
                                        />
                                    </Form.Group>
                                </> : ''
                        }

                        <div className={"text-end"}>
                            <button type={"submit"} className={"submit-form-btn"}>Update Classroom</button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>


        )
    }


}

export default ClassroomUpdate;