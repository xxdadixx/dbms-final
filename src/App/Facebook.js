import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import ButtonShowdata from "../showdata/ButtonShowdata";
import ButtonRegister from "../register/ButtonRegister";
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from "../register/Register";
import Showdata from "../showdata/Showdata";
import Movietype from "../movietype/Movietype";
import { Link } from 'react-router-dom';

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };
  responseFacebook = response => {
    // console.log(response);

    localStorage.setItem('user', JSON.stringify(response))
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = () => console.log("Login facebook succesfuly");

  logoutFacebook = () => {
    localStorage.removeItem('user')
    this.setState({
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    });
  }

  render() {
    let fbContent;

    if (localStorage.getItem('user')!== null) {
      fbContent = (
        <div
          style={{
            width: "95%",
            margin: "auto",
            background: "black",
            color: 'white',
            padding: "25px",
            position: 'absolute',
            zIndex: 99,
            backgroundImage: 'linear-gradient(45deg, rgba(218, 132, 230, 0.84) 0%, rgba(179, 0, 89, 1) 83%)'
          }}
        >
          <img src={JSON.parse(localStorage.getItem('user')).picture.data.url} alt/>
          <h2>Welcome {" "}{JSON.parse(localStorage.getItem('user')).name}</h2>
 	  email: {JSON.parse(localStorage.getItem('user')).email}
          <div className="my-3"><a className="btn btn-danger" href="/" onClick={this.logoutFacebook}>Logout</a></div>
          <BrowserRouter>
            <br /><br /><div className="btn-group btn-group-lg">
            <div className="container">
                <Link to={'./Register'}> <button type="button" className="btn btn-primary">Register</button> </Link>
            </div>
          <div className="container">
                <Link to={'./Showdata'}> <button type="button" className="btn btn-primary">Showdata</button> </Link>
            </div>
            <div className="container">
                <Link to={'./Movie'}> <button type="button" className="btn btn-primary">Movie</button> </Link>
            </div>
            </div>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/showdata' component={Showdata} />
              <Route path='/movie' component={Movietype} />
            </Switch>
          </BrowserRouter>
          
        </div>
      );
    } else {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            padding: "25px"
          }}
        >
          <FacebookLogin
            appId="577542089982730"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}
