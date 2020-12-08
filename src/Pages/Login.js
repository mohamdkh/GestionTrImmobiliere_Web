import React, { Component } from 'react';
import Swal from 'sweetalert2'
import '../Styles/Login.css'
import LoginService from '../services/LoginService'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import intermediary from './intermediary'
class Login extends Component {
  state = {
    email: '',
    password: '',
    redirect: ''
  }
  constructor() {
    super();
    document.body.classList.add("setbackground")
  }
  Submit() {
    LoginService.postLogin(this.state.email, this.state.password).then((response) => {
      console.log(response.data)
      if (response.data.status != 'active') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Email ou mot de passe non valide",
          footer: "<a href='http://localhost:4200/Inscription'>Cliquez pour créer un compte !</a>"
        })
      }
      else {
        localStorage.setItem("role", response.data.role.toString())
        localStorage.setItem("userName", response.data.email.split("@")[0])
        localStorage.setItem("id", response.data.id.toString())
        if (response.data.role == "admin") {
          // this.setState({redirect:"admin"})
        }
        else {
          localStorage.setItem("adresse", response.data.adresse)
          localStorage.setItem("commune1", response.data.commune1)
          localStorage.setItem("commune2", response.data.commune2)
          localStorage.setItem("commune3", response.data.commune3)
          localStorage.setItem("email", response.data.email)
          localStorage.setItem("id", response.data.id)
          localStorage.setItem("id_piece_justif", response.data.id_piece_justif)
          localStorage.setItem("id_user", response.data.id_user)
          localStorage.setItem("nom", response.data.nom)
          localStorage.setItem("password", response.data.password)
          localStorage.setItem("prenom", response.data.prenom)
          localStorage.setItem("role", response.data.role)
          this.setState({ redirect: "intermediaire" })
        }
        //window.location.reload();
      }
    })
  }
  changehandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    if( localStorage.getItem("role")=="intermediaire"){
      return (
        window.parent.location = "/intermediaire"
      )
    }
    else if(localStorage.getItem("role")=="admin"){
      window.parent.location = "/admin"
    }
    else
    return (
      <>
        <section className="container">
          <section className="login-form">
            <div id="form" >
              <img src="" className="img-responsive" alt="" />
              <input type="email" name="email" placeholder="Email" className="form-control input-lg" onChange={this.changehandler} />
              <input type="password" name="password" placeholder="Password" className="form-control input-lg" onChange={this.changehandler} />
              <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={() => this.Submit()} >Se Connecter</button>
              <div>
                <a href="/Register">Créer un compte</a>
              </div>
            </div>
            <div className="form-links">
              <a href="#">www.GestionTransactionImmobiliere.com</a>
            </div>
          </section>
        </section>
      </>
    )
  }

}
export default Login;