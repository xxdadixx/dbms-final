import React, {Component} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Movietype.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:""
        }
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/movietype')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">Movie Information<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>Movie Type</th>
                            <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((movietype) =>{
                                    return(
                                        <tr>
                                            <td>{movietype.movie}</td>
                                            <td>{movietype.total}</td>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
