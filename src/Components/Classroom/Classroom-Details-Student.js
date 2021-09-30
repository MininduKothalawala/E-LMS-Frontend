import React, {Component} from "react";
import axios from "axios";
import moment from "moment";
import ClassroomDataService from "./ClassroomDataService";
import pdf from "../../Assets/pdf.svg";
import word from "../../Assets/word.svg";
import "../../Stylesheets/Classroom-details-styles.css";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

class ClassroomDetailsStudent extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: props.classId,
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:new Date(),
            time : '',
            link: '',
            addedBy :'',
            isChecked: false,
            lec_filename : undefined,
            lec_fileId : undefined,
            tute_filename : undefined,
            tute_fileId : undefined,
            img_filename: undefined,
            img_fileId : undefined
        }
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


    handleDownloadTute = (e, tute_filename, tute_fileId) => {
        e.preventDefault();

        ClassroomDataService.downloadTute(tute_fileId)
            .then(res => {
                console.log(res)
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.setAttribute('download', tute_filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })


    }

    componentDidMount() {
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
                    img_fileId : response.data.img_fileId
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }



    render() {

        const {grade, subject, topic,description, date, time, link, addedBy, img_fileId, lec_fileId,lec_filename, tute_filename, tute_fileId} = this.state

        return(
            <div className={"wrapper-div"}>
                <div className={"text-center"}>
                    <Image className={"detail-class-img"}
                           src={`http://localhost:8080/classroom/image/${img_fileId}`} />
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Grade</div>
                    <div className={"detail-group-right-text"}>{grade}</div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Subject</div>
                    <div className={"detail-group-right-text"}>{subject}</div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Topic</div>
                    <div className={"detail-group-right-text"}>{topic}</div>
                </div>

                <div className={"detail-box-secondary-section"}>
                    <div className={"detail-box-title-secondary"}>Description</div>
                    <div className={"detail-box-text"}>{description}</div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Date</div>
                    <div className={"detail-group-right-text"}>{moment(date).format("MMMM DD, YYYY")}</div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Time</div>
                    <div className={"detail-group-right-text"}>{time}</div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Link</div>
                    <div className={"detail-group-right-text"}><a href={link}>{link}</a></div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}>Added By</div>
                    <div className={"detail-group-right-text"}>{addedBy}</div>
                </div>

                <Row className={"px-3"}>
                    <div className={"detail-box-title mb-5 px-0"}>Download</div>
                    <Col className={"text-center"} xl={3}>
                        <div className={"download-icon-btn py-3 mb-2"}>
                            <Image src={pdf} width={75} />
                        </div>
                        <Button variant={"success"} type={"submit"}
                                onClick={(e) => this.handleDownloadLec(e, lec_filename, lec_fileId)}>
                            <FontAwesomeIcon icon={faDownload}/> &nbsp;Lecture
                        </Button>
                    </Col>
                    <Col className={"text-center"} xl={3}>
                        <div className={"download-icon-btn py-3 mb-2"}>
                            <Image src={word} width={75} />
                        </div>
                        <Button variant={"success"} type={"submit"}
                                onClick={(e) => this.handleDownloadTute(e, tute_filename, tute_fileId)}>
                            <FontAwesomeIcon icon={faDownload}/> &nbsp;&nbsp; Tute
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default ClassroomDetailsStudent;