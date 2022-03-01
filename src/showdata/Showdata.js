import React, {Component} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    onDelete=(user)=>{
        let url = `https://localhost:3000/delete`;
        let data = {
            idkey:user.id,
            timestamp:user.timestamp,
            name:user.name,
            email:user.email,
            province_name:user.province_name
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    openModal() {
        this.setState({
            visible : true
        });

    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    call=(user)=>{
        this.openModal();
        this.setState({
            idkey:user.id,
            name:user.name,
            email:user.email,
            province_name:user.province_name
            
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            timestamp:this.state.timestamp,
            name:this.state.name,
            email:this.state.email,
            province_name:this.state.province_name
        }
        axios.put(url,data)
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            timestamp:this.state.timestamp,
            name:this.state.name,
            email:this.state.email,
            province_name:this.state.province_name
        }
        axios.put(url,data)
        this.setState({
            idkey:"",
            timestamp:"",
            name:"",
            email: "",
            province_name:""
        });
	this.closeModal();
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">Users Information<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Date-Time</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Province Name</th>
                            <th>Edit Account</th>
                            <th>Delete Account</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.timestamp}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.province_name}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delete</button></td>
                                            <div className="box">
                                                <Modal visible={this.state.visible}
                                                       width="1200"
                                                       height="600"
                                                       effect="fadeInUp"
                                                       onClickAway={() => this.closeModal()}
                                                >
                                                    <form className="container" id='form'>
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">ID: {this.state.idkey}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Name:</label>
                                                            <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email:</label>
                                                            <input type="text" className="form-control" id="email" onChange={this.handleChang} value={this.state.email}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Province Name:</label>
                                                            <input type="text" className="form-control" id="province_name" onChange={this.handleChang} value={this.state.province_name}/>
                                                        </div>
                                                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                                                    </form>
                                                </Modal>
                                            </div>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
