import React, { Component } from 'react';
import ProgressBarAnnonce from '../Components/Add-Annonce/ProgressBarAnnonce'
import '../Styles/Register.css'
import AnnonceService from './../services/AnnonceService'
import Carousel from 'react-bootstrap/Carousel'
import $ from 'jquery';
import Swal from 'sweetalert2'
import { Result } from 'antd';
class AddAnnonce extends Component {
     ImageTemplate = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="100%" height="100%" />
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
        selectedFiles: [],
        drapo: 0,

        Annonce: {
                type_bien:"",
                type_operation:"",
                surface:0,
                prix:0,
                description:"",
                nom_complet_proprietaire:"",
                telephone:"",
                email:"",
                lat:0,
                lon:0
        }

    }
    constructor() {
        super();
        var url = new URL(window.location.href.toString());
        var lon = url.searchParams.get("lon");
        var lat = url.searchParams.get("lat");
        this.steps = document.getElementsByTagName("fieldset").length;
        //get operation and contract types
        AnnonceService.GetAllTypeBien().then((res1) => {
            this.setState({ AllTypeBien: res1.data,
             })
        }).then(
            AnnonceService.GetAllTypeOperation().then((res2) => {
                this.setState({ AllTypeOperation: res2.data,Annonce:{
                    lat:parseFloat(lat),
                    lon:parseFloat(lon)
                } })
            })
        )
    }
    ShowPicture(elem){
        Swal.fire({
            title: 'Image selectionnée!',
            text: elem.name,
            imageUrl: URL.createObjectURL(elem),
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            reverseButtons: true
          }).then((result)=>{
            if (result.isConfirmed) {
                this.setState({
                    selectedFiles:this.state.selectedFiles.filter(el => el != elem )
                })
            }
          })
    }
    UploadFile=event=>{
        // console.log(this.state.selectedFiles)
        if(this.state.selectedFiles.length<4){
            this.state.selectedFiles.push( event.target.files[0])
            //AnnonceService.UploadFile(event.target.files[0],this.state.Annonce.id)
            this.state.listPictures.push(event.target.files[0].name)
            this.setState({
                selectedFiles:this.state.selectedFiles
            })
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
        AnnonceService.SendData(this.state)
        window.location.href="/Accueil"
    }
    AnnulerOps(){
        window.parent.location ="/Accueil"
    }
    render() {
        const handleSelect = (selectedIndex, e) => {
            this.setState({index:selectedIndex});
        };
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
                                <label className="fieldlabels col-md-5">Superficie (m²):</label>
                                <label className="fieldlabels col-md-5 offset-md-2">Prix (dh):</label>
                                <input className="col-md-5" type="text" value={Annonce.surface} name="surface" placeholder="Surface" onChange={this.changehandler} required/>
                                <input className="col-md-5 offset-md-2" value={Annonce.prix} type="text" name="prix" placeholder="Prix" onChange={this.changehandler} required/>
                                </div>
                                <label className="fieldlabels">Importer les photos de bien:</label>
                                <input type="file" name="pic" accept="image/*" id="fileuploaded"  onChange={this.UploadFile}/>
                                <span><strong>Les images importées :</strong></span>
                                <ul className="row" title="liste des images importées">
                                    {
                                        
                                         this.state.selectedFiles.map((elem)=>
                                            <li className="col-md-3"><a href="#" onClick={()=>this.ShowPicture(elem)}>{elem.name}</a></li>
                                            )
                                        // this.state.listPictures.map((picture)=>
                                       
                                        // )
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
                                <div className="row">
                                    <div className="col-6 mx-auto col-md-6 my-3 text-capitalize">
                                        <Carousel  onSelect={handleSelect}>
                                            {
                                                this.state.selectedFiles.map((item) =>
                                                    <Carousel.Item>
                                                       <img src={ URL.createObjectURL(item)}  width="100%" height="350px" />
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
                                        <h5 className="tetx-title text-uppercase text-muted mt-3 mb-2">Déposé <span className="text-uppercase"> par {this.state.Annonce.nom_complet_proprietaire} </span>
                                        </h5>
                                        <div className="row">
                                            <h5 className="col-md-6">Type de bien: {this.state.Annonce.type_bien}</h5>
                                            <h5 className="col-md-6">Type d'opération: {this.state.Annonce.type_operation}</h5>
                                        </div>
                                        <h5 className="text-blue row">
                                            <strong className="col-md-6">
                                                Prix : {this.state.Annonce.prix} <span>DH</span>
                                            </strong>
                                            <strong className="col-md-6">
                                                Superficie : {this.state.Annonce.surface} m²
                                                    </strong>
                                        </h5>
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
                                        </div>
                                        <h5 >
                                            <strong>
                                                Coordonnée : ({this.state.Annonce.lon},{this.state.Annonce.lat})
                                                    </strong>
                                        </h5>
                                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                            Description
                                                </p>
                                        <p className="text-muted lead">{this.state.Annonce.description}</p>
                                    </div>
                                    <div className="col-md-12">

                                    </div>

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