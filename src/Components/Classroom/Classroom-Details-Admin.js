import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Card, Form, Image, InputGroup, Modal, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
// import pdfImg from "./pdf.png";
// import tuteImg from "./tute.png";
import ClassroomDataService from "./ClassroomDataService";
class ClassroomDetailsAdmin extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            grade : '',
            subject:'',
            topic : '',
            description: '',
            date:new Date(),
            time : '',
            link: '',
            addedBy :'',
            // lecFile : undefined,
            // tuteFile : undefined,
            // classImg : undefined,
            isChecked: false,
            lec_filename : undefined,
            lec_fileId : undefined,
            tute_filename : undefined,
            tute_fileId : undefined,
            classImg : undefined,
            // isChecked: false
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

        const {id, grade, subject, topic,description, date, time, link, addedBy, classImg, lec_fileId,lec_filename, tute_filename, tute_fileId} = this.state

        return(



            <div >

                <div>
                    <h5>Conference Details</h5>
                </div>
                <hr/>

                <div>
                    <h6>Class ID</h6>
                    <p>{id}</p>
                </div>


                <div>
                    <h6>Grade</h6>
                    <p>{grade}</p>
                </div>

                <div >
                    <h6>Subject</h6>
                    <p >{subject}</p>
                </div>

                <div>
                    <h6>Topic</h6>
                    <p>{topic}</p>
                </div>

                <div>
                    <h6>Description</h6>
                    <p>{description}</p>
                </div>

                <div>
                    <h6>Date</h6>
                    <p>{moment(date).format("MMMM DD, YYYY")}</p>
                </div>

                <div>
                    <h6>Time</h6>
                    <p>{time}</p>
                </div>

                <div>
                    <h6>Link</h6>
                    <p>  <a href={link}>{link}</a></p>


                </div>


                <div>
                    <h6>Added By</h6>
                    <p>{addedBy}</p>
                </div>









            </div>






        )
    }
}
export default ClassroomDetailsAdmin;