import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ClassroomDataService from "./ClassroomDataService";

class AddClassroom extends Component{

    constructor(props){
        super(props);

        // this.onChangeGrade = this.onChangeGrade.bind(this);
        // this.onChangeSubject = this.onChangeSubject.bind(this);
        // this.onChangeTopic = this.onChangeTopic.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
        // this.onChangeTime = this.onChangeTime.bind(this);
        // this.onChangeLink = this.onChangeLink.bind(this);
        // this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:'',
            time : '',
            link: '',
            addedBy :'',
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined,
            isChecked: false
        }
    }

    // componentDidMount() {
    //     const loggedUser = AuthenticationService.loggedUserId();
    //     this.setState({
    //         username: loggedUser
    //     });
    // }


    // onChangeGrade(e){
    //     this.setState({
    //         grade : e.target.value
    //     });
    // }
    //
    // onChangeSubject(e){
    //     this.setState({
    //         subject : e.target.value
    //     });
    // }
    //
    // onChangeTopic(e){
    //     this.setState({
    //         topic : e.target.value
    //     });
    // }
    //
    // onChangeDescription(e){
    //     this.setState({
    //         description : e.target.value
    //     });
    // }
    //
    // onChangeDate(e){
    //     this.setState({
    //         date : e.target.value
    //     });
    // }
    //
    // onChangeTime(e){
    //     this.setState({
    //         time : e.target.value
    //     });
    // }
    //
    // onChangeLink(e){
    //     this.setState({
    //         link : e.target.value
    //     });
    // }
    //
    // onChangeAddedBy(e){
    //     this.setState({
    //         addedBy : e.target.value
    //     });
    // }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleToggle = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })

        console.log(this.state.isChecked)
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

    handleSubmit = (e) => {
        e.preventDefault();
        const grade = this.state.grade;
        const subject = this.state.subject;
        const topic = this.state.topic;
        const description = this.state.description;
        const date = this.state.date;
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
            addedBy :'',
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined
        })
    }
    render() {
        const {grade, subject, topic, description, date, time, link, addedBy} = this.state;

        return (
            <div>
                <h1>Add Classroom</h1>

                <Card style={{border: 'none'}}>
                    <Card.Body className={"p-0"}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId={"classGrd"}>
                                <Form.Label>Grade</Form.Label>
                                <Form.Control as={"select"} name={"grade"} required
                                              value={grade} onChange={this.handleChange}>
                                    <option value={"Grade 6"}>Grade 6</option>
                                    <option value={"Grade 7"}>Grade 7</option>
                                    <option value={"Grade 8"}>Grade 8</option>
                                    <option value={"Grade 9"}>Grade 9</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={"classSub"}>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control as={"select"} name={"subject"} required
                                              value={subject} onChange={this.handleChange}>
                                    <option value={"Science"}>Science</option>
                                    <option value={"Maths"}>Maths</option>
                                    <option value={"Sinhala"}>Sinhala</option>
                                    <option value={"English"}>English</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={"classT"}>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control as={"input"} name={"topic"} placeholder={"Enter a Topic"} required
                                              value={topic} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"Desc"}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as={"textarea"} name={"description"} placeholder={"Enter a description"} required
                                              value={description} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"classDate"}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control as={"input"} name={"date"} type = {"date"} placeholder={"Enter a date"} required
                                              value={date} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"classTime"}>
                                <Form.Label>Time</Form.Label>
                                <Form.Control as={"input"} name={"time"} type = {"time"} placeholder={"Enter a time"} required
                                              value={time} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"classLink"}>
                                <Form.Label>Link</Form.Label>
                                <Form.Control as={"input"} name={"link"} type = {"link"} placeholder={"Enter a link"} required
                                              value={link} onChange={this.handleChange}/>
                            </Form.Group>



                            <Form.Group controlId={"classAdd"}>
                                <Form.Label>AddedBy</Form.Label>
                                <Form.Control as={"input"} name={"addedBy"} placeholder={"Enter a AddedBy"} required
                                              value={addedBy} onChange={this.handleChange}/>
                            </Form.Group>








                            <div className="custom-file">
                                <label>Lecture : </label>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    accept={".pptx, .ppt, .pdf"}
                                    onChange={this.handleLecFileChange}
                                    required={true}
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    {/*{this.state.imageName}*/}
                                </label>
                            </div>


                            <div className="custom-file">
                                <label>Tute : </label>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    accept={".docx, .doc"}
                                    onChange={this.handleTuteFileChange}
                                    required={true}
                                />
                            </div>

                            <div className="custom-file">
                                <label>Image : </label>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    accept={".jpg, .jpeg, .png"}
                                    onChange={this.handleClassImgChange}
                                    required={true}
                                />
                            </div>






                            <div >
                                <Button variant="primary" type={"submit"}>Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )

    }


}
export default AddClassroom;