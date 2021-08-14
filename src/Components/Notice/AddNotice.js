import {Component} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

class AddNotice extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeNoticeSubject = this.handleChangeNoticeSubject.bind(this);
        this.handleChangeNoticeGrade = this.handleChangeNoticeGrade.bind(this);
        this.handleChangeNoticeTopic = this.handleChangeNoticeTopic.bind(this);
        this.handleChangeNoticeBody = this.handleChangeNoticeBody.bind(this);

        this.state = {
            noticeId: '',
            noticeSubject: '',
            noticeGrade: '',
            noticeTopic: '',
            noticeBody: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const notices = {
            noticeId: this.state.noticeId,
            noticeSubject: this.state.noticeSubject,
            noticeGrade: this.state.noticeGrade,
            noticeTopic: this.state.noticeTopic,
            noticeBody: this.state.noticeBody
        }

        console.log(notices);

        axios.post('http://localhost:8080/Notice/', notices)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Conference added successfully!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error uploading!!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            });
    }


    handleChangeID(e) {
        this.setState({noticeId: e.target.value});
    }

    handleChangeNoticeSubject(e) {
        this.setState({noticeSubject: e.target.value});
    }

    handleChangeNoticeGrade(e) {
        this.setState({noticeGrade: e.target.value});
    }

    handleChangeNoticeTopic(e) {
        this.setState({noticeTopic: e.target.value});
    }

    handleChangeNoticeBody(e) {
        this.setState({noticeBody: e.target.value});
    }

    render() {

        return (
            <Container className={"my-5 py-4"}>
                <Card className={"adminCard"}>
                    <div className={"text-center adminCardTitle"}>Add Item</div>
                    <Card.Body className={"m-3"}>
                        <form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <div className={"mb-3"}>
                                        <label htmlFor="noticeId" className="grey-text">
                                            Item ID
                                        </label>
                                        <input type="text" id="noticeId" name="ID" className="form-control"
                                               required={true}
                                               onChange={this.handleChangeID}/>
                                    </div>

                                    <div className={"mb-3"}>
                                        <label htmlFor="noticeSubject" className="grey-text">
                                            Category
                                        </label>
                                        <select className="browser-default custom-select" id="noticeSubject"
                                                name="Subjrct" onChange={this.handleChangeNoticeSubject}>
                                            <option>Choose your option</option>
                                            <option value="Sinhala">Sinhala</option>
                                            <option value="English">English</option>
                                            <option value="History">History</option>
                                        </select>
                                    </div>

                                    <div className={"mb-3"}>
                                        <label htmlFor="noticeGrade" className="grey-text">
                                            Category
                                        </label>
                                        <select className="browser-default custom-select" id="noticeGrade"
                                                name="Grade" onChange={this.handleChangeNoticeGrade}>
                                            <option>Choose your option</option>
                                            <option value="1">Grade 1</option>
                                            <option value="2">Grade 2</option>
                                            <option value="3">Grade 3</option>
                                        </select>
                                    </div>

                                    <Row className={"mb-3"}>
                                        <Col>
                                            <label htmlFor="noticeTopic" className="grey-text">
                                                Topic
                                            </label>
                                            <input type="text" id="noticeTopic" name="Topic" className="form-control"
                                                   onChange={this.handleChangeNoticeTopic}/>
                                        </Col>
                                    </Row>

                                    <Row className={"mb-3"}>
                                        <Col>
                                            <label htmlFor="noticeBody" className="grey-text">
                                                Body
                                            </label>
                                            <input type="text" id="noticeBody" name="Notice" className="form-control"
                                                   onChange={this.handleChangeNoticeBody}/>
                                        </Col>
                                    </Row>

                                    <div className={"text-right"}>
                                        <Button variant={"primary"} type={"submit"}>Add Item</Button>
                                    </div>

                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default AddNotice;
