import React, { Component, useState } from 'react';
import AnnonceService from '../../services/AnnonceService'

export default class AfficherDemande extends Component{
    state={
        Data:[],
        id:0
    }
    constructor(props){
        super();
        // this.setState({id:props.id_annonce})
        AnnonceService.GetDemandes(parseInt(localStorage.getItem("idannonce"))).then((result)=>{
            console.log(result)
            this.setState({Data:result.data})
        })
    }
    ValiderDemande(id){
        AnnonceService.ValiderDemande(id)
    }
    Retour(){
        window.location.href="/intermediaire#"
    }
    render(){
        return(
            <>
            <div className="container">
            <table class="" id="usertable ">
                                            <thead class=" text-primary row thead-dark">
                                                <th class="col-2 col-md-2 text-center" >Nom</th>
                                                <th class="col-2 col-md-2 text-center">Email</th>
                                                <th class="col-4 col-md-3 text-center">tel </th>
                                                <th class="col-4 col-md-3 text-center">Date </th>
                                                <th class="col-2 col-md-2 text-center">Action </th>
                                            </thead>
                                            <tbody >
                                            {
                                            this.state.Data.map((item) =>
                                                <tr className="row">
                                            <td class="col-2 col-md-2 text-center" >{item.nom_demandeur}</td>
                                                <td class="col-2 col-md-2 text-center">{item.email}</td>
                                                <td class="col-4 col-md-3 text-center">{item.tel} </td>
                                                <td class="col-4 col-md-3 text-center">{item.date}</td>
                                                <td class="col-2 col-md-2 text-center"><button className="btn btn-primary" onClick={()=>this.ValiderDemande(item.id)} disabled={item.status=="en cours"?false:true}>valider</button> </td>
                                                </tr>
                                            )
                                                }
                                              </tbody>
              </table>
              <div className="row">
              <button className="offset-md-4 col-md-3 btn btn-success" onClick={()=>this.Retour()}>Retour </button>
              </div>
              
              </div>
            </>
        )
    }
}