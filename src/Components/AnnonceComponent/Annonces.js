import React, { Component } from 'react';
import AnnonceService from '../../services/AnnonceService'
import CommuneService from '../../services/CommuneService'
import {Region} from '../../assets/var/RegionData'
import AnnonceCard from './AnnonceCard'
class Annonces extends Component {

  state = {
    AllTypeBien:[],
    AllTypeOperation:[],
    Filtre:{
        TypeOps:"",
        Typelocation:"",
        region:"",
        commune:""
    },
    Communes:{}
  }

   constructor() {
    super();
    AnnonceService.GetAllTypeBien().then((res1)=>{
        this.setState({AllTypeBien:res1.data})
    }).then(
        AnnonceService.GetAllTypeOperation().then((res2)=>{
            this.setState({AllTypeOperation:res2.data})
           
            
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
  
  render() {
    return (
      <>
         <div  className="form-group row SelectArea">
            <select className="form-control col-md-2" name="Annee" title="Année" id="annee">
                <option selected="selected" value="" disabled>Type de bien</option>
                {
                this.state.AllTypeBien.map((item) =>
                    <option>{item.type}</option>
                    )
                }
            </select>
            <select className="form-control col-md-2" name="periode" title="Période" id="periode">
                <option selected="selected" disabled>Type d'opération</option>
                {
                this.state.AllTypeOperation.map((item) =>
                    <option>{item.type}</option>
                    )
                }
            </select>

            <select className="form-control col-md-3 " name="etage" title="Localité" id="etage"
               aria-valuemax="" value={this.state.Filtre.region}  onChange={(e)=>this.GetCommunes(e.target.value)}>
                <option selected disabled>Région</option>
                {
                Region.map((item) =>
                    <option>{item.label}</option>
                    )
                }
            </select>
            <select className="form-control col-md-3" id="secteur" title="secteur">
                <option selected disabled>Commune</option>
              {
                 Object.entries(this.state.Communes).map( ([key, value]) => 
              <option >{value}</option>
                 )
              }
            </select>
            <button className="btn btn-primary col-md-2" >Rechercher</button>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="row">
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>
            <AnnonceCard className="col-md-3"/>

            <AnnonceCard className="col-md-3"/>

            </div>
            <div className="row">
            <button className="col-md-2 offset-md-7 btn btn-primary">précédent</button>
              <button className="col-md-2 offset-md-1 btn btn-primary">suivant </button>
              
            </div>
          </div>

        </div>
      </>
    )
  }
}
export default Annonces;