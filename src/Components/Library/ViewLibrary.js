import React, {Component} from 'react';
import {Badge, Button, ButtonGroup, Card, Container, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import LibraryDataService from "./LibraryDataService";

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

    refreshTable = () => {
        LibraryDataService.fetchLibraryResources()
            .then( res => {
                console.log(res.data)
                this.setState({
                    libraries: res.data
                })
            })
    }

    editResource = (id) => {

    }

    deleteResource = (id) => {

    }

    render() {
        const { libraries } = this.state;

        return(
            <div>
                <div>
                    <Container className={"my-5"}>
                        <Card>
                            <Card.Body>
                                <h1>Library</h1>

                                <Table striped responsive hover bordered>
                                    <thead>
                                    <tr>
                                        <th className={"text-center"}>File</th>
                                        <th className={"text-center"}>Resource Type</th>
                                        <th className={"text-center"}>Grade</th>
                                        <th className={"text-center"}>Subject</th>
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
                                                        <td><a href={`http://localhost:8080/` + library.fileId}>{library.fileName}</a></td>
                                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                            {library.resourceType === 'syllabus' &&
                                                            <Badge bg="warning" text="dark" className={"px-3 py-2"}
                                                                   key={"0"}>SYLLABUS</Badge>
                                                            }
                                                            {library.resourceType === 'guide' &&
                                                            <Badge bg="success" className={"px-3 py-2"}
                                                                   key={"0"}>TEAC HERS' GUIDE</Badge>
                                                            }
                                                        </td>
                                                        <td style={{verticalAlign: 'middle'}}>{library.grade}</td>
                                                        <td style={{verticalAlign: 'middle'}}>{library.subject}</td>
                                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                            <ButtonGroup>
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
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        )
    }
}

export default ViewLibrary;