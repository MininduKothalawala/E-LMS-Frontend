import React, {Component} from 'react';
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faEdit, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import LibraryDataService from "./LibraryDataService";
import {faFilePdf} from "@fortawesome/free-regular-svg-icons";
import "../../Stylesheets/Admin-Tables-styles.css"

class ViewLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libraries: [],
            search: ''
        }
    }

    componentDidMount() {
        this.refreshTable();
    }

    // handleSearchInput = (event) => {
    //     event.preventDefault();
    //
    //     this.setState({
    //         search: event.target.value
    //     })
    // }

    refreshTable = () => {
        LibraryDataService.fetchLibraryResources()
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



    // editResource = (id) => {
    //
    // }
    //
    // deleteResource = (id) => {
    //
    // }
    //
    // searchResource = (e) => {
    //
    // }

    render() {
        const {libraries} = this.state;

        return (
            <div>

                <p>LIBRARY MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Library Resources</h3>
                    </div>
                    {/*<div className={"mb-2"}>*/}
                    {/*    <Row>*/}
                    {/*        <Col xl={5} lg={5}>*/}
                    {/*            <InputGroup>*/}
                    {/*                <InputGroup.Text bsPrefix={"input-search-icon"}>*/}
                    {/*                    <FontAwesomeIcon icon={faSearch}/>*/}
                    {/*                </InputGroup.Text>*/}
                    {/*                <Form.Control type="text"*/}
                    {/*                              placeholder="Search"*/}
                    {/*                              required*/}
                    {/*                              value={this.state.search}*/}
                    {/*                              onChange={this.handleSearchInput}/>*/}
                    {/*            </InputGroup>*/}
                    {/*        </Col>*/}
                    {/*        <Col className={"text-end"}>*/}
                    {/*            <button className={"filter-btn-guide"}>TEACHERS' GUIDE</button>*/}
                    {/*            <button className={"filter-btn-syllabus"}>SYLLABUS</button>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</div>*/}

                    <Table responsive bordered>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th className={"text-center"}>File</th>
                            <th className={"text-center"}>Resource Type</th>
                            <th>Grade</th>
                            <th>Subject</th>
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            libraries.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    libraries.map(library =>
                                        <tr key={library.id}>
                                            <td>
                                                <FontAwesomeIcon icon={faFilePdf} className={"table-pdf-icon"}/>
                                                {library.fileName}
                                            </td>
                                            <td className={"text-center"}>
                                                {library.resourceType === 'SYLLABUS' &&
                                                <Badge bg="secondary" text="light" className={"px-3 py-2"}
                                                       key={"0"}>SYLLABUS</Badge>
                                                }
                                                {library.resourceType === 'GUIDE' &&
                                                <Badge bg="secondary" className={"px-3 py-2"}
                                                       key={"0"}>TEACHERS' <br/> GUIDE</Badge>
                                                }
                                            </td>
                                            <td>Grade {library.grade}</td>
                                            <td>{library.subject}</td>
                                            <td className={"text-center"}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} type={"submit"}
                                                            onClick={(event) => this.downloadResource(event, library.fileId, library.fileName)}>
                                                        <FontAwesomeIcon icon={faArrowDown}/>
                                                    </Button>
                                                    <Button variant={"warning"} type={"submit"}
                                                            onClick={() => this.editResource(library.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.deleteResource(library.id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>

                </div>
            </div>
        )
    }
}

export default ViewLibrary;