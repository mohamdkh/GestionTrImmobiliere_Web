import React, { useState } from 'react';
import AnnonceService from './../../services/AnnonceService'
// import AnnonceCard from './AnnonceCard'
import Carousel from 'react-bootstrap/Carousel'
import { Redirect } from 'react-router-dom'
import {FilterContext} from './../../context/contexte'
import ReactMapGL, { Marker,FlyToInterpolator,NavigationControl,GeolocateControl , Popup } from "react-map-gl";
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
function DetailAnnonceGP(props) {
    const context = React.useContext(FilterContext);
    const [viewport, setViewport] = React.useState({
        latitude: 31.7923,
        longitude: -7.0801,
        width: "100vw",
        height: "100vh",
        zoom: 5
      });
    const [Images,setImages]=React.useState([])
    const [AnnonceParam,setAnnonceParam ]=React.useState({
        type_action:0,
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
         },
         type_bien:"",
         type_operation:"",
         index:0,
    })
  React.useEffect(()=>{
        AnnonceService.GetImagesAnnonce(props.id).then((result)=>{
            setImages(result.data)
        }).then(
            AnnonceService.GetAnnonceDetail(props.id).then((result)=>{
                setAnnonceParam({Annonce:result.data,
                    type_bien:props.type_bien,
                    type_operation:props.type_ops,
                    type_action:props.type_action
                })
                setViewport({
                    ...viewport,
                    latitude:result.data.lat,
                    longitude:result.data.lon
                })
                // console.log(this.state)
            })
        )
        
    },[])
    const Annuler=()=>{
        context.setvisibleDetail(false)
        }
    const Affecter=()=>{
    //   AnnonceService.AffectationAnnonceToInterm(localStorage.getItem("id"),this.state.Annonce.id)
    }
    const DemanderBien=()=>{
      AnnonceService.DemandeAnnonce(AnnonceParam.Annonce.id)

    }
    const AnnonceIllegale=()=>{
        AnnonceService.changeStatutAnnonce(AnnonceParam.Annonce.id,"AI")
    }
    const AfficherDemandes=()=>{
    // localStorage.setItem("idannonce",this.state.Annonce.id)
    // this.setState({redirect:true})
    }
    const cloturer=()=>{
      AnnonceService.changeStatutAnnonce(AnnonceParam.Annonce.id,"CL")
    }
    const GetActions=()=>{
    console.log(props.type_action)
      switch(props.type_action){
        case 1:
          return(
            <div>
            <div className="row">
              <button className="btn btn-primary col-md-2 offset-md-1" onClick={()=>AfficherDemandes()} >Afficher les demmandes</button>
              <button className="btn btn-success col-md-2 offset-md-1" onClick={()=>cloturer()}>cloturer</button>
              <button className=" btn btn-danger col-md-2 offset-md-1" onClick={()=>AnnonceIllegale()} >anoonce illégale</button>
              <button className="btn btn-warning col-md-2 offset-md-1"  onClick={()=>Annuler()}>annuler</button>
            </div>
            </div>
          )
        case 2:
          return (
            <div className="row">
                <button className="btn btn-warning col-md-3 offset-md-3" onClick={()=>Annuler()}>Annuler</button>
                <button className="btn btn-success col-md-3 offset-md-1" onClick={()=>Affecter()} >Prise en charge</button>
            </div>
          )
        case 3:
          return(
            <div className="row">
            <button className="btn btn-warning col-md-3 offset-md-6" onClick={()=>Annuler()}>Annuler</button>
        </div>
          )
        case 4:
          return(
            <div className="row">
            <button className="btn btn-warning col-md-3 offset-md-3" onClick={()=>Annuler()}>Annuler</button>
            <button className="btn btn-success col-md-3 offset-md-1" onClick={()=>DemanderBien()} >Envoyer une demande</button>
             </div>
          )
      }
    }
    const setStatus=(status)=>{
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

    const handleSelect = (selectedIndex, e) => {
        setAnnonceParam({
            ...AnnonceParam,
            index:selectedIndex});
    };
    const ImageTemplate = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="100%" height="350px" />
    // if(state.closeDetail==0){
    //     return <AnnonceCard className="col-md-3" type_bien={state.type_bien} type_ops={state.type_operation} prix={state.Annonce.prix} 
    //     id_annonce={this.state.Annonce.id}/>
    // }
//     else if(this.state.redirect){
//       return  <Redirect
//       to={{
//       pathname: "/showDemands"
//     }}
//   />
//     }
    // else
    return (
        <div className=" py-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>Annonce N° {AnnonceParam.Annonce.id}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4 mx-auto col-md-4 my-3 text-capitalize" style={{paddingLeft:"50px"}}>
                    <Carousel activeIndex={AnnonceParam.Annonce.index} onSelect={handleSelect}>
                      {
                          Images.map((item)=>
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
                <div className="col-md-4">
                <h5 className="tetx-title text-uppercase text-muted mt-3 mb-2">

    Déposé <span className="text-uppercase">{localStorage.getItem("role")==null?"":"par : "+AnnonceParam.Annonce.nom_complet_proprietaire} le {AnnonceParam.Annonce.date}</span>
                  </h5>
                  <div className="row">
                  <h5 className="col-md-6">Type de bien: {AnnonceParam.type_bien}</h5>
                <h5 className="col-md-6">Type d'opération: {AnnonceParam.type_operation}</h5>
                </div>
                  <h5 className="text-blue row">
                    <strong className="col-md-6">
                      Prix : {AnnonceParam.Annonce.prix} <span>DH</span> 
                    </strong>
                    <strong className="col-md-6">
                    Superficie : {AnnonceParam.Annonce.surface} m²
                    </strong>
                  </h5>
                  {
                    localStorage.getItem("role")!=null ?
                    <div>
                  <h5 >
                    <strong>
                      Email : {AnnonceParam.Annonce.email}
                    </strong>
                    
                  </h5>
                  <h5 >
                    <strong>
                    Téléphone : {AnnonceParam.Annonce.telephone}
                    </strong>
                  </h5>
                  <h5 >
                    <strong>
                    Statut : {setStatus(AnnonceParam.Annonce.status)}
                    </strong>
                  </h5>
                  </div>
                  :
                  <h5></h5>
                  }
                  <h5 >
                    <strong>
                    Coordonnée : ({AnnonceParam.Annonce.lon},{AnnonceParam.Annonce.lat})
                    </strong>
                  </h5>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Quelque informations sur le bien immobilier
                  </p>
                  <p className="text-muted lead">{AnnonceParam.Annonce.description}</p>
                     </div>
                     <div className="col-md-4" style={{paddingRight:"20px"}}>
                     <ReactMapGL
                            {...viewport}
                            mapboxApiAccessToken="pk.eyJ1IjoibWVka2FmY2hyYWl0IiwiYSI6ImNrazA5bzFqdzBmYWcyeHJyd3gxMzkzNzEifQ.0x8lrv6mP6Keq7a4xvW_pA"
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            onViewportChange={viewport => {
                            setViewport(viewport);
                            }}
                            height="350px"
                            width="500px"
                        >
                            <Marker
                                key={AnnonceParam.Annonce.id.id}
                                latitude={AnnonceParam.Annonce.lat}
                                longitude={AnnonceParam.Annonce.lon}
                            >
                                <img src="./assets/Icons/iconSelected.png" width="50px" height="50px"/>
                            </Marker>
                        
                            </ReactMapGL>
                     </div>

            </div>
            {
              GetActions()
            }
            
        </div>
    );
}
// }
export default DetailAnnonceGP;