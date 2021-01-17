import { data } from "jquery";
import React, { Component } from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
import StatistiqueService from './../../services/StatistiqueService'
import AnnonceService from '../../services/AnnonceService'
class Statistique4 extends Component {
  state={
    data:[],
    chartData:{},
    AllTypeBien:[],
    AllTypeOperation:[],
    type_bien:"",
    type_ops:"",
   
  }
   chartLabels = ["01", "02", "03","04","05","06","07","08","09","10","11","12"];
  constructor(){
    super()
    StatistiqueService.StatMonsuelDemande().then((result)=>{
      this.setState({data:result.data.liststatistiques,
        chartData:{
          labels:this.chartLabels,
          datasets:[
            {
              label:result.data[0].type,
              data:result.data[0].liststatistiques,
              backgroundColor:[
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
              ]
            }
          ]
        }
      });
    })
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
           <Bar
          data={this.state.chartData}
        />
        </div>
      </div>
    );
  }
}

export default Statistique4;