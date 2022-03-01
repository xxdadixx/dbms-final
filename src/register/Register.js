import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            name:"",
            email:localStorage.getItem("user").email,
            province_name:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            name:this.state.name,
            email:JSON.parse(localStorage.getItem('user')).email,
            province_name:this.state.province_name
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            name:"",
            email:"",
            province_name:""
        });
    }

    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">ID</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Name</label>
                        <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Province Name</label>
                        <input type="text" className="form-control" id="province_name" onChange={this.handleChang} value={this.state.province_name}/>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    </a>
                </form>
            </div>
        );
    }
}
