import React, {Component} from 'react';
import {Badge, Button, ButtonGroup, Col, InputGroup, Row, Table, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faEdit, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import LibraryDataService from "./LibraryDataService";
import {faFilePdf} from "@fortawesome/free-regular-svg-icons";
import "../../Stylesheets/Admin-Tables-styles.css"
import Swal from "sweetalert2";

class ViewLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libraries: []
        }
    }

    componentDidMount() {
        this.refreshTable();
    }

    /**
     * This method search the typed text through
     * subject, grade, filename columns and return
     * the results to the table.
     *
     * If there is no results to be found, libraries
     * array will be set to 0 so the no record text
     * will appear.
     *
     * If there is no input text typed, call the
     * refreshTable method to load all the data
     * to the table again.
     *
     * @param event - captures the input text
     */
    searchResource = (event) => {
        event.preventDefault();

        const search = event.target.value;

        if (search) {
            LibraryDataService.searchResource(search)
                .then( res => {

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
        } else {
            this.refreshTable();
        }

    }

    refreshTable = () => {
        LibraryDataService.fetchLibraryResources()
            .then(res => {
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

    filterResource = (input) => {
        LibraryDataService.filterByType(input)
            .then( res => {
                if (res.data.length > 0) {
                    this.setState({
                        libraries: res.data
                    })
                }
            })
    }

    editResource = (id) => {

    }

    deleteResource = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            background: '#fff',
            confirmButtonColor: '#808080',
            iconColor: '#ffc200',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then( res => {
            if (res.isConfirmed) {
             LibraryDataService.deleteLibraryResource(id)
                 .then( res => {
                     console.log(res);
                     this.refreshTable();

                     Swal.fire({
                         icon: 'success',
                         title: 'Successful',
                         text: "Resource have been deleted!!",
                         background: '#fff',
                         confirmButtonColor: '#333533',
                         iconColor: '#60e004'
                     })
                 })
            }
        })
    }

    render() {
        const {libraries} = this.state;

        return (
            <div>

                <p>LIBRARY MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Library Resources</h3>
                    </div>
                    <div className={"mb-2"}>
                        <Row>
                            <Col xl={5} lg={5}>
                                <InputGroup>
                                    <InputGroup.Text bsPrefix={"input-search-icon"}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                                  placeholder="Search"
                                                  required
                                                  onChange={this.searchResource}/>
                                </InputGroup>
                            </Col>
                            <Col className={"text-end"}>
                                <button className={"filter-btn-guide"} onClick={() => this.filterResource("Guide")}>TEACHERS' GUIDE</button>
                                <button className={"filter-btn-syllabus"} onClick={() => this.filterResource("Syllabus")}>SYLLABUS</button>
                            </Col>
                        </Row>
                    </div>

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
                                                {library.resourceType === 'Syllabus' &&
                                                <Badge bg="secondary" text="light" className={"px-3 py-2"}
                                                       key={"0"}>SYLLABUS</Badge>
                                                }
                                                {library.resourceType === 'Guide' &&
                                                <Badge bg="secondary" className={"px-3 py-2"}
                                                       key={"0"}>TEACHERS' <br/> GUIDE</Badge>
                                                }
                                            </td>
                                            <td>{library.grade}</td>
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