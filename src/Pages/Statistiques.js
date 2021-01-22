import React, { Component } from "react";
import './../Styles/Statistique.css';
import Statistique1 from './../Components/StatistiquesComponent/Statistique1'
import Statistique2 from './../Components/StatistiquesComponent/Statistique2'
import Statistique3 from './../Components/StatistiquesComponent/Statistique3'
import Statistique4 from './../Components/StatistiquesComponent/Statistique4'
import Statistique5 from "../Components/StatistiquesComponent/Statistique5";
class Statistiques extends Component {
  state={
    displayStat:1
  }
  constructor(){
      super()
  }
  SelectStatistique(value){
    this.setState({displayStat:value})

  }
  SelectedStatistique(){
    switch(this.state.displayStat){
      case 1:
        return(
          <Statistique1></Statistique1>
        )
      case 2:
          return(
            <Statistique2></Statistique2>
          )
      case 3:
            return(
              <Statistique3></Statistique3>
            ) 
      case 4:
              return(
                <Statistique4></Statistique4>
              )
      case 5:
                return(
                  <Statistique5 cat="typebien"></Statistique5>
                )
     case 6:
                  return(
                    <Statistique5 cat="typeops"></Statistique5>
                  )
    }
  }
  render() {
    return (
      <div>
        <div style={{marginLeft: "3%"}} >
        <div  className="row">
        <div className="col-md-3 navbarStatistic" >
        <h3 className="title col-md-12" >STATISTIQUE GENERALE</h3>
        <h4 className="col-md-12">Evolution de :</h4>
            <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label">
                <label>
                  <input type="radio" name="options"  className="inputRadio" width="25" height="25"
                  value="annoncesJournaliere"
                   onClick={()=>this.SelectStatistique(1)}
                  />
                  <span className="radio"></span>
                  <span className="label" >Nombre des annonces/Jours</span>
                </label>
                <label>
                  <input type="radio" name="options"  className="inputRadio" 
                  value="annoncesMensuel"
                  onClick={()=>this.SelectStatistique(2)}
                  />
                  <span className="radio"></span>
                  <span className="label">Nombre des annonces/Mois</span>
                </label>
                <label>
                  <input type="radio" name="options"  className="inputRadio" 
                  value="demandesJournaliere"
                  onClick={()=>this.SelectStatistique(3)}
                  />
                  <span className="radio"></span>
                  <span className="label">Nombre des demandes/Jours</span>
                </label>
                <label>
                  <input type="radio" name="options"  className="inputRadio"
                  value="demandesMensuel"
                  onClick={()=>this.SelectStatistique(4)}
                  />
                  <span className="radio"></span>
                  <span className="label">Nombre des demandes/Mois</span>
                </label>
                <h4 className="col-md-12">Répartition des :</h4>
                <label>
                  <input type="radio" name="options"  className="inputRadio"
                  value="demandesMensuel"
                  onClick={()=>this.SelectStatistique(5)}
                  />
                  <span className="radio"></span>
                  <span className="label">des annonces par type de bien: </span>
                </label>
                <label>
                  <input type="radio" name="options"  className="inputRadio"
                  value="demandesMensuel"
                  onClick={()=>this.SelectStatistique(6)}
                  />
                  <span className="radio"></span>
                  <span className="label">des annonces par type d'opération </span>
                </label>
              </div>
              
        </div>
        <div className="col-md-9">
          {this.SelectedStatistique()}
        </div>
    </div>
    </div>
      </div>
    );
  }
}

export default Statistiques;
