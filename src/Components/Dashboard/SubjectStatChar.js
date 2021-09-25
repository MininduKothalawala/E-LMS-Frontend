import React, {Component} from 'react';
import {Bar, Chart, Doughnut, Line, Pie} from 'react-chartjs-2';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";


class SubjectStatChar extends React.Component {
    constructor(){
        super();
        this.state = {
            subCount: [],
            SubBase:["1","2","3","4","5","6","7","8","9","10","11","12","13"]

        }
    }

    componentDidMount() {
        this.getChartDataforSubjectStat();

    }

    getChartDataforSubjectStat() {
        axios.get("http://localhost:8080/api/dashboard/subjects").then(res => {
            this.setState({subCount: res.data});
        });
        console.log(this.state.subCount)
    }



    render(){

        return (
            <div >
                <Container className={"my-2"}>
                    <Card className={"template-card"} style={{width: '70rem'}} >
                        <h3 className={"text-center my-5"}>Subjects Statistics</h3>
                        <Bar
                            data={{
                                labels: this.state.SubBase,
                                datasets: [
                                    {
                                        label: 'Subjects Per Grade',
                                        backgroundColor:[
                                            'rgb(226,141,13)',
                                            'rgb(17,14,1)',
                                            'rgb(255,191,0)',
                                            'rgb(38,56,56)'] ,
                                        borderColor: 'rgba(0,0,0,0)',
                                        borderWidth: 2,
                                        data: this.state.subCount
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

export default SubjectStatChar;