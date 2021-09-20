import React, {Component} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import LibraryDataService from "./LibraryDataService";
import {faArrowCircleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TeachersGuideLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libraries: [],
            isDisabled: true,
            grade:'',
            gradelist: [],
            subjectList: []
        }
    }

    componentDidMount() {
        this.getResources();
        this.setGradeList();
    }

    getResources = () => {
        LibraryDataService.filterByType("Guide")
            .then(res => {
                console.log(res.data)
                this.setState({
                    libraries: res.data
                })
            })
    }

    downloadResource = (e, fileId, fileName) => {
        e.preventDefault();

        LibraryDataService.downloadResource(fileId)
            .then(res => {
                console.log(res)
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    }

    setGradeList = () => {
        LibraryDataService.fetchGradeList()
            .then( res => {
                this.setState({ gradelist: res.data })
            })
    }

    onChangeGradeHandler = (event) => {
        const grade = event.target.value

        if (grade === "all") {
            this.getResources();
        } else {
            // set subject list
            LibraryDataService.fetchSubjectListForGrade(grade)
                .then( res => {
                    this.setState({
                        subjectList: res.data,
                        isDisabled: false,
                        grade: grade
                    })
                })

            // get filtered resources
            this.filterResourcesByGrade(grade);
        }

    }

    onChangeSubjectHandler = (event) => {
        const subject = event.target.value

        if (subject === "all") {
            this.filterResourcesByGrade(this.state.grade);
        } else {
            // get filtered resources
            this.filterResourcesBySubject(this.state.grade, subject);
        }
    }

    filterResourcesByGrade = (grade) => {
            LibraryDataService.searchResource(grade)
                .then( res => {
                    console.log(res.data)

                    if ( res.data && res.data.length > 0) {
                        this.setState({
                            libraries: res.data
                        })
                    } else {
                        this.setState({
                            libraries: []
                        })
                    }
                })
    }

    filterResourcesBySubject = (grade, subject) => {
        LibraryDataService.filterByGradeAndSubject(grade, subject)
            .then( res => {
                console.log(res.data)

                if ( res.data && res.data.length > 0) {
                    this.setState({
                        libraries: res.data
                    })
                } else {
                    this.setState({
                        libraries: []
                    })
                }
            })
    }

    render() {
        return (
            <div className={"st-wrapper"}>
                <Row className={"st-title mx-0"}>
                    <Col className={"px-0"}>
                        <div className={"tab-title"}>RESOURCES</div>
                    </Col>

                    {/*--------------------------- Filtering ---------------------------*/}
                    <Col className={"px-3"} xxl={2} xl={3} lg={4}>
                        <Form>
                            <Form.Group controlId={"formResourceGrade"}>
                                <Form.Select name={"grade"}
                                             onChange={this.onChangeGradeHandler}>
                                    <option value={"all"}>Select grade</option>
                                    {
                                        this.state.gradelist.map(item =>
                                            <option value={item.grade} key={item.grade}>{item.grade}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className={"px-0"} xxl={2} xl={3} lg={5}>
                        <Form>
                            <Form.Group controlId={"formResourceSubject"}>
                                <Form.Select name={"subject"}
                                             onChange={this.onChangeSubjectHandler}
                                             disabled={this.state.isDisabled}>
                                    <option value={"all"}>Select subject</option>
                                    {
                                        this.state.subjectList.map(subject =>
                                            <option value={subject}>{subject}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {/*--------------------------- Card Deck ---------------------------*/}
                {this.state.libraries.length === 0 &&
                <div className={"no-data-text"}>
                    No resources are available.
                </div>
                }

                <Row>

                    {
                        this.state.libraries.map(library =>

                            <Col className={"mb-5"} key={library.id}>
                                <Card className={"st-library-card"}>
                                    <div className={"st-library-card-header"}>
                                        <div className={"st-library-card-grade"}>
                                            <div className={"st-library-grade-no"}>{library.grade}</div>
                                        </div>

                                        <div className={"st-library-card-subject"}>
                                            <div className={"st-sub"}>
                                                <div className={"st-library-subject-text"}>{library.subject}</div>
                                                <div
                                                    className={"st-library-subject-file text-muted"}>{library.fileName}</div>
                                            </div>
                                            <button className={"st-download-btn"}
                                                    onClick={(event) => this.downloadResource(event, library.fileId, library.fileName)}>
                                                <FontAwesomeIcon icon={faArrowCircleDown}/>
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )
                    }
                </Row>

            </div>
        )
    }

}

export default TeachersGuideLibrary;