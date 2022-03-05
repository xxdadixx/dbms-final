import React, { Component } from "react";
import axios from "axios";
import { ip, port } from "../setIP/setting";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            idkey: "",
            username: "",
            name: "",
            user_movietype: "",
            email: localStorage.getItem("user").email,
            movielist:[]
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked() {
        let url = `https://localhost:3000/data`;
        let data = {
            idkey: this.state.idkey,
            username: this.state.username,
            name: this.state.name,
            user_movietype: this.state.user_movietype,
            email: JSON.parse(localStorage.getItem('user')).email
        }
        axios.post(url, data)
        this.setState({
            idkey: "",
            username:"",
            name: "",
            user_movietype: "",
            email: ""
        });
    }

    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/selectmovie')
            .then(res => res.json())
            .then(list => this.setState({ movielist:list }))
        console.log("after fetch data");
    }

    render() {
        return (
            <div>
                <div className="App">
                    <h2 className="my-4">Register<br /></h2>
                    <hr />
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-white" htmlFor="id">Movie ID</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey} />
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Firstname and lastname</label>
                        <input type="text" className="form-control" id="username" onChange={this.handleChang} value={this.state.username} />
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Movie name</label>
                        <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Select to movie type</label>
                    </div>
                    <div>
                    <select className="form-control" id="user_movietype" onChange={this.handleChang} value={this.state.user_movietype} required>
                            <option>Select Movie type</option>
                            {this.state.movielist.map(movietype => {
                                return <option value={movietype.movietype_id}>{movietype.movietype_name}</option>
                            })}
                        </select>
                    </div>
                    <a href="/Showdata">
                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    </a>
                </form>
            </div>
        );
    }
}
