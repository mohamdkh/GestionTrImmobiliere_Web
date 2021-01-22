import React, { Component } from 'react';
import Swal from 'sweetalert2'
import IntermediaireService from '../../services/IntermediaireService'
export default class Profile extends Component {
    state = {
        intermmediare: {
            nom: "Mohamed",
            prenom: "Khafchrait",
            email: "Mohamedkhafchrait@gmail.com",
            tel: "+212642728496",
            commune1: "commune 1",
            commune2: "commune 2",
            commune3: "commune 3",
            id_user: 0,
            id_piece_justif: 0,
            password: "dfgjklgfkgj,jgf",
            adresse: "Adresse 1 ",
        },
        displaypassword:""
    }
    constructor(){
        super()
           this.state.intermmediare.adresse=localStorage.getItem("adresse") 
            this.state.intermmediare.commune1=localStorage.getItem("commune1") 
            this.state.intermmediare.commune2= localStorage.getItem("commune2") 
            this.state.intermmediare.commune3= localStorage.getItem("commune3") 
            this.state.intermmediare.email= localStorage.getItem("email") 
            this.state.intermmediare.id=  localStorage.getItem("id") 
            this.state.intermmediare.id_piece_justif= localStorage.getItem("id_piece_justif") 
            this.state.intermmediare.id_user= localStorage.getItem("id_user") 
            this.state.intermmediare.nom= localStorage.getItem("nom") 
            this.state.intermmediare.password=localStorage.getItem("password") 
            this.state.intermmediare.prenom= localStorage.getItem("prenom") 
            this.state.displaypassword=this.state.intermmediare.password
            //this.state.intermmediare.role=localStorage.getItem("role") 
    }
    ChangePassword(){
        Swal.fire({
            title: 'Saisir le mot de passe',
            input: 'text',
            inputValue:this.state.displaypassword,
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Changer',
            cancelButtonText:'Annuler',
            showLoaderOnConfirm: true,
          }).then((result) => {
            if (result.isConfirmed) {
                IntermediaireService.ChangePassword(this.state.intermmediare.id,result.value)
                this.setState({displaypassword:result.value})
                this.state.intermmediare.password=localStorage.setItem("password",result.value) 
              Swal.fire({
                title: 'Votre nouveau mot de passe <br/>'+result.value,
                imageUrl: result.value
              })
            }
          })
    }
    render() {
        return(
            <>
            <div className="main col-12" id="users">
                        <div className="container">
                            <div className="row">
                                <div class="col-md-3">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Nom complet :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                           {this.state.intermmediare.nom} {this.state.intermmediare.prenom}
                                         </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Email :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.intermmediare.email}
                                         </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Téléphone :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.intermmediare.tel}
                                         </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Adresse :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.intermmediare.adresse}
                                         </div>
                                    </div>
                                </div>
                                <div class="col-md-5 offset-md-1">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Communes sélectionnées :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                         <ul>
                                             <li> {this.state.intermmediare.commune1}</li>
                                             <li> {this.state.intermmediare.commune2}</li>
                                             <li> {this.state.intermmediare.commune3}</li>
                                         </ul>
                                         </div>
                                    </div>
                                </div>
                               
                                <div class="col-md-5">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Mot de passe :</h5>
                                        </div>
                                        <div className="text scrollablediv"  >
                                         <div className="row offset-md-1"> *************</div>
                                         <button className="btn btn-danger row offset-md-5" onClick={()=>this.ChangePassword()}>Changer le mot de passe</button>
                                         </div>
                                       
                                    </div>
                                </div>
                              
                            </div>

                        </div>
                    </div>
            </>
        )
    }
}