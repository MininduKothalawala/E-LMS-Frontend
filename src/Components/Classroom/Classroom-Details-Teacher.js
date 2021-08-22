import React, {Component} from "react";
import axios from "axios";
import moment from "moment";
class ClassroomDetailsTeacher extends Component{

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
            lecFile : undefined,
            tuteFile : undefined,
            classImg : undefined,
            isChecked: false

        }
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
                    //lecFile:response.data.lecFile,

                })

            })
            .catch((error) => {
                console.log(error);
            })
    }



    render() {

        const {id, grade, subject, topic,description, date, time, link, addedBy} = this.state

        return(



            <div >

                <div>
                    <h5>Classroom Details</h5>
                </div>
                <hr/>




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
                    <p>{link}</p>
                </div>












            </div>






        )
    }
}
export default ClassroomDetailsTeacher;