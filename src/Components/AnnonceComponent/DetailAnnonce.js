import React, { Component, useState } from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './AnnonceCard'
import Carousel from 'react-bootstrap/Carousel'
import { Redirect } from 'react-router-dom'

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
        status:""
     }
     ,
     redirect:false,
     Images :[]
     
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
                    type_action:props.type_action
                })
                console.log(this.state)
            })
        )
        
    }
    Annuler(){
        this.setState({closeDetail:0})
        return <AnnonceCard className="col-md-3" status={this.state.Annonce.status} type_bien={this.state.type_bien} type_ops={this.state.type_operation} prix={this.state.Annonce.prix} 
        id_annonce={this.state.Annonce.id} type_action={this.state.type_action}/>
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
    cloturer(){
      AnnonceService.changeStatutAnnonce(this.state.Annonce.id,"CL")
    }
    GetActions(){
      switch(this.state.type_action){
        case 1:
          return(
            <div>
            <div className="row">
              <button className="btn btn-primary col-md-2 offset-md-1" onClick={()=>this.AfficherDemandes()} >Afficher les demmandes</button>
              <button className="btn btn-success col-md-2 offset-md-1" onClick={()=>this.cloturer()}>cloturer</button>
              <button className=" btn btn-danger col-md-2 offset-md-1" onClick={()=>this.AnnonceIllegale()} >anoonce illégale</button>
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
        return <AnnonceCard className="col-md-3" type_bien={this.state.type_bien} type_ops={this.state.type_operation} prix={this.state.Annonce.prix} 
        id_annonce={this.state.Annonce.id}/>
    }
    else if(this.state.redirect){
      return  <Redirect
      to={{
      pathname: "/showDemands"
    }}
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
                    </strong>
                  </h5>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Quelque informations sur le bien immobilier
                  </p>
                  <p className="text-muted lead">{this.state.Annonce.description}</p>
                     </div>
                     <div className="col-md-12">
                      
                     </div>

            </div>
            {
              this.GetActions()
            }
            
        </div>
    );
}
}
export default DetailAnnonce;