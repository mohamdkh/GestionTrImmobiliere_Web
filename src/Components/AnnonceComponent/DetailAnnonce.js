import React, { Component, useState } from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './AnnonceCard'
import Carousel from 'react-bootstrap/Carousel'
import { Redirect } from 'react-router-dom'
import Modal from 'react-modal';
import ReactMapGL, { Marker,FlyToInterpolator,NavigationControl,GeolocateControl , Popup } from "react-map-gl";
import Swal from 'sweetalert2';
import AfficherDemande from './AfficherDemandes';
// type_action :
// cette composante sera utiliser dans 3 page a savoir (
//   consulter vos annonce : type action=1 les actions sont :
//       afficher les demandes liées a une annonce
//       cloturer une annonce
//       déclarer annonce comme illégale
//       annuler
//   consulter les annonces non affectées type action=2 les actions sont:
//       prise en charge 
//       annuler
//   affichage des annonces par l'admin  type action=3 les actions sont
//       annuler 
//   affichage de détail par le grand public  type action=4 les actions sont:
//       annuler
//       Demander
// ) 
class DetailAnnonce extends Component {
 state={
    type_action:0,
    closeDetail:1,
     index:0,
     type_bien:"",
        type_operation:"",
     Annonce:{
        id:0,
        surface:0,
        prix:0,
        description:"",
        lat:0,
        lon:0,
        date:Date,
        nom_complet_proprietaire:"",
        telephone:"",
        email:"",
        status:"",
        isModalOpen:false,
     }
     ,
     showdemande:false,
     redirect:false,
     Images :[],
     viewport:{
      latitude: 31.7923,
      longitude: -7.0801,
      zoom: 6,
      width: "100vw",
      height: "100vh",
     }
 }
    constructor(props){
      console.log(props.type_action)
        super();
        AnnonceService.GetImagesAnnonce(props.id).then((result)=>{
            this.setState({Images:result.data})
        }).then(
            AnnonceService.GetAnnonceDetail(props.id).then((result)=>{
                this.setState({Annonce:result.data,
                    type_bien:props.type_bien,
                    type_operation:props.type_ops,
                    type_action:props.type_action,
                    viewport:{
                      latitude: result.data.lat,
                      longitude:result.data.lon,
                      zoom: 6,
                      width: "100vw",
                      height: "100vh",
                     }
                })
                console.log(this.state)
            })
        )
        
    }
    Annuler(){
        this.setState({closeDetail:0})
        return <AnnonceCard className="col-md-3" 
        image={this.props.image}
        status={this.state.Annonce.status} 
        type_bien={this.state.type_bien}
         type_ops={this.state.type_operation} 
         prix={this.state.Annonce.prix} 
        id_annonce={this.state.Annonce.id} 
        type_action={this.state.type_action}/>
    
      
        }
    Affecter(){
      AnnonceService.AffectationAnnonceToInterm(localStorage.getItem("id"),this.state.Annonce.id)
    }
    DemanderBien(){
      AnnonceService.DemandeAnnonce(this.state.Annonce.id)

    }
    AnnonceIllegale(){
        AnnonceService.changeStatutAnnonce(this.state.Annonce.id,"AI")
    }
    AfficherDemandes(){
    localStorage.setItem("idannonce",this.state.Annonce.id)
    this.setState({redirect:true})
    }
    ChangeStatus(){
     let id_annonce= this.state.Annonce.id
      Swal.fire({
        title: "Changer le statut de l'annonce !",
        input: 'select',
        inputOptions: {
          'AI': 'Annonce illégale',
          'CL': 'Annonce Cloturée',
        },
        inputPlaceholder: 'En cours',
        showCancelButton: true,
        cancelButtonText:"Annuler",
        confirmButtonText:'Changer',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value !== '') {
              resolve();
            } else {
              resolve('selectionner un statut');
            }
          });
        }
      }).then(function (result) {
        if (result.value) {
          AnnonceService.changeStatutAnnonce(id_annonce,result.value)
        }
      });
      // AnnonceService.changeStatutAnnonce(this.state.Annonce.id,"CL")
    }
    GetActions(){
      switch(this.state.type_action){
        case 1:
          return(
            <div>
            <div className="row">
              <button className="btn btn-primary col-md-2 offset-md-1" onClick={()=>{
                this.setState({showdemande:true})
              }} >Afficher les demmandes</button>
              <button className="btn btn-success col-md-2 offset-md-1" onClick={()=>this.ChangeStatus()}>Chnager le statut</button>
              <button className="btn btn-warning col-md-2 offset-md-1"  onClick={()=>this.Annuler()}>annuler</button>
            </div>
            </div>
          )
        case 2:
          return (
            <div className="row">
                <button className="btn btn-warning col-md-3 offset-md-3" onClick={()=>this.Annuler()}>Annuler</button>
                <button className="btn btn-success col-md-3 offset-md-1" onClick={()=>this.Affecter()} >Prise en charge</button>
            </div>
          )
        case 3:
          return(
            <div className="row">
            <button className="btn btn-warning col-md-3 offset-md-6" onClick={()=>this.Annuler()}>Annuler</button>
        </div>
          )
        case 4:
          return(
            <div className="row">
            <button className="btn btn-warning col-md-3 offset-md-3" onClick={()=>this.Annuler()}>Annuler</button>
            <button className="btn btn-success col-md-3 offset-md-1" onClick={()=>this.DemanderBien()} >Envoyer une demande</button>
             </div>
          )
      }
    }
    setStatus(status){
      switch(status){
        case "NV":
          return "Non validée"
        case "accept":
          return "Prise en charge"
         case "AI":
           return "Annonce illégale"
          case "CL":
            return "Annonce clotûrée"
      }
    }
    render(){

    const handleSelect = (selectedIndex, e) => {
        this.setState({index:selectedIndex});
    };
    const ImageTemplate = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="100%" height="350px" />
    if(this.state.closeDetail==0){
        return <AnnonceCard className="col-md-3" 
        image={this.props.image}
        status={this.state.Annonce.status} 
        type_bien={this.state.type_bien}
         type_ops={this.state.type_operation} 
         prix={this.state.Annonce.prix} 
        id_annonce={this.state.Annonce.id} 
        type_action={this.state.type_action}
        />
    }
    else
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>Annonce N° {this.state.Annonce.id}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6 mx-auto col-md-6 my-3 text-capitalize">
                    <Carousel activeIndex={this.state.Annonce.index} onSelect={handleSelect}>
                      {
                          this.state.Images.map((item)=>
                          <Carousel.Item>
                              <ImageTemplate data={item.image}/>
                            <Carousel.Caption>
                                <h3></h3>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                          
                          )
                      }
                        
                    </Carousel>
                </div>
                <div className="col-md-6">
                <h5 className="tetx-title text-uppercase text-muted mt-3 mb-2">

    Déposé <span className="text-uppercase">{localStorage.getItem("role")==null?"":"par : "+this.state.Annonce.nom_complet_proprietaire} le {this.state.Annonce.date}</span>
                  </h5>
                  <div className="row">
                  <h5 className="col-md-6">Type de bien: {this.state.type_bien}</h5>
                <h5 className="col-md-6">Type d'opération: {this.state.type_operation}</h5>
                </div>
                  <h5 className="text-blue row">
                    <strong className="col-md-6">
                      Prix : {this.state.Annonce.prix} <span>DH</span> 
                    </strong>
                    <strong className="col-md-6">
                    Superficie : {this.state.Annonce.surface} m²
                    </strong>
                  </h5>
                  {
                    localStorage.getItem("role")!=null ?
                    <div>
                  <h5 >
                    <strong>
                      Email : {this.state.Annonce.email}
                    </strong>
                    
                  </h5>
                  <h5 >
                    <strong>
                    Téléphone : {this.state.Annonce.telephone}
                    </strong>
                  </h5>
                  <h5 >
                    <strong>
                    Statut : {this.setStatus(this.state.Annonce.status)}
                    </strong>
                  </h5>
                  </div>
                  :
                  <h5></h5>
                  }
                  <h5 >
                    <strong>
                    Coordonnée : ({this.state.Annonce.lon},{this.state.Annonce.lat})
                    <button className="btn btn-primary" style={{marginLeft:"10px"}}
                    onClick={()=>this.setState({isModalOpen:true})}
                    >localisation <i className="fa fa-eye"></i></button>
                    </strong>
                  </h5>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Quelque informations sur le bien immobilier
                  </p>
                  <p className="text-muted lead " style={{width:"20px"}} >{this.state.Annonce.description}</p>
                     </div>
                     <div className="col-md-12">
                      
                     </div>

            </div>
            {
              this.GetActions()
            }
             <div>
            <Modal
            style={{height:"50px", width: "300px"}}
               isOpen={this.state.isModalOpen}
              contentLabel="Example Modal"
            >
            <div className='container'>
              <div className="row"
              >
              <ReactMapGL
                style={{
                  height:"50"
                }}
                {...this.state.viewport}
                mapboxApiAccessToken="pk.eyJ1IjoibWVka2FmY2hyYWl0IiwiYSI6ImNrazA5bzFqdzBmYWcyeHJyd3gxMzkzNzEifQ.0x8lrv6mP6Keq7a4xvW_pA"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                this.setState({viewport:viewport});
                }}
            
            >
              <button className="btn btn-warning"
                  onClick={()=>this.setState({isModalOpen:false})}
                  >Fermer</button>
                <Marker
                latitude={this.state.Annonce.lat}
                longitude={this.state.Annonce.lon}
                >
                  <img src="./assets/Icons/iconSelected.png" width="50px" height="50px"/>
                </Marker>
             </ReactMapGL>
              </div>
            </div>
            </Modal>
            {/* show demandes  */}
            <Modal
            style={{height:"50px", width: "300px"}}
               isOpen={this.state.showdemande}
              contentLabel="Example Modal"
            >
            <div className='container'>
              <div className="row"
              >
                <AfficherDemande  id_annonce={this.state.Annonce.id}/>
              </div>
              <div className="row">
              <button className=" offset-md-4 col-md-3 btn btn-success" onClick={()=>this.setState({showdemande:false})}>Retour </button>
              </div>
            </div>
            </Modal>
          </div>
        </div>
    );
}
}
export default DetailAnnonce;