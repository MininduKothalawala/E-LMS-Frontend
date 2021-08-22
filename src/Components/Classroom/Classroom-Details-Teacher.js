import {Component} from "react";
import axios from "axios";

class ClassroomDetailsTeacher extends Component{

    constructor(props){
        super(props);



        this.state = {
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
            classImg : undefined

        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/classroom/' +this.state.id)
            .then(response => {
                this.setState({
                    id : response.data.id,
                    grade : response.data.grade,
                    subject : response.data.subject,
                    topic : response.data.topic,
                    description : response.data.description,
                    date : response.data.date,
                    time : response.data.time,
                    link : response.data.link,
                    addedBy : response.data.addedBy,
                })
            })
            .catch(function(error) {
                console.log(error);
            })

    }



    render() {
        return (
            <div>

                <div>

                    <h3>Classroom Details</h3>


                    <form>
                        <div>
                            <label> Class ID: </label>
                            <input type = "text"
                                   required
                                   className = "form-control"
                                   value = {this.state.id}

                            />
                        </div>

                        <div className = "form-group">
                            <label>Added By : </label>
                            <input type = "text"
                                   required
                                   className = "form-control"
                                   value = {this.state.addedBy}

                            />
                        </div>

                        <div className = "form-group">
                            <label>Grade : </label>
                            <input type = "text"
                                   required
                                   className = "form-control"
                                   value = {this.state.grade}

                            />
                        </div>


                    </form>

                </div>

            </div>
        )
    }

}
export default ClassroomDetailsTeacher;