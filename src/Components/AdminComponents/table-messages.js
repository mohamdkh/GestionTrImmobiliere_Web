import React, { Component } from 'react';
import AdminService from '../../services/AdminService'
import '../../Styles/TableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery';
import { red } from '@material-ui/core/colors';
class TableMessages extends Component {
    state = {
        data: [],
        IsVisibletable: true,
        Message: {
            id:0,
            nom: "",
            email: "",
            tel: "",
            message: ""
        },
        SelectedValue: ''
    }
    constructor() {
        super();
        this.SelectMessages("all")

    }
    MessageLu(id){
        console.log(id)
        AdminService.MessageLu(id).then(result=>{
            this.setState({ IsVisibletable: true })
            this.SelectMessages("all")
        })
        
    }
    OnDtail(id) {
        this.setState({ IsVisibletable: false })
        AdminService.GetSpecificMessage(id).then(resp=>{
            this.setState({Message:resp.data})
        })
    }
    SelectMessages(selectedvalue) {
        this.setState({ SelectedValue: selectedvalue })
        AdminService.GetMessagesByCategory(selectedvalue).then(result => {
            this.setState({ data: result.data })
        })
    }
    render() {
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
                                                <th class="col-4 col-md-4 text-center">email </th>
                                                <th class="col-4 col-md-4 text-center">Message </th>

                                                <th class="col-2 col-md-2 text-center">
                                                    <select class="form-control" onChange={e => this.SelectMessages(e.target.value)} value={this.state.SelectedValue}>
                                                        <option >Tous</option>
                                                        <option>Lu</option>
                                                        <option>Non Lu</option>
                                                    </select>
                                                </th>
                                            </thead>
                                            <tbody >
                                                {
                                                    this.state.data.map((item) =>
                                                        <tr class="row" >

                                                            <td class="col-2 col-md-2 text-center">{item.nom}</td>
                                                            <td class="col-4 col-md-4 text-center">{item.email}</td>
                                                            <td class="col-4 col-md-4 text-center">{item.message.substring(0, 20)}</td>
                                                            <td class="col-2 col-md-2 text-center">
                                                                <button class="btn btn-info" title="Détail"
                                                                    onClick={() => this.OnDtail(item.id)}
                                                                ><i class="fa fa-server" aria-hidden="true" ></i></button>
                                                            </td>
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
                    <div className="main col-12" id="users">
                        <div className="container">
                            <div className="row">
                                <div class="col-md-4">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Nom complet :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                           {this.state.Message.nom}
                                </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Adresse email :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.Message.email}
                                </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Téléphone :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.Message.tel}
                                </div>
                                    </div>
                                </div>
                                <div class="col-md-8 offset-md-2">
                                    <div className="box-part  shadow-lg p-3 mb-5 bg-white rounded">
                                        <div className="title text-center">
                                            <h5>Message :</h5>
                                        </div>
                                        <div className="text scrollablediv" >
                                        {this.state.Message.message}
                                </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button className="col-md-3 offset-md-4 btn btn-warning" onClick={()=>this.MessageLu(this.state.Message.id)}>Marquer comme lu</button>
                            </div>

                        </div>
                    </div>
                }
            </>
        );
    }
}
export default TableMessages;