import React, {Component} from 'react';
import {Bar, Chart, Doughnut, Line, Pie} from 'react-chartjs-2';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";


class UserStatChart extends React.Component {
    constructor(){
        super();
        this.state = {
            userStat: [],
            userRole:["Student","Teacher","Admin"]

        }
    }

    componentDidMount() {
        this.getChartDataforUserStat();

    }

    getChartDataforUserStat() {
        axios.get("http://localhost:8080/api/dashboard/users").then(res => {
            this.setState({userStat: res.data});
        });
        console.log(this.state.userStat)
    }



    render(){

        return (
            <div >
                <Container className={"my-2"}>
                    <Card className={"template-card"} style={{width: '30rem'}} >
                        <h3 className={"text-center my-5"}>User Statistics</h3>
                        <Doughnut
                            data={{
                                labels: this.state.userRole,
                                datasets: [
                                    {
                                        label: 'count',
                                        backgroundColor:[
                                            'rgb(226,141,13)',
                                            'rgb(17,14,1)',
                                            'rgb(255,191,0)',
                                            'rgba(75, 192, 192, 0.2)'] ,
                                        borderColor: 'rgba(0,0,0,0)',
                                        borderWidth: 2,
                                        data: this.state.userStat
                                    }
                                ]
                            }}
                            options={{
                                title:{
                                    display:true,
                                    text:'Library ',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'right'
                                }
                            }}
                        />
                    </Card>
                </Container>


            </div>
        );

    }
}

export default UserStatChart;