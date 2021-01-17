import React, { Component } from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './../AnnonceComponent/AnnonceCard'
import {Region} from '../../assets/var/RegionData'
import CommuneService from './../../services/CommuneService'
import Pagination from "react-js-pagination";
import "./../../Styles/pagination.css"
class AnnonceGP extends Component {

  state = {
    Annonces:[],
    resultAnnonces:[],
    AllTypeBien:[],
    AllTypeOperation:[],
        TypeOps:"",
        typebien:"",
        commune:"",
    Communes:{},
    type_bien:"",
    type_ops:"",
    limite:1,
    //pagination 
    activePage: 1,
    itemsCountPerPage:4,
    totalItemsCount:0
    
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber,
    });
    AnnonceService.GetAcceptsAnnonces().then((res3)=>{
      this.setState({Annonces:res3.data.slice(this.state.itemsCountPerPage*(pageNumber-1),this.state.itemsCountPerPage*pageNumber)
      })
    })
  }
   constructor(props) {
    super(props);
    AnnonceService.GetAllTypeBien().then((res1)=>{
        this.setState({AllTypeBien:res1.data
        })
    }).then(
        AnnonceService.GetAllTypeOperation().then((res2)=>{
            this.setState({AllTypeOperation:res2.data})    
        })
    ).then(
        AnnonceService.GetAcceptsAnnonces().then((res3)=>{
            this.setState({Annonces:res3.data.slice(0,this.state.itemsCountPerPage),
              totalItemsCount:res3.data.length
            })
            this.setState({resultAnnonces:res3.data})
            //this.FetchData(1)
            this.FilterData(this.props.type_bien,this.props.TypeOps,this.props.commune)
        })
    )
  }
  FilterData(typebien,typeOps,commune){
    let id=0;
    if(typebien!=""){
      this.state.AllTypeBien.map((item)=>{
        console.log("je rentre")
        if(item.type==typebien){
          this.setState({Annonces:[]})
          id=item.id
          this.state.resultAnnonces.map((annonce)=>{
            if(annonce.type_bien==id){
              this.setState(previousState => ({
                Annonces: [...previousState.Annonces, annonce]
            }));
            }
          })
        }
      })
    }
    if(typeOps!=""){
      this.state.AllTypeOperation.map((item)=>{
        if(item.type==typeOps){
          this.setState({Annonces:[]})
          id=item.id
          this.state.resultAnnonces.map((annonce)=>{
            if(annonce.type_operation==id){
              this.setState(previousState => ({
                Annonces: [...previousState.Annonces, annonce]
            }));
            }
          })
        }
      })
    }
    if(commune!=""){
      Object.entries(this.state.Communes).map(([key, val]) => {
        if (val == commune) {
            this.setState({ Annonces: [] })
            id = key;
            this.state.resultAnnonces.map((annonce) => {
                if (id == annonce.commune) {
                    this.setState(previousState => ({
                        Annonces: [...previousState.Annonces, annonce]
                    }))  
            }
            })
        }
    })
    }
   
  }
  GetCommunes(value){
    let idRegion=0;
    Region.forEach(region=>{
        if(region.label==value){
            idRegion=region.id
        }
    })

    CommuneService.GetCommune(idRegion.toString()).then(response => {
        response.data.forEach(element => {
            let tab = element.split(";");
            this.state.Communes[tab[0]] = tab[1];
        });
        
    })
    this.setState({Filtre:{
                    region:value
                }})
     
    
  }
  getTypeBien(id_type){
      let type_bien=""
    this.state.AllTypeBien.map((item) =>{
        if(item.id==id_type)
        type_bien= item.type
    })
    return type_bien;
  }
  getTypeOperation(id_type){
    let type_Operation=""
  this.state.AllTypeOperation.map((item) =>{
      if(item.id==id_type)
      type_Operation= item.type
  })
  return type_Operation;
}
changehandler=(e)=>{
  const {name, value} = e.target
  let id=0;
 if(name=="type_bien"){
  this.state.AllTypeBien.map((item)=>{
    if(item.type==value){
      this.setState({Annonces:[]})
      id=item.id
      this.state.resultAnnonces.map((annonce)=>{
        if(annonce.type_bien==id){
          this.setState(previousState => ({
            Annonces: [...previousState.Annonces, annonce]
        }));
        }
      })
    }
  })
 }
 else if(name=="type_ops"){
  this.state.AllTypeOperation.map((item)=>{
    if(item.type==value){
      this.setState({Annonces:[]})
      id=item.id
      this.state.resultAnnonces.map((annonce)=>{
        if(annonce.type_operation==id){
          this.setState(previousState => ({
            Annonces: [...previousState.Annonces, annonce]
        }));
        }
      })
    }
  })
 }
    else if (name == "commune") {
        Object.entries(this.state.Communes).map(([key, val]) => {
            if (val == value) {
                this.setState({ Annonces: [] })
                id = key;
                this.state.resultAnnonces.map((annonce) => {
                    if (id == annonce.commune) {
                        this.setState(previousState => ({
                            Annonces: [...previousState.Annonces, annonce]
                        }))  
                }
                })
            }
        })
}
}
FetchData(facteur){
  if(this.state.resultAnnonces.length>(this.state.limite+facteur*8) && this.state.limite>=0){
    this.setState({limite:this.state.limite+facteur*8})
    this.setState({Annonces:[]})
    let iterator=0;
    this.state.resultAnnonces.map((item) =>{
      if(iterator<this.state.limite && iterator>=(this.state.limite-8)){
        this.setState(previousState => ({
          Annonces: [...previousState.Annonces, item]
      }))
      }
      iterator++
    })
  }
  }
  render() {
    return (
      <>
        <div className="py-5">
          <div className="container">
            <div className="row">
            {
                this.state.Annonces.map((item) =>
                <AnnonceCard className="col-md-3" type_bien={this.getTypeBien(item.type_bien)} type_ops={this.getTypeOperation(item.type_operation)} prix={item.prix} 
                id_annonce={item.id} type_action={4} />
                    )
                    
                }
                
            </div>
            <div className="row">
            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
            </div>
          </div>

        </div>
      </>
    )
  }
}
export default AnnonceGP;