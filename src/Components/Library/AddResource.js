import React, {Component} from "react";
import Swal from "sweetalert2";
import LibraryDataService from "../Library/LibraryDataService";
import {Button, Card, Container, Form} from "react-bootstrap";

class AddResource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resource_type: 'choose',
            subject: 'choose',
            grade: 'choose',
            file: ''
        }
    }

    componentDidMount() { }

    onChangeHandler = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onFileChangeHandler = (event) => {
        event.preventDefault();

        this.setState({
            file: event.target.files
        })
    }

    validateDetails() {
        let isValid = false;

        const resource_type = this.state.resource_type;
        const subject = this.state.subject;
        const grade = this.state.grade;

        if (resource_type === 'choose') {

            Swal.fire({
                icon: 'warning',
                title: 'No Resource Type Selected',
                html: '<p>Please choose a resource type!</p>',
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })

        } else if (grade === 'choose') {

            Swal.fire({
                icon: 'warning',
                title: 'No Grade Selected',
                html: '<p>Please choose a grade!</p>',
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })

        } else if (subject === 'choose') {

            Swal.fire({
                icon: 'warning',
                title: 'No Subject Selected',
                html: '<p>Please choose a subject!</p>',
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })

        } else {
            isValid = true;
        }

        return isValid;

    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        //validate details
        let isDataValid = this.validateDetails();

        if ( isDataValid ) {

            const formData = new FormData();
            formData.append('resourceType', this.state.resource_type);
            formData.append('grade', this.state.grade);
            formData.append('subject', this.state.subject);
            formData.append('file', this.state.file[0]);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            //send to database
            LibraryDataService.addLibraryResource(formData, config)
                .then(res => {
                    console.log(res);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            html: '<p>Your file has been uploaded!!</p>',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        this.clearData();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            html: '<p>There was an error uploading!</p>',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })

        }


    }

    clearData = () => {
        this.setState({
            resource_type: 'choose',
            subject: 'choose',
            grade: 'choose',
            file: 'choose'
        })
    }

    render() {
        const {resource_type, subject, grade} = this.state;

        return (
            <div>
                <div>
                    <Container className={"my-5"}>
                        <Card>
                            <Card.Body>
                                <h1>Add Resource</h1>

                                <div>
                                    <Form onSubmit={this.onSubmitHandler}>

                                        <Form.Group controlId={"resource_type"}>
                                            <Form.Label>Resource Type</Form.Label>
                                            <Form.Select name={"resource_type"} required
                                                         value={resource_type} onChange={this.onChangeHandler}>
                                                <option value={"choose"}>Choose...</option>
                                                <option value={"syllabus"}>Syllabus</option>
                                                <option value={"guide"}>Teachers' Guide</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group controlId={"grade"}>
                                            <Form.Label>Grade</Form.Label>
                                            <Form.Select name={"grade"} required
                                                         value={grade} onChange={this.onChangeHandler}>
                                                <option value={"choose"}>Choose...</option>
                                                <option value={1}>Grade 1</option>
                                                <option value={2}>Grade 2</option>
                                                <option value={3}>Grade 3</option>
                                                <option value={4}>Grade 4</option>
                                                <option value={5}>Grade 5</option>
                                                <option value={6}>Grade 6</option>
                                                <option value={7}>Grade 7</option>
                                                <option value={8}>Grade 8</option>
                                                <option value={9}>Grade 9</option>
                                                <option value={10}>Grade 10</option>
                                                <option value={11}>Grade 11</option>
                                                <option value={12}>Grade 12</option>
                                                <option value={13}>Grade 13</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group controlId={"subject"}>
                                            <Form.Label>Subjects</Form.Label>
                                            <Form.Select name={"subject"} required
                                                         value={subject} onChange={this.onChangeHandler}>
                                                <option value={"choose"}>Choose...</option>
                                                <option value={"mathematics"}>Mathematics</option>
                                                <option value={"science"}>Science</option>
                                                <option value={"english"}>English</option>
                                                <option value={"buddhism"}>Buddhism</option>
                                                <option value={"history"}>History</option>
                                                <option value={"geography"}>Geography</option>
                                                <option value={"civics"}>Civics</option>
                                                <option value={"health"}>Health</option>
                                                <option value={"home science"}>Home Science</option>
                                                <option value={"art"}>Art</option>
                                                <option value={"dancing"}>Dancing</option>
                                                <option value={"western music"}>Western Music</option>
                                                <option value={"eastern music"}>Eastern Music</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group controlId={"resourceFile"}>
                                            <Container>
                                                <Card.Text className={"text-muted"}>Please upload your file
                                                    here</Card.Text>
                                                <Form.Control type={"file"} name={"file"}
                                                              accept={".pdf"} required
                                                              onChange={this.onFileChangeHandler}/>
                                            </Container>
                                        </Form.Group>

                                        <div className={"my-4"}>
                                            <Button variant="dark" type={"submit"}>Submit</Button>
                                        </div>

                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        )
    }

}

export default AddResource;