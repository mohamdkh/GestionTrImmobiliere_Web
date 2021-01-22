import React, { Component } from 'react';
import $ from 'jquery';
import Profile from './../Components/intermediaryComponents/Profile'
import Annonces from './../Components/AnnonceComponent/Annonces'
import ConbsulterAnnonceInterm from './../Components/AnnonceComponent/ConsulterAnnonceIntermediaire'
import ConsulterVosAnnonceInterm from '../Components/AnnonceComponent/ConsulterVosAnnonces';
import Consultation from '../Components/AnnonceComponent/Consultation';
class intermediary extends Component {
    state = {
        selectedbloc: 1
      }
      ShowBloc(){
        switch(this.state.selectedbloc){
          case 1:
            return ([
              <Profile/>
            ])
          case 2:return ([
            <div>
                <ConsulterVosAnnonceInterm/>
            </div>
          ])
          case 3:
              return([
                <div>
                  <ConbsulterAnnonceInterm/>
                </div>
              ])
          default:
            return ([
                <div>
                Profil
            </div>
            ])
        }
      }
      sidebarCollapse() {
        $('#sidebar').toggleClass('active');
      }
      ActivateBloc(param){
        for(let i=1; i<5;i++){
          $("#bloc"+i).removeClass("active")
        }
        $("#bloc"+param).addClass("active")
        this.setState({selectedbloc:param})
      }
    constructor(){
        super();
    }
    render(){
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
              <li id='bloc2'>
                <a href="#"  onClick={()=>this.ActivateBloc(2)}>Mes annonces</a>
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
export default intermediary;