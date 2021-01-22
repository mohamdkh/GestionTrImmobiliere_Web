import { data } from "jquery";
import React, { Component } from "react";
import {Bar, Line, Pie,Polar} from 'react-chartjs-2';
import StatistiqueService from './../../services/StatistiqueService'
import AnnonceService from '../../services/AnnonceService'
class Statistique5 extends Component {
  state={
    data:[],
    chartData:{},
    AllTypeBien:[],
    AllTypeOperation:[],
    type_bien:"",
    type_ops:"",
    indexToggle:"typebien"
  }
  constructor(props){
    super(props)
    console.log(props.cat)
    this.Filtrer(props.cat)
  }
  getTypes(categorie){
    let Types=[]
    if(categorie=="typebien"){
        AnnonceService.GetAllTypeBien().then((res1)=>{
            res1.data.map((item) =>
                Types.push(item.type)
            )
        })
    }
    else{
        AnnonceService.GetAllTypeOperation().then((res1)=>{
            res1.data.map((item) =>
                Types.push(item.type)
            )
        })
    }
    return Types.reverse();
  }
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }
  Filtrer(categorie){
    StatistiqueService.StatReaprtition(categorie).then((result)=>{
        this.setState({data:result.data.liststatistiques,
          chartData:{
            labels:this.getTypes(categorie),
            datasets:[
              {
                label:result.data[0].type,
                data:result.data[0].liststatistiques,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 125, 144, 0.6)',
                'rgba(255, 180, 122, 0.6)',
                'rgba(255, 99, 174, 0.6)',
                'rgba(255, 55, 76, 0.6)',
  
                ]
              }
            ]
          },
          indexToggle:categorie
        });
      })
  }
  render() {
    return (

      <div className="container" style={{marginTop:"1%"}}>
            <div className="row">
          <button className={this.state.indexToggle=='typebien'?"col-md-4 btn btn-success ":"col-md-4 btn btn-primary"} onClick={()=>this.Filtrer("typebien")}>Par Type de bien</button>
          <button className={this.state.indexToggle!='typebien'?"col-md-4 btn btn-success offset-md-4":"col-md-4 btn btn-primary offset-md-4"} onClick={()=>this.Filtrer("typeOps")}>Par Type d'opération</button>
        </div>
        <div className="row chart">

           <Polar
          data={this.state.chartData}
        />
        </div>
      </div>
    );
  }
}

export default Statistique5;