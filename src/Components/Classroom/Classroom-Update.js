import React, {Component} from "react";
import Swal from "sweetalert2";
import ClassroomDataService from "./ClassroomDataService";
import {Accordion,Container,Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import pdf from "../../Assets/pdf.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import word from "../../Assets/word.svg";

class ClassroomUpdate extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: props.classId,
            classGrade: '',
            classSubject: '',
            grades: [],
            subjects: [],
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:new Date(),
            time : '',
            link: '',
            addedBy :'',
            lec_filename : undefined,
            lec_fileId : undefined,
            tute_filename : undefined,
            tute_fileId : undefined,
            img_filename: undefined,
            img_fileId : undefined,
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
            response =>{
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

    getSubjectList = () =>{
        axios.get("http://localhost:8080/Subject/").then(
            response =>{
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

    handleDownloadLec = (e, lec_filename, lec_fileId) => {
        e.preventDefault();

        ClassroomDataService.downloadLec(lec_fileId)
            .then(res => {
                console.log(res)
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.setAttribute('download', lec_filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
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
        axios.get(`http://localhost:8080/classroom/getbyid/`+this.state.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    id:response.data.id,
                    grade:response.data.grade,
                    subject:response.data.subject,
                    topic:response.data.topic,
                    description:response.data.description,
                    date:response.data.date,
                    time:response.data.time,
                    link:response.data.link,
                    addedBy:response.data.addedBy,
                    lec_filename:response.data.lec_filename,
                    lec_fileId : response.data.lec_fileId,
                    tute_filename:response.data.tute_filename,
                    tute_fileId : response.data.tute_fileId,
                    img_fileId : response.data.img_fileId,
                    img_filename : response.data.img_filename,
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
        const addedBy = this.state.username;

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
                .then( res => {
                    if (res.status === 200) {
                        console.log("UPDATED");

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            html: '<p>Your file has been uploaded!!</p>',
                            background: '#041c3d',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#60e004'
                        })


                        this.props.close();
                        this.refreshTable();
                    }
                })

        } else {
        // update all including files
       console.log("UPDATING FILE...");

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

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Your file has been uploaded!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })

                    this.props.close();
                    this.refreshTable();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error updating!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            })

        this.refreshTable();

        }

    }



    render() {

        const {isChecked,id, grade, subject, topic,description, date, time, link, addedBy, img_fileId, lec_fileId,lec_filename, tute_filename, tute_fileId, img_filename} = this.state

        return(


            <Card style={{border:'none'}}>
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
                                             <Form.Select required value={subject} onChange={this.handleChangeClassSubject} disabled={this.state.isDisabled}>
                                                 {
                                                   this.state.subjects.map(subject =>
                                                        <option value={subject}>{subject}</option>
                                                    )
                                                }
                                             </Form.Select>
                                         </Form.Group>
                        </Row>

                        <Form.Group >
                            <Form.Label >Topic</Form.Label>
                            <Form.Control  as={"input"} name={"topic"} placeholder={"Enter a topic"}  required
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
                                          value={addedBy}
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="togglebutton">
                            <Form.Switch type="switch" name={"isChecked"} label="Update file" onChange={this.handleToggle} />
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
                                </>: ''
                        }
                        {/*{*/}
                        {/*    isChecked ?*/}
                        {/*        <>*/}

                        {/*            <Accordion className={"my-4"} defaultActiveKey="0">*/}
                        {/*                <Card>*/}
                        {/*                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">*/}
                        {/*                        Upload*/}
                        {/*                    </Accordion.Toggle>*/}



                        {/*                            <Accordion.Collapse eventKey="0" key={"0"}>*/}
                        {/*                                <Card.Body>*/}
                        {/*                                    <Container>*/}
                        {/*                                        <Card.Text >Please upload a preview of the document*/}
                        {/*                                            here</Card.Text>*/}



                        {/*    <Card.Text >Please upload your document*/}
                        {/*        here</Card.Text>*/}


                        {/*                                    </Container>*/}
                        {/*                                </Card.Body>*/}
                        {/*                            </Accordion.Collapse>*/}


                        {/*                </Card>*/}
                        {/*            </Accordion>*/}
                        {/*        </> :''*/}
                        {/*}*/}

                        <div className={"text-end"}>
                            <button type={"reset"} className={"reset-form-btn"}>Reset</button>
                            <button type={"submit"} className={"submit-form-btn"}>Update Classroom</button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>





        )
    }


}
export default ClassroomUpdate;