import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import LibraryDataService from "./LibraryDataService";
import {faArrowCircleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TeachersGuideLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libraries: [],
            search: ''
        }
    }

    componentDidMount() {
        this.getResources();
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

    render() {
        return (
            <div className={"st-wrapper"}>
                <Row className={"st-title mx-0"}>
                    <Col className={"px-0"}>
                        <div className={"tab-title"}>RESOURCES</div>
                    </Col>

                    {/*--------------------------- Search ---------------------------*/}
                    {/*<Col className={"px-0"} xl={3}>*/}
                    {/*    <Form>*/}
                    {/*        <Form.Group controlId={"formResourceGrade"}>*/}
                    {/*            <Form.Select>*/}
                    {/*                <option>Select grade</option>*/}
                    {/*                <option value={1}>Grade 1</option>*/}
                    {/*                <option value={2}>Grade 2</option>*/}
                    {/*                <option value={3}>Grade 3</option>*/}
                    {/*                <option value={4}>Grade 4</option>*/}
                    {/*                <option value={5}>Grade 5</option>*/}
                    {/*            </Form.Select>*/}
                    {/*        </Form.Group>*/}
                    {/*    </Form>*/}
                    {/*</Col>*/}
                </Row>

                {/*--------------------------- Card Deck ---------------------------*/}
                {this.state.libraries.length < 0 &&
                <div className={"no-data-text"}>
                    No resources are available.
                </div>
                }

                <Row>

                    {
                        this.state.libraries.map(library =>

                            <Col className={"mb-5"}>
                                <Card className={"st-library-card"}
                                      key={library.id}>
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