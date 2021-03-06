import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import {Card, Container} from "react-bootstrap";
import axios from "axios";

class LibraryInventoryChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            libraryStat: [],
            libraryStatus:["Teachers Guide","Sylabus"]

        }
    }

    componentDidMount() {

        this.getChartDataforLibStats();
    }



    getChartDataforLibStats() {
        axios.get("http://localhost:8080/api/dashboard/resources").then(res => {
            this.setState({libraryStat: res.data});
        });
        console.log(this.state.libraryStat)
    }

    render(){

        return (
            <div>
                <Container className={"my-2"}>
                    <Card>
                        <h3 className={"text-center my-5"}>Library Inventory</h3>
                        <Bar
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
                                    text:'Library statictics',
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

export default LibraryInventoryChart;