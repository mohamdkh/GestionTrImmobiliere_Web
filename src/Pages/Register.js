import React, { Component } from 'react';
import alertImage from '../assets/attention.png'
import * as FaIcons from 'react-icons/fa';
import '../Styles/Register.css'
import $ from 'jquery';
import Commune from '../Components/Commune';
import Swal from 'sweetalert2'
import RegisterService from '../services/RegisterService';
class Register extends Component {
    state = {
        steps: 1,
        current: 1,
        current_fs: undefined,
        next_fs: undefined,
        previous_fs: undefined,
        opacity: undefined,
        selectedFile:File,
        drapo: 0,
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        adresse: '',
        password: '',
        commune1:'',
        commune2:'',
        commune3:'',
        confirmPassword:''
    }
    constructor() {
        super();
        document.body.style.background="none"
        this.steps = document.getElementsByTagName("fieldset").length;
        this.setProgressBar(this.current);
    }
    setProgressBar(curStep) {
        var percent = (100 / this.steps) * curStep;
        //this.percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%")
    }
    OnClickNext(idElement) {
        this.state.current_fs = $("#" + idElement.toString());
        this.state.next_fs = $("#" + idElement.toString()).next();
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(this.state.next_fs)).addClass("active");

        //show the next fieldset
        if(this.current==1){
          if(this.state.confirmPassword!=this.state.password || this.state.confirmPassword==""){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Les mots de passe que vous avez entré ne sont pas identiques.',
            })
            this.state.drapo=1;
          }
        }
        if (this.state.drapo == 0) {
            this.state.next_fs.show();
            this.state.current_fs.hide();
            this.setProgressBar(++this.current);
        }
       // console.log(this.state)
    }
    OnClickPrevious(idElement) {
        this.state.current_fs = $("#" + idElement.toString());
        this.state.previous_fs = $("#" + idElement.toString()).prev();
        //Remove class active
        $("#progressbar li").eq($("fieldset").index(this.state.current_fs)).removeClass("active");

        //show the previous fieldset
        this.state.previous_fs.show();
        this.state.current_fs.hide();
        this.setProgressBar(--this.current);
        
    }
    UploadFile=event=>{
        // event.preventDefault();
        // this.state.selectedFile=event.target.files[0];
        this.setState({selectedFile:event.target.files[0]})
    }
    Submit() {
        var drapo=0;
        if(this.state.confirmPassword!=this.state.password){
            console.log("yeaah")
        }
        else if(localStorage.getItem("commune1")==null || localStorage.getItem("commune2")==null || localStorage.getItem("commune3")==null ){

        }
        else{
            RegisterService.saveUser(this.state.nom,this.state.prenom,this.state.email,this.state.phone,this.state.adresse,this.state.password,this.state.selectedFile);
            this.OnClickNext('importJustif');
        }
       
    }

    changehandler=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        const { nom,prenom, email, phone,adresse, password,commune1,commune2,commune3 } = this.state;
        return (
            <>
                <div class="container-fluid col-md-12 col-lg-12">
                    <div class="row justify-content-center">
                        <div class="col-3" style={{ marginTop: '10%' }}>
                            <h2 id="heading">S'inscrire</h2>
                            <img src={alertImage} width="120px" height="120px" />
                            <h4>Espace reservé seulement aux gens intéressés par le métier d'agent immobilier</h4>

                        </div>
                        <div className="col-8 col-offset-1 text-center p-0 mt-3 mb-2">
                            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">

                                <form id="msform">
                                    <ul id="progressbar">
                                        <li className="active" id="account"><strong>Information personnelle</strong></li>
                                        <li id="payment"><FaIcons.Fa500Px /><strong>Zones d'action</strong></li>
                                        <li id="confirm"><strong>Justification</strong></li>
                                        <li id="validation"><strong>Validation</strong></li>
                                    </ul>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> <br />
                                    <div className="scrollbar ">
                                        <fieldset id="infosPersonnelle">
                                            <div className="form-card">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <h2 className="fs-title">Information de compte:</h2>
                                                    </div>
                                                    <div className="col-5">
                                                        <h2 className="steps">Etape 1 - 4</h2>
                                                    </div>
                                                </div>
                                                <input type="email" value={email} name="email" placeholder="Email " onChange={this.changehandler}/>
                                                <input type="text" name="nom" value={nom} placeholder="Nom" onChange={this.changehandler}/>
                                                <input type="text" name="prenom" value={prenom} placeholder="Prénom" onChange={this.changehandler}/>
                                                <input type="text" name="phone" value={phone} placeholder="Téléphone" onChange={this.changehandler}/>
                                                <input type="text" name="adresse" value={adresse} placeholder="Adresse" onChange={this.changehandler}/>
                                                <input type="password" name="password" value={password} placeholder="Mot de passe" onChange={this.changehandler}/>
                                                <input type="password" name="confirmPassword"  placeholder="Confirmer mot de passe" onChange={this.changehandler}/>
                                            </div>
                                            <input type="button" name="next" className="next action-button" value="Suivant"
                                                onClick={() => this.OnClickNext('infosPersonnelle')} style={{ marginRight: '10px' }}/>
                                        </fieldset>
                                        <fieldset id="selectCommune">
                                            <div className="form-card">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <h2 className="fs-title">Zone d'intérêt</h2>
                                                    </div>
                                                    <div className="col-5">
                                                        <h2 className="steps">Etape 2 - 4</h2>
                                                    </div>
                                                </div>
                                                <Commune></Commune>
                                            </div>
                                            <input type="button" name="next" className="next action-button" value="Suivant" style={{ marginRight: '10px' }}
                                                onClick={() => this.OnClickNext('selectCommune')} />
                                            <input
                                                type="button" name="previous" className="previous action-button-previous"
                                                value="Précedent" onClick={() => this.OnClickPrevious('selectCommune')} />
                                        </fieldset>
                                        <fieldset id="importJustif">
                                            <div className="form-card">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <h2 className="fs-title">Importation de justification:</h2>
                                                    </div>
                                                    <div className="col-5">
                                                        <h2 className="steps">Etape 3 - 4</h2>
                                                    </div>
                                                </div>
                                                <label className="fieldlabels">Importer votre pièce justificative:</label>
                                                <input type="file" name="pic" accept="image/*" id="fileuploaded" onChange={this.UploadFile}/>
                                            </div>
                                            <input type="button" name="next" className="next action-button" value="s'inscrire" onClick={() => this.Submit()} style={{ marginRight: '10px' }} />
                                            <input
                                                type="button" name="previous" className="previous action-button-previous"
                                                value="Previous" onClick={() => this.OnClickPrevious('importJustif')} />
                                        </fieldset>
                                        <fieldset id="finish">
                                            <div className="form-card">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <h2 className="fs-title">Finalisation:</h2>
                                                    </div>
                                                    <div className="col-5">
                                                        <h2 className="steps">Etape 4 - 4</h2>
                                                    </div>
                                                </div> <br /><br />
                                                <h2 className="purple-text text-center"><strong>Validation</strong></h2> <br />
                                                <div className="row justify-content-center">
                                                    <div className="col-3"> <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" />
                                                    </div>
                                                </div> <br /><br />
                                                <div className="row justify-content-center" />
                                                <div className="col-7 text-center">
                                                    <h5 className="purple-text text-center">Votre compte est quasiment prêt, un message de validation vous sera communiqué sur votre email </h5>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default Register;