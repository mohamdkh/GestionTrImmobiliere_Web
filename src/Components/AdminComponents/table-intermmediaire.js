import React, { Component } from 'react';
import AdminService from '../../services/AdminService'
import '../../Styles/TableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery';
import { red } from '@material-ui/core/colors';
class TableIntermmediaire extends Component {
    state = {
        data: [],
        IsVisibletable: true,
        intermmediare: {
            id:0,
            nom: "",
            prenom: "",
            email: "",
            tel: "",
            commune1: "",
            commune2: "",
            commune3: "",
            id_user: 0,
            id_piece_justif: 0,
            password: "",
            adresse: ""
        },
        image: '',
        extension: ''
    }
    constructor() {
        super();
        AdminService.GetDemandesUsers('active').then(result => {
            console.log(result.data)
            this.setState({ data: result.data })
        })

    }
    ChangeStatus(id, status) {
        Swal.fire({
            title: 'êtes-vous sûr de vouloir continuer?',
            text: "Tu ne pourras pas revenir en arrière après cette opération!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "annuler",
            confirmButtonText: 'Oui!'
        }).then((result) => {
            if (result.isConfirmed) {
                AdminService.ChangeStatus(id, status)
                Swal.fire(
                    'Action detectée!',
                    "opération est bien passée",
                    'success'
                ).then(
                    this.Annuler()
                )
            }
        })

    }
    OnDtail(idjustif,id) {
        console.log(id+"+++"+idjustif)
        this.setState({ IsVisibletable: false })
        AdminService.GetUserInfos(id).then(response => {
            this.setState({ intermmediare: response.data })
           
        }).then(
            AdminService.GetJustificationUser(idjustif)
            .then(resp => {
                this.setState({ image: resp.data.image })
                this.setState({ extension: "data:" + resp.data.extension + ";base64" })
            })
        )
    }
    Annuler() {
        AdminService.GetDemandesUsers('active').then(result => {
            console.log(result.data)
            this.setState({ data: result.data })
        })
        this.setState({ IsVisibletable: true })
    }
    render() {
        const ImageTemplate = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="100%" height="100%" />
        return (
            <>
                {this.state.IsVisibletable ?
                    <div class="main col-12" id="users">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="tableFixHead">
                                        <table class="" id="usertable">
                                            <thead class=" text-primary row">
                                                <th class="col-2 col-md-2 text-center" >Nom</th>
                                                <th class="col-2 col-md-2 text-center">Prénom</th>
                                                <th class="col-4 col-md-4 text-center">email </th>
                                                <th class="col-2 col-md-2 text-center">Tél </th>
                                                <th class="col-2 col-md-2 text-center">Action </th>
                                            </thead>
                                            <tbody >
                                                {
                                                    this.state.data.map((item) =>
                                                        <tr class="row" >

                                                            <td class="col-2 col-md-2 text-center">{item.nom}</td>
                                                            <td class="col-2 col-md-2 text-center">{item.prenom}</td>
                                                            <td class="col-4 col-md-4 text-center">{item.email}</td>
                                                            <td class="col-2 col-md-2 text-center">{item.tel}</td>
                                                            <td class="col-2 col-md-2 text-center">
                                                                <button class="btn btn-info" title="Détail"
                                                                    onClick={() => this.OnDtail(item.id_piece_justif,item.id)}
                                                                ><i class="fa fa-server" aria-hidden="true"></i></button>
                                                            </td>
                                                            <td class="col-1 col-md-1"></td>
                                                        </tr>

                                                    )
                                                }
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>
                                                <tr class="row" >

                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-4 col-md-4 text-center"></td>
                                                    <td class="col-2 col-md-2 text-center"></td>
                                                    <td class="col-2 col-md-2 ">

                                                    </td>
                                                    <td class="col-1 col-md-1"></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div class="container emp-profile">
                                <div class="row">
                                </div>
                                <div class="row">
                                    <div class="tab-pane fade show active col-md-5" id="home" role="tabpanel">
                                        <div class="col-md-6">
                                            <div class="profile-head">
                                                <h5>
                                                    {this.state.intermmediare.nom} {this.state.intermmediare.prenom}
                                                </h5>
                                                <h6>
                                                    Agent immobilier
                                </h6>
                                                <p class="proile-rating">Numéro d'inscription: {this.state.intermmediare.id_user} <span>
                                                </span></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Nom</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.intermmediare.nom}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Prénom</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.intermmediare.prenom}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.intermmediare.email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Adresse</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.intermmediare.adresse}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Téléphone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.intermmediare.tel}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Mot de passe</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>******** <button class="btn btn-warnning" ><i class="fa fa-eye"></i></button></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <button class="btn btn-danger col-md-5 " onClick={() => this.ChangeStatus(this.state.intermmediare.id_user, 'desactivated')}>Descativer le compte</button>
                                            <button class="btn btn-warning col-md-3 offset-md-4" onClick={() => this.Annuler()}>Annuler</button>

                                        </div>
                                    </div>
                                    <div className="col-md-1" style={{backgroundColor:red}}></div>
                                    <div class="tab-pane fade show active col-md-6" id="profile" role="tabpanel">

                                        <div class="row">
                                            <div class="col-md-12">
                                                <label>Communes selectionnées</label><br />
                                                <ul>
                                                    <li>{this.state.intermmediare.commune1}</li>
                                                    <li>{this.state.intermmediare.commune2}</li>
                                                    <li>{this.state.intermmediare.commune3}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Nom de la région :</label>
                                                <p> {this.state.intermmediare.password}</p>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label>Pièce justificative :</label>
                                                <ImageTemplate data={this.state.image}/>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}
export default TableIntermmediaire;