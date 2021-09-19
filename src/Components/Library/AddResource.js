import React, {Component} from "react";
import Swal from "sweetalert2";
import LibraryDataService from "../Library/LibraryDataService";
import {Form} from "react-bootstrap";
import "../../Stylesheets/Form-styles.css"

class AddResource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceId: -1,
            resource_type: '',
            subject: '',
            grade: '',
            file: '',
            subjectList: [],
            gradeList: [],
            isDisabled: true,
        }
    }

    componentDidMount() {
        this.setGradeList();
    }

    setGradeList = () => {
        LibraryDataService.fetchGradeList()
            .then( res => {
                this.setState({ gradeList: res.data })
            })
    }

    onChangeGradeHandler = (event) => {
        this.setState({
            grade: event.target.value
        });

        // retrieve subject list for each grade
        LibraryDataService.fetchSubjectListForGrade(event.target.value)
            .then( res => {
                console.log(res.data)
                this.setState({
                    subjectList: res.data,
                    isDisabled: false
                })
            })
    }

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

        if (resource_type === '') {

            Swal.fire({
                icon: 'warning',
                title: 'No Resource Type Selected',
                text: "Please choose a resource type!",
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })

        } else if (grade === '') {

            Swal.fire({
                icon: 'warning',
                title: 'No Grade Selected',
                text: "Please choose a grade!",
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })

        } else if (subject === '') {

            Swal.fire({
                icon: 'warning',
                title: 'No Subject Selected',
                text: "Please choose a subject!",
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

        if (isDataValid) {

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
                            text: "Your file has been uploaded!!",
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        this.clearData();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: "There was an error uploading!",
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
            resourceId: -1,
            resource_type: '',
            subject: '',
            grade: '',
            file: '',
            gradeList: '',
            isDisabled: true
        })
    }

    render() {
        const {resource_type, subject, grade, subjectList, gradeList, isDisabled} = this.state;

        return (
            <div>

                <p>LIBRARY MANAGEMENT</p>
                <div className={"form-wrapper"}>
                    <div>
                        <h3>Add Resource</h3>
                    </div>

                    <div>
                        <Form onSubmit={this.onSubmitHandler}>
                            <Form.Group controlId={"formResourceType"}>
                                <Form.Label>Resource Type</Form.Label>
                                <Form.Select name={"resource_type"}
                                             value={resource_type}
                                             required
                                             onChange={this.onChangeHandler}>
                                    <option >Choose...</option>
                                    <option value={"Syllabus"}>Syllabus</option>
                                    <option value={"Guide"}>Teachers' Guide</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId={"formResourceGrade"}>
                                <Form.Label>Grade</Form.Label>
                                <Form.Select name={"grade"}
                                             value={grade}
                                             required
                                             onChange={this.onChangeGradeHandler}>
                                    <option>Choose...</option>
                                    {
                                        gradeList.map(item =>
                                            <option value={item.grade} key={item.grade}>{item.grade}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId={"formResourceSubject"}>
                                <Form.Label>Subject</Form.Label>
                                <Form.Text className="text-muted">
                                    &nbsp; (Enables after selecting a grade)
                                </Form.Text>
                                <Form.Select name={"subject"}
                                             value={subject}
                                             required
                                             onChange={this.onChangeHandler}
                                             disabled={isDisabled}>
                                    <option>Choose...</option>
                                    {
                                        subjectList.map(subject =>
                                            <option value={subject}>{subject}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId={"formResourceFile"}>
                                <Form.Label>Please upload your file here</Form.Label>
                                <Form.Control type={"file"} name={"file"}
                                              accept={".pdf"}
                                              required
                                              onChange={this.onFileChangeHandler}/>
                            </Form.Group>

                            <div className={"text-end"}>
                                <button type={"reset"} className={"reset-form-btn"}>Reset</button>
                                <button type={"submit"} className={"submit-form-btn"}>Add Resource</button>
                            </div>

                        </Form>
                    </div>

                </div>
            </div>
        )
    }

}

export default AddResource;