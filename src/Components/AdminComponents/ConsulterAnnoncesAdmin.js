import React, { Component } from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './../AnnonceComponent/AnnonceCard'
import {Region} from '../../assets/var/RegionData'
import CommuneService from './../../services/CommuneService'
const Statuts=[
  {
    "abr":"NV",
    "Description":"Non validée"
  },
  {
    "abr":"CL",
    "Description":"Clotûrer"
  },
  {
    "abr":"Accepter",
    "Description":"prise en charge"
  },
  {
    "abr":"AI",
    "Description":"illégale"
  },
]
class ConsulterAnnonceAdmin extends Component {

  state = {
    Annonces:[],
    resultAnnonces:[],
    AllTypeBien:[],
    AllTypeOperation:[],
    Filtre:{
        TypeOps:"",
        Typelocation:"",
        region:"",
        commune:"",
        statut:""
        },
    Communes:{},
    type_bien:"",
    type_ops:"",
    limite:0
    
  }

   constructor() {
    super();
    AnnonceService.GetAllTypeBien().then((res1)=>{
        this.setState({AllTypeBien:res1.data})
    }).then(
        AnnonceService.GetAllTypeOperation().then((res2)=>{
            this.setState({AllTypeOperation:res2.data})
           
            
        })
    ).then(
        AnnonceService.GetAllAnnonces().then((res3)=>{
            this.setState({Annonces:res3.data})
            this.setState({resultAnnonces:res3.data})
            this.FetchData(1)
        })
    )
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
else if(name=="statut"){
  let status;
  Statuts.forEach(stat=>{
    if(stat.Description==value){
      status=stat.abr
    }
})
this.setState({ Annonces: [] })
this.state.resultAnnonces.map((annonce) => {
  if (status == annonce.status) {
      this.setState(previousState => ({
          Annonces: [...previousState.Annonces, annonce]
      }))  
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
         <div  className="form-group row SelectArea">
            <select className="form-control col-md-2" name="type_bien" title="type bien" id="type_bien"
             onChange={this.changehandler}
            >
                <option selected="selected" value="" disabled>Type de bien</option>
                {
                this.state.AllTypeBien.map((item) =>
                    <option>{item.type}</option>
                    )
                }
            </select>
            <select className="form-control col-md-2" name="type_ops" title="Type d'opération" id="type_ops"
             onChange={this.changehandler}
            >
                <option selected="selected" disabled>Type d'opération</option>
                {
                this.state.AllTypeOperation.map((item) =>
                    <option>{item.type}</option>
                    )
                }
            </select>

            <select className="form-control col-md-2 " name="region" title="Region" id="region"
               aria-valuemax="" value={this.state.Filtre.region}  onChange={(e)=>this.GetCommunes(e.target.value)}>
                <option selected disabled>Région</option>
                {
                Region.map((item) =>
                    <option>{item.label}</option>
                    )
                }
            </select>
            <select className="form-control col-md-3" name="commune" id="commune" title="Commune"
             onChange={this.changehandler}
            >
                <option selected disabled>Commune</option>
              {
                 Object.entries(this.state.Communes).map( ([key, value]) => 
              <option >{value}</option>
                 )
              }
            </select>
            <select className="form-control col-md-3 " name="statut" title="Statut" id="statut"
               aria-valuemax=""   onChange={this.changehandler}>
                <option selected disabled>Statut</option>
                {
                Statuts.map((item) =>
                    <option>{item.Description}</option>
                    )
                }
            </select>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="row">
            {
                this.state.Annonces.map((item) =>
                <AnnonceCard className="col-md-3" type_bien={this.getTypeBien(item.type_bien)} type_ops={this.getTypeOperation(item.type_operation)} prix={item.prix} 
                id_annonce={item.id} type_action={3} status={item.status}/>
                    )
                    
                }
                
            </div>
            <div className="row">
            <button className="col-md-2 offset-md-7 btn btn-primary" onClick={()=>this.FetchData(-1)}>précédent</button>
              <button className="col-md-2 offset-md-1 btn btn-primary" onClick={()=>this.FetchData(1)}>suivant </button>
              
            </div>
          </div>

        </div>
      </>
    )
  }
}
export default ConsulterAnnonceAdmin;