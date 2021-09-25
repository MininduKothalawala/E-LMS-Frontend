import React, {Component} from 'react';
import {Bar, Chart, Doughnut, Line, Pie} from 'react-chartjs-2';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";


class ChartComponents extends React.Component {
    constructor(){
        super();
        this.state = {
            userStat: [1,2,3],
            userRole:["Student","Teacher","Admin"],
            libraryStat: [1,2,3],
            libraryStatus:["Books","PDF","CD"]

        }
    }

    componentDidMount() {
        this.getChartDataforConfference();
        this.getChartDataforResearch();
    }

    getChartDataforConfference() {
        axios.get("http://localhost:8080/api/information/getConferenceStatus").then(res => {
            this.setState({userStat: res.data});
        });
        console.log(this.state.userStat)
    }

    getChartDataforResearch() {
        axios.get("http://localhost:8080/api/information/getResearchStatus").then(res => {
            this.setState({libraryStat: res.data});
        });
        console.log(this.state.libraryStat)
    }

    render(){

        return (
            <div >
                <Container className={"my-2"}>
                    <Card className={"template-card"} style={{width: '15rem'}} >
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


                    <Card className={"template-card"} style={{width: '30rem'}} >
                        <h3 className={"text-center my-5"}>Library Inventory</h3>
                        <Doughnut
                            data={{
                                labels: this.state.libraryStatus,
                                datasets: [
                                    {
                                        label: this.state.libraryStatus,
                                        backgroundColor:[
                                            'rgb(253,187,0)',
                                            'rgb(0,0,0)',
                                            'rgb(59,59,59)',
                                            'rgba(75, 192, 192, 0.2)'] ,
                                        borderColor: 'rgba(0,0,0,0)',
                                        borderWidth: 2,
                                        data: this.state.libraryStat
                                    }
                                ]
                            }}
                            options={{
                                title:{
                                    display:true,
                                    text:'Research  status statictics',
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

export default ChartComponents;