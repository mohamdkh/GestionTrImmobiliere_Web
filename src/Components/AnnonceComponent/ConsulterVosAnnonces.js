import React, { Component } from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './AnnonceCard'
class ConsulterVosAnnonceInterm extends Component {

  state = {
    Annonces:[],
    resultAnnonces:[],
    AllTypeBien:[],
    AllTypeOperation:[],
    Filtre:{
        TypeOps:"",
        Typelocation:"",
    },
    Communes:{},
    type_bien:"",
    type_ops:""
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
        AnnonceService.GetAnnoncesIntermmadiaire(localStorage.getItem("id")).then((res3)=>{
            this.setState({Annonces:res3.data})
            this.setState({resultAnnonces:res3.data})
        })
    )
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
 else{
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
}
  render() {
    return (
      <>
         <div  className="form-group row SelectArea">
            <select className="form-control col-md-3 offset-md-2" name="type_bien" title="Type de bien" id="type_bien"
            onChange={this.changehandler}
            >
                <option selected="selected" value="" disabled>Type de bien</option>
                {
                this.state.AllTypeBien.map((item) =>
                    <option>{item.type}</option>
                    )
                }
            </select>
            <select className="form-control col-md-3 offset-md-2" name="type_ops" title="Type d'opération" id="type_ops"
                        onChange={this.changehandler}
            >
                <option selected="selected" disabled>Type d'opération</option>
                {
                this.state.AllTypeOperation.map((item) =>
                    <option>{item.type}</option>
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
                id_annonce={item.id} type_action={1} />
                    )
                    
                }
                
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
export default ConsulterVosAnnonceInterm;