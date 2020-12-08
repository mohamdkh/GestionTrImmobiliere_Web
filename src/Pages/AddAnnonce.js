import React, { Component } from 'react';
import ProgressBarAnnonce from '../Components/Add-Annonce/ProgressBarAnnonce'
import '../Styles/Register.css'
import AnnonceService from './../services/AnnonceService'
import $ from 'jquery';
import Swal from 'sweetalert2'
class AddAnnonce extends Component {
    state = {
        AllTypeBien: [],
        AllTypeOperation: [],
        listPictures:[],
        steps: 1,
        current: 1,
        current_fs: undefined,
        next_fs: undefined,
        previous_fs: undefined,

        opacity: undefined,
        selectedFile: File,
        drapo: 0,

        Annonce: {
                id:1,
                type_bien:"",
                type_operation:"",
                surface:0,
                prix:0,
                description:"",
                nom_complet_proprietaire:"",
                telephone:"",
                email:""
        }

    }
    constructor() {
        super();
        this.steps = document.getElementsByTagName("fieldset").length;
        //get operation and contract types
        AnnonceService.GetAllTypeBien().then((res1) => {
            this.setState({ AllTypeBien: res1.data })
        }).then(
            AnnonceService.GetAllTypeOperation().then((res2) => {
                this.setState({ AllTypeOperation: res2.data })
            })
        )
    }
    UploadFile=event=>{
        if(this.state.listPictures.length<4){
            this.setState({selectedFile:event.target.files[0]})
            AnnonceService.UploadFile(event.target.files[0],this.state.Annonce.id)
            this.state.listPictures.push({name:event.target.files[0].name})
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "le nombre d'images ne doit pas dépasser 4",
              })
        }
       
    }
    OnClickNext(idElement) {
        this.state.current_fs = $("#" + idElement.toString());
        this.state.next_fs = $("#" + idElement.toString()).next();
        //Add Class Active
        const listItems = document.querySelectorAll('#cssmenu ul li');
        for (let i = 0; i < listItems.length; i++) {
            if(listItems[i].classList.contains("active")){
                listItems[i].classList.remove("active")
                listItems[i].previousElementSibling.classList.add("active")
            }
            }

        //show the next fieldset
        this.state.next_fs.show();
        this.state.current_fs.hide();
        // console.log(this.state)
    }
    OnClickPrevious(idElement) {
        this.state.current_fs = $("#" + idElement.toString());
        this.state.previous_fs = $("#" + idElement.toString()).prev();
        //Remove class active

        //show the previous fieldset
        this.state.previous_fs.show();
        this.state.current_fs.hide();
    }
    changehandler=(e)=>{
        const {name, value} = e.target
        this.setState(prevState => ({
            Annonce: {
              // spread old values into this object so you don't lose any data
              ...prevState.Annonce,
              // update this field's value
              [name]: value
            }
        }))
    }
    SendData(){
        AnnonceService.SendData(this.state.Annonce, this.state.AllTypeBien,this.state.AllTypeOperation)
    }
    AnnulerOps(){

    }
    render() {
        const { Annonce } = this.state;
        return (
            <>
                <ProgressBarAnnonce />
                <div className="container">
                    <div className="scrollbar " id="msform">
                        <fieldset id="infosPersonnelle">
                            <div className="form-card">
                                <div className="row">
                                    <div className="col-7">
                                        <h2 className="fs-title">Informations générales:</h2>
                                    </div>
                                    <div className="col-5">
                                        <h2 className="steps">Etape 1 - 3</h2>
                                    </div>
                                </div>
                                <input type="email" value={Annonce.email} name="email" placeholder="Email " onChange={this.changehandler} required />
                                <input type="text" value={Annonce.nom_complet_proprietaire} name="nom_complet_proprietaire" placeholder="Nom Complet" onChange={this.changehandler} required/>
                                <input type="text" value={Annonce.telephone} name="telephone" placeholder="Téléphone" onChange={this.changehandler} required />
                            </div>
                            <input type="button" name="next" className="next action-button" value="Continuer"
                                onClick={() => this.OnClickNext('infosPersonnelle')}
                                style={{ marginRight: '10px' }} />
                        </fieldset>
                        <fieldset id="importPhotos">
                            <div className="form-card">
                                <div className="row">
                                    <div className="col-7">
                                        <h2 className="fs-title">Description :</h2>
                                    </div>
                                    <div className="col-5">
                                        <h2 className="steps">Etape 2 - 3</h2>
                                    </div>
                                </div>
                                <textarea id="w3review" value={Annonce.description} name="description" rows="4" cols="50" placeholder="Ensoleillé toute la journée, profitez d'un emplacement idéal proche du marché, convivial et animé. Le salon vous ravira par ses volumes accueillants..." onChange={this.changehandler} required></textarea>
                                <div className="row">
                                <select className="form-control col-md-5" value={Annonce.type_bien} name="type_bien" title="Année" id="annee" onChange={this.changehandler} required>
                                    <option selected="selected" value="" disabled>Type de bien</option>
                                    {
                                        this.state.AllTypeBien.map((item) =>
                                            <option>{item.type}</option>
                                        )
                                    }
                                </select>
                                <select  className="form-control col-md-5 offset-md-2" value={Annonce.type_operation} name="type_operation" onChange={this.changehandler} required>
                                    <option selected="selected" disabled>Type d'opération</option>
                                    {
                                        this.state.AllTypeOperation.map((item) =>
                                            <option>{item.type}</option>
                                        )
                                    }
                                </select>
                                <hr/>
                                <label className="fieldlabels col-md-5">Surface:</label>
                                <label className="fieldlabels col-md-5 offset-md-2">Prix:</label>
                                <input className="col-md-5" type="text" value={Annonce.surface} name="surface" placeholder="Surface" onChange={this.changehandler} required/>
                                <input className="col-md-5 offset-md-2" value={Annonce.prix} type="text" name="prix" placeholder="Prix" onChange={this.changehandler} required/>
                                </div>
                                <label className="fieldlabels">Importer les photos de bien:</label>
                                <input type="file" name="pic" accept="image/*" id="fileuploaded"  onChange={this.UploadFile}/>
                                <span><strong>Les images importées :</strong></span>
                                <ul className="row" title="liste des images importées">
                                    {
                                        this.state.listPictures.map((picture)=>
                                        <li className="col-md-3">{picture.name}</li>
                                        )
                                    }
                                </ul>
                            </div>
                            <input type="button" name="Continuer" className="next action-button" value="Continuer"
                                onClick={() => this.OnClickNext('importPhotos')}
                                style={{ marginRight: '10px' }} />
                            <input
                                type="button" name="previous" className="previous action-button-previous"
                                value="Retour"
                                onClick={() => this.OnClickPrevious('importPhotos')}
                            />
                        </fieldset>
                        <fieldset id="finish">
                            <div className="form-card">
                                <div className="row">
                                    <div className="col-7">
                                        <h2 className="fs-title">Finalisation:</h2>
                                    </div>
                                    <div className="col-5">
                                        <h2 className="steps">Etape 3 - 3</h2>
                                    </div>
                                </div> <br /><br />
                                <h2 className="purple-text text-center"><strong>Validation</strong></h2> <br />
                                <div className="row justify-content-center">
                                    <div className="col-3"> <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" />
                                    </div>
                                </div> <br /><br />
                                <div className="row justify-content-center" />
                                <div className="col-12 text-center row">
                                    <button className="btn btn-danger col-md-3"  onClick={() => this.AnnulerOps()}>Annuler l'opération</button>
                                    <button className="btn btn-success col-md-3 offset-md-3"  onClick={() => this.SendData()}>Valider l'opération</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </>
        );
    }
}
export default AddAnnonce;