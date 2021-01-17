import { data } from "jquery";
import React, { Component } from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
import StatistiqueService from './../../services/StatistiqueService'
import AnnonceService from '../../services/AnnonceService'
class Statistique1 extends Component {
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
    StatistiqueService.StatJournaliereAnnonce(0,0).then((result)=>{
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
    }).then(
      AnnonceService.GetAllTypeBien().then((res1)=>{
        this.setState({AllTypeBien:res1.data})
    }).then(
        AnnonceService.GetAllTypeOperation().then((res2)=>{
            this.setState({AllTypeOperation:res2.data})
           
            
        })
    )
    )
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
  changehandler=(e)=>{
    const {name, value} = e.target
    this.setState({[e.target.name]:value})
  }
  Filter(){
    StatistiqueService.StatJournaliereAnnonce(this.state.type_bien,this.state.type_ops).then((result)=>{
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
  render() {
    return (
      <div className="container" style={{marginTop:"1%"}}>
        <div className="row">
        <select className="form-control col-md-3 offset-md-2" name="type_bien" title="Type de bien" id="type_bien"
             onChange={this.changehandler}
            >
                <option selected="selected" value="" disabled>Type de bien</option>
                {
                this.state.AllTypeBien.map((item) =>
                    <option value={item.id}>{item.type}</option>
                    )
                }
            </select>
            <select className="form-control col-md-3 offset-md-2" name="type_ops" title="Type d'opération" id="type_ops"
                        onChange={this.changehandler}
            >
                <option selected="selected" disabled >Type d'opération</option>
                {
                this.state.AllTypeOperation.map((item) =>
                    <option value={item.id}>{item.type}</option>
                    )
                }
            </select>
            <button className="btn btn-primary col-md-2" onClick={()=>this.Filter()}>Appliquer</button>
        </div>
        <div className="row chart">
           <Line
          data={this.state.chartData}
        />
        </div>
      </div>
    );
  }
}

export default Statistique1;