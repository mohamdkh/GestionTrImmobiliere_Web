import React, { Component } from 'react';
import '../Styles/Navbar.css'
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';


class Navbar extends Component {

  state = {
    username: localStorage.getItem("userName")!=null?localStorage.getItem("userName").toString():'',
    UserExist: localStorage.getItem("userName")!=null?true:false,
    roleLink:localStorage.getItem("role")!=null?localStorage.getItem("role").toString():""
  }

   constructor() {
    super();
    if(localStorage.getItem("userName")!=null){
       this.setState({ UserExist: true});
       this.setState({ username: localStorage.getItem("userName").toString()});
    }
  }
  LogOut = () => {
    this.setState({ UserExist: false});
    localStorage.clear();
    window.parent.location = "/login"
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <a className="navbar-brand" href="#">
            <img src={logo} width="140" height="55" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to="/Home">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-home"></i> Accueil </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/OurOffers">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-gift"></i> Nos offres</a>
                </Link>
              </li>
              <li className="nav-item">
               <Link to="/Contact">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-info-circle"></i> Contacter-nous</a>
                </Link>
              </li>
            </ul>
            {
              this.state.UserExist ?
                <div className="form-inline my-2 my-lg-0">
                  <Link to={this.state.roleLink}>
                  <button className={' btn btn-info '} type="button" style={{ marginRight: '5px' }} id="DesplayName">{this.state.username}</button>
                  </Link>
                  <button className=" btn btn-danger " type="button" id="LogOut" onClick={this.LogOut}>Déconnexion</button>
                </div>
                :
                <div className="form-inline my-2 my-lg-0">
                  <Link to="/Register">
                    <button className="btn btn-primary" type="button"  style={{ marginRight: '5px' }} id="createAccount">
                      Créer un compte</button>
                  </Link>
                  <Link to="/Login">
                    <button className="btn btn-success" type="button"  id="Login">Se Connecter</button>
                  </Link>
                </div>
            }
          </div>
        </nav>
      </>
    )
  }
}
export default Navbar;