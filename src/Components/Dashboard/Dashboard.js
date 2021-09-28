import React, {Component} from 'react';

import "../../Stylesheets/Dashboard.css";
import UserStatChart from "./UserStatChart";
import LibraryInventoryChart from "./LibraryInventoryChart";
import SubjectStatChar from "./SubjectStatChar";
import axios from "axios";
import { ImBullhorn } from 'react-icons/im';
import { CgCheckR } from 'react-icons/cg';
import { FaUserGraduate,FaCameraRetro ,FaCloudDownloadAlt} from 'react-icons/fa';
import {ScreenCapture} from "react-screen-capture";



class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noticeCount:'',
            gradeCount:'',
            subjectCount:'',
            studentCount:[],
            screenCapture: ''
        }
    }

    componentDidMount() {
       /* console.log(window.location.pathname)*/
        this.getNoticeCount();
        this.getGradeCount();
        this.getSubjectCount();
        this.getChartDataforUserStat();

    }
    handleScreenCapture = screenCapture => {
        this.setState({screenCapture});
    };

    handleSave = () => {
        const screenCaptureSource = this.state.screenCapture;
        const downloadLink = document.createElement('a');
        const fileName = 'react-screen-capture.png';

        downloadLink.href = screenCaptureSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    getNoticeCount() {
        axios.get("http://localhost:8080/api/dashboard/notices").then(res => {
            this.setState({noticeCount: res.data});
        });
    }
    getGradeCount() {
        axios.get("http://localhost:8080/api/dashboard/grades").then(res => {
            this.setState({gradeCount: res.data});
        });
    }
    getSubjectCount() {
        axios.get("http://localhost:8080/api/dashboard/subjects").then(res => {
            this.setState({subjectCount: res.data});
        });
    }
    getChartDataforUserStat() {
        axios.get("http://localhost:8080/api/dashboard/users").then(res => {
            this.setState({
                studentCount: res.data

            });

        });

    }


    render() {

        const { screenCapture } = this.state;
        return(
            <ScreenCapture onEndCapture={this.handleScreenCapture}>
                {({ onStartCapture }) => (
                <div>
                    <div>
                        <div className={"dash-wrapper"}>
                            <div>
                      <h3>DASHBOARD</h3>



                    <div className="container" style={{width: '60rem'}} >
                        <div className="row"  >
                            <div className="col">
                                <div className="col-sm-14">
                                    <div className="card">
                                        <div className="card-body" style={{background:'rgba(14,14,14,0.82)'}}>
                                            <center><ImBullhorn size ='60px' color='white'/></center>
                                            <center><h5 className="card-title" style={{color:'white'}}>Today Notice Count</h5></center>
                                            <center><h4 className="card-text" style={{color:'white'}}>{this.state.noticeCount}</h4></center>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="col-sm-14">
                                    <div className="card">
                                        <div className="card-body" style={{background:'#e58e08'}}>
                                            <center><CgCheckR size ='60px'/></center>
                                            <center><h5 className="card-title">Grades We support</h5></center>
                                            <center><h4 className="card-text">{this.state.gradeCount}</h4></center>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="col-sm-14">
                                    <div className="card">
                                        <div className="card-body"  style={{background:'rgb(252,197,0)'}}>
                                            <center><FaUserGraduate size ='60px'/></center>
                                            <center><h5 className="card-title" >Registered Students </h5></center>
                                            <center><h4 className="card-text">{this.state.studentCount[0]}</h4></center>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*------------------------------- Charts -------------------------------*/}

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3 className={"dash-chart-title"}></h3>
                               <center><SubjectStatChar/></center>

                            </div>
                            <div className="col">
                                <center><LibraryInventoryChart/> </center>
                            </div>
                            <div className="col">
                                <center><UserStatChart/> </center>
                            </div>
                        </div>
                    </div>
                                <button onClick={onStartCapture}><FaCameraRetro size ='50px'/></button>
                                <center>
                                    <img src={screenCapture} alt='' />
                                    <p>
                                        {screenCapture && <button onClick={this.handleSave}><FaCloudDownloadAlt size ='50px'/></button>}
                                    </p>
                                </center>

                </div>
             </div>
           </div>
        </div>
                )}
            </ScreenCapture>

        )
    }

}

export default Dashboard;