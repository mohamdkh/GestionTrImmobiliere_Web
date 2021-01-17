import { data } from "jquery";
import React, { Component } from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
import StatistiqueService from './../../services/StatistiqueService'
import AnnonceService from '../../services/AnnonceService'
class Statistique3 extends Component {
  state={
    data:[],
    chartData:{},
    AllTypeBien:[],
    AllTypeOperation:[],
    type_bien:"",
    type_ops:""
  }
  constructor(){
    super()
    StatistiqueService.StatJournaliereDemande().then((result)=>{
      this.setState({data:result.data.liststatistiques,
        chartData:{
          labels:this.getPreviousDays(),
          datasets:[
            {
              label:result.data[0].type,
              data:result.data[0].liststatistiques.reverse(),
              backgroundColor:[
                'rgba(75, 192, 192, 0.6)',
              ]
            }
          ]
        }
      });
    })
  }
  getPreviousDays(){
    let days=[]
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for(let i=1;i<=7;i++){
      days.push((new Date(new Date()-(7-i)*1000 * 60 * 60 * 24)).toLocaleDateString('fr-FR',options))
    }
    return days;
  }
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }
  render() {
    return (
      <div className="container" style={{marginTop:"1%"}}>
        <div className="row chart">
           <Line
          data={this.state.chartData}
        />
        </div>
      </div>
    );
  }
}

export default Statistique3;