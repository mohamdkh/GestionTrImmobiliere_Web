import React, { Component } from 'react';
import Home from './Home'
import { Region } from '../assets/var/RegionData'
import AnnonceService from '../services/AnnonceService'
import CommuneService from '../services/CommuneService'
import AnnonceGP from '../Components/GrandPublic/AnnonceGP'
export default class HomePage extends Component {
    state={
    AllTypeBien:[],
    AllTypeOperation:[],
    TypeOps:"",
    type_bien:"",
        region:"",
        commune:"",
    typeAffichage:"Liste",
    Communes:{}
    }
    constructor() {
        super()
        AnnonceService.GetAllTypeBien().then((res1)=>{
            this.setState({AllTypeBien:res1.data})
        }).then(
            AnnonceService.GetAllTypeOperation().then((res2)=>{
                this.setState({AllTypeOperation:res2.data})
            })
        )
    }
    changehandler=(e)=>{
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
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
      ApplyFilters(){

      }
      ToggleListAndMap(){
          if(this.state.typeAffichage=="Liste"){
              this.setState({typeAffichage:"Map"})
          }
          else{
            this.setState({typeAffichage:"Liste"})
          }
      }
    render() {
        return (
            <>
                <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar">
                        <ul class="list-unstyled components mb-6">
                            <li class="row" id='bloc1'>
                                <select className="form-control" name="type_bien" title="type bien" id="type_bien"
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                 onChange={this.changehandler}
                                >
                                    <option selected="selected" value="" disabled>Type de bien</option>
                                    {
                this.state.AllTypeBien.map((item) =>
                    <option>{item.type}</option>
                    )
                }
                                </select>
                            </li>
                            <li class="row" id='bloc2'>
                                <select className="form-control" name="TypeOps" title="Type d'opération" id="type_ops"
                                     onChange={this.changehandler}
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                >
                                    <option selected="selected" disabled>Type d'opération</option>
                                    {
                                this.state.AllTypeOperation.map((item) =>
                                    <option>{item.type}</option>
                                    )
                                }
                                </select>

                            </li>
                            <li class="row" id='bloc1'>
                                <select className="form-control " name="region" title="Region" id="region"
                                    aria-valuemax=""
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                  onChange={(e)=>this.GetCommunes(e.target.value)}
                                >
                                    <option selected disabled>Région</option>
                                    {
                                        Region.map((item) =>
                                            <option>{item.label}</option>
                                        )
                                    }
                                </select>
                            </li>
                            <li class="row" id='bloc1'>
                                <select className="form-control" name="commune" id="commune" title="Commune"
                                     onChange={this.changehandler}
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                >
                                    <option selected disabled>Commune</option>
                                    {
                                    Object.entries(this.state.Communes).map( ([key, value]) => 
                                <option >{value}</option>
                                    )
                                }
                                </select>
                            </li>
                            <li class="row" id='bloc1' style={{ marginTop: "30px", marginRight: "17px" , marginLeft:"10px"}}>
                                <button className="btn btn-primary col-md-12"
                                onClick={()=>this.ApplyFilters()}
                                >Appliquer </button>
                            </li>
                            <li class="row" id='bloc1' style={{ marginTop: "30px", marginRight: "17px",marginLeft:"10px" }}>
                                <button className="btn btn-primary col-md-12"
                                onClick={()=>this.ToggleListAndMap()}
                                >{this.state.typeAffichage} </button>
                            </li>
                            
                        </ul>

                    </nav>
                    <div id="content" >
                        {
                            this.state.typeAffichage=="Liste"?
                            <Home /> 
                            :
                            <AnnonceGP type_bien={this.state.type_bien} TypeOps={this.state.TypeOps}
                            commune={this.state.commune}
                            />
                        }
                        
                       
                    </div>
                </div>
            </>
        )
    }
}