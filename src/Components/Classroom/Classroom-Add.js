import React, {Component} from "react";
import {Accordion, Container} from "react-bootstrap";
import * as Swal from "sweetalert2";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import AddClassroom from "./Add-Classroom";
import ClassroomDataService from "./ClassroomDataService";

class ClassroomAdd extends Component {


    constructor(props){
        super(props);

         this.onChangeGrade = this.onChangeGrade.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeLec = this.onChangeLec(this);
        this.onChangeTute = this.onChangeTute(this);
        //this.handleLecFileChange = this.handleLecFileChange(this);
        this.handleTuteFileChange = this.handleTuteFileChange(this);
        this.handleClassImgChange = this.handleClassImgChange(this);
        // this.onChangeAddedBy = this.onChangeAddedBy(this);
        //this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:new Date(),
            time : '',
            link: '',
            addedBy :'',
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined,
            isChecked : false
        }
    }


    onChangeGrade(e){
        this.setState({
            grade : e.target.value
        });
    }

    onChangeSubject(e){
        this.setState({
            subject : e.target.value
        });
    }

    onChangeTopic(e){
        this.setState({
            topic : e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }

    onChangeDate(e){
        this.setState({
            date : e.target.value
        });
    }

    onChangeTime(e){
        this.setState({
            time : e.target.value
        });
    }

    onChangeLink(e){
        this.setState({
            link : e.target.value
        });
    }

    // onChangeAddedBy(e){
    //     this.setState({
    //         addedBy : e.target.value
    //     });
    // }

    handleToggle = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })

        console.log(this.state.isChecked)
    }

    // handleChange = (e) => {
    //     e.preventDefault();
    //
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // handleLecFileChange = (e) => {
    //     e.preventDefault();
    //
    //     this.setState({
    //         lecFile: e.target.files
    //     })
    // }

    // handleTuteFileChange = (e) => {
    //     e.preventDefault();
    //
    //     this.setState({
    //         tuteFile: e.target.files
    //     })
    // }
    //
    // handleClassImgChange = (event) => {
    //     event.preventDefault();
    //
    //     this.setState({
    //         classImg: event.target.files
    //     })
    // }

    onChangeLec(e){
        this.setState({
            lecFile : e.target.value
        });
    }

    onChangeTute(e){
        this.setState({
            tuteFile : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const grade = this.state.grade;
        const subject = this.state.subject;
        const topic = this.state.topic;
        const description = this.state.description;
        const date = this.state.date.format('YYYY-MM-DD');
        const time = this.state.time;
        const link = this.state.link;
        const addedBy = this.state.addedBy;

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
                    console.log("CREATED");

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Your files has been uploaded!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })
                    this.clearData();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error uploading!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            })
    }

    clearData = () => {
        this.setState({
            id: -1,
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:'',
            time : '',
            link: '',
            addedBy :new Date(),
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined
        })
    }

    render() {
        return (
            <div>

                            <h3>Add ClassroomMain</h3>

                            <form onSubmit = {this.handleSubmit}>

                                <div className = "form-group">
                                    <Row>

                                    <Col>
                                    <label>Grade</label>
                                        <select value={this.state.grade} onChange={this.onChangeGrade}>
                                            <option value="Grade 6">Grade 6</option>
                                            <option value="Grade 7">Grade 7</option>
                                            <option value="Grade 8">Grade 8</option>
                                            <option value="Grade 9">Grade 9</option>
                                        </select>

                                    </Col>



                                    <Col>
                                    <label>Subject</label>
                                        <select value={this.state.subject} onChange={this.onChangeSubject}>
                                            <option value="Science">Science</option>
                                            <option value="Maths">Maths</option>
                                            <option value="History">History</option>
                                            <option value="English">English</option>
                                        </select>

                                </Col>

                            </Row>
                                </div>
                                <br></br>


                                <div className = "form-group">
                                    <label>Topic  </label>
                                    <input type = "text"
                                           required
                                           className = "form-control"
                                           value = {this.state.topic}
                                           onChange = {this.onChangeTopic}
                                    />

                                </div>

                                <div className = "form-group">
                                    <label>Description : </label>
                                    <textarea
                                           required
                                           className = "form-control"
                                           value = {this.state.description}
                                           onChange = {this.onChangeDescription}
                                    />

                                </div>

                                <div className = "form-group">
                                    <label>Date : </label>
                                    <input type = "date"
                                           required
                                           className = "form-control"
                                           value = {this.state.date}
                                           onChange = {this.onChangeDate}
                                    />

                                </div>

                                <div className = "form-group">
                                    <label>Time : </label>
                                    <input type = "text"
                                           required
                                           className = "form-control"
                                           value = {this.state.time}
                                           onChange = {this.onChangeTime}
                                    />

                                </div>

                                <div className = "form-group">
                                    <label>Link : </label>
                                    <input type = "text"
                                           required
                                           className = "form-control"
                                           value = {this.state.link}
                                           onChange = {this.onChangeLink}
                                    />

                                </div>

                                <div className = "form-group">
                                    <label>Added By : </label>
                                    <input type = "text"
                                           required
                                           className = "form-control"
                                           value = {this.state.addedBy}
                                           onChange = {this.handleChange}
                                    />

                                </div>

                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            Upload Files
                                        </Accordion.Toggle>

                                                <Accordion.Collapse eventKey="0" key={"0"}>
                                                    <Card.Body>
                                                        <Container>
                                                            <Card.Text className={"text-muted"}>Upload Lecture</Card.Text>
                                                            <Form.Group controlId={"lectureFile"}>
                                                                <Form.File id={"lecUpload"} name={"lecFile"}
                                                                           accept={".doc, .docx"} required
                                                                           onChange={this.handleLecFileChange()}
                                                                />
                                                            </Form.Group>
                                                        </Container> <hr/>
                                                        <Container>
                                                            <Card.Text className={"text-muted"}>Upload a Tuite</Card.Text>
                                                            <Form.Group controlId={"tutorialFile"}>
                                                                <Form.File id={"tuteUpload"} name={"tuteFile"}
                                                                           accept={".doc, .docx"} required
                                                                           onChange={this.handleTuteFileChange()}
                                                                />
                                                            </Form.Group>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                    </Card>
                                </Accordion>

                                <div className = "form-group">
                                    <input type = "submit" value = "Add ClassroomMain" className = "btn-bill" />
                                </div>



                            </form>

            </div>

        )
    }
}
export default ClassroomAdd;