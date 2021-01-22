import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import $ from 'jquery';
import TableAdhesion from '../Components/AdminComponents/table-adhesions'
import TableIntermmediaire from '../Components/AdminComponents/table-intermmediaire'
import TableMessages from '../Components/AdminComponents/table-messages'
import ConsulterAnnonceAdmin from '../Components/AdminComponents/ConsulterAnnoncesAdmin';
import '../Styles/Sidebar.css'
// import Consultation from '../Components/AdminComponents/Consultation';
class Admin extends Component {

  state = {
    selectedbloc: 4
  }
  constructor() {
    super();
  }
  ShowBloc(){
    switch(this.state.selectedbloc){
      case 1:
        return ([
          <TableAdhesion/>
        ])
      case 2:
        return ([
          <TableIntermmediaire/>
        ])
      case 3 :
        return([
          <ConsulterAnnonceAdmin/>
        ])
      default:
        return ([
          <TableMessages/>
        ])
    }
  }
  ActivateBloc(param){
    for(let i=1; i<5;i++){
      $("#bloc"+i).removeClass("active")
    }
    $("#bloc"+param).addClass("active")
    this.state.selectedbloc=param
  }
  sidebarCollapse() {
    $('#sidebar').toggleClass('active');
  }
  render() {
    return (
      <>
        <div class="wrapper d-flex align-items-stretch">
          <nav id="sidebar">
            <div class="custom-menu">
              <button type="button" id="sidebarCollapse" onClick={() => this.sidebarCollapse()} class="btn btn-primary">
                <i class="fa fa-bars"></i>
                <span class="sr-only">Toggle Menu</span>
              </button>
            </div>
            <ul class="list-unstyled components mb-5">
              <li class="" id='bloc1'>
                <a href="#" onClick={()=>this.ActivateBloc(1)}>Gérer les adhésions </a>
              </li>
              <li id='bloc2'>
                <a href="#"  onClick={()=>this.ActivateBloc(2)}>Gérer les intermediaires </a>
              </li>
              <li id='bloc3'>
                <a href="#" onClick={()=>this.ActivateBloc(3)}> Consulter les annonces</a>
              </li>
             
            </ul>

          </nav>
          <div id="content" class="p-4 p-md-5 pt-5">
            {this.ShowBloc()}
          </div>
        </div>
      </>
    );
  }
}
export default Admin;