import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {FilterContext} from "../context/contexte"
import { Region } from '../assets/var/RegionData'
import AnnonceService from '../services/AnnonceService'
import CommuneService from '../services/CommuneService'
import AcceptsAnnonces from "../Components/HomeComponent/AcceptAnnonces";
import MapComponent from "../Components/HomeComponent/MapComponent";
import DetailAnnonceGP from "../Components/HomeComponent/DetailAnnonceGP"
import $ from 'jquery';
function HomePage(){
    const [viewport, setViewport] = useState({
        latitude: 31.7923,
        longitude: -7.0801,
        zoom: 6
      });
    const [AllAnnonces, setAllAnnonces]=useState([])
    const [ResultAnnonces, setResultAnnonces]=useState([])
    const [AllTypeBien, setAllTypeBien]=useState([])
    const [visibleDetail, setvisibleDetail] = useState(null);
const [AllTypeOperation, setAllTypeOperation]=useState([])
const [Communes, setCommunes]=useState({})
const [toggleMap,setToggleMap]=useState(false)
const [PhotoRepresentatifs,setPhotoRepresentatifs]=useState([])
    useEffect(()=>{
        AnnonceService.GetAllTypeBien().then((res1)=>{
            setAllTypeBien(res1.data)
        }).then(
            AnnonceService.GetAllTypeOperation().then((res2)=>{
                setAllTypeOperation(res2.data)
            }).then(
                AnnonceService.GetAcceptsAnnonces().then(result=>{
                    setAllAnnonces(result.data)
                    setResultAnnonces(result.data)
                })
            )
        ).then(
            AnnonceService.GetAllPictures().then((pictures)=>{
                setPhotoRepresentatifs(pictures.data)
            })
        )
    },[])
    const FindPhotos=(id_annonce)=>{
        let foundElements=PhotoRepresentatifs.filter(photo=>photo.id_annonce==id_annonce)
        if(foundElements.length!=0){
          return foundElements[0].image
        }
      }
   const getTypeBien=(id_type)=>{
        let type_bien=""
        AllTypeBien.map((item) =>{
                if(item.id==id_type){
                type_bien= item.type
            }
        })
        return type_bien;
     
    }
    const getTypeOperation=(id_type)=>{
      let type_Operation=""
      AllTypeOperation.map((item) =>{
            if(item.id==id_type)
            type_Operation= item.type
      })
    return type_Operation;
  }
  const deleteFilters=()=>{
      $("#type_bien").val(0) 
      $("#type_ops").val(0) 
      $("#region").val(0) 
      $("#commune").val(0) 
      setAllAnnonces(ResultAnnonces)
      setViewport({
        latitude: 31.7923,
        longitude: -7.0801,
        zoom: 5 
      })

  }
   const FilterAnnonce=(e)=>{
        // console.log(AllAnnonces)
    const {name, value} = e.target
    if(name=="type_bien"){
        setAllAnnonces([])
        setAllAnnonces(ResultAnnonces.filter(annonce => annonce.type_bien == value ))
    }
    else if(name=="TypeOps"){
        setAllAnnonces([])
        setAllAnnonces(AllAnnonces.filter(annonce => annonce.type_operation==value ))
    }
    else if(name=="region"){
        Region.map(item=>{
            if(item.id==value){
                setViewport({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    zoom: 8
                })
            }
        })
        setCommunes({})
       let Communelist={}
        CommuneService.GetCommune(value).then(response => {
            response.data.forEach(element => {
                let tab = element.split(";");
                Communelist[tab[0]] = tab[1];
            });
            setCommunes(Communelist)
        })
    }
    else{
        console.log(value)
        setAllAnnonces([])
        setAllAnnonces(AllAnnonces.filter(annonce => annonce.commune == value ))
    }
    }
return (
    
    <FilterContext.Provider value={{AllAnnonces,viewport,setvisibleDetail,getTypeBien,getTypeOperation,FindPhotos}}>
    {!visibleDetail?
    <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar">
                        <ul class="list-unstyled components mb-6">
                            <li class="row" id='bloc1'>
                                <select className="form-control" name="type_bien" title="type bien" id="type_bien"
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                 onChange={
                                    FilterAnnonce
                                 }
                                >
                                    <option selected="selected" value="0" disabled>Type de bien</option>
                                    {
                                   AllTypeBien.map((item) =>
                                        <option value={item.id}>{item.type}</option>
                                        )
                                    }
                                </select>
                            </li>
                            <li class="row" id='bloc2'>
                                <select className="form-control" name="TypeOps" title="Type d'opération" id="type_ops"
                                      onChange={FilterAnnonce}
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                >
                                    <option selected="selected"  value="0" disabled>Type d'opération</option>
                                    {
                                AllTypeOperation.map((item) =>
                                    <option value={item.id}>{item.type}</option>
                                    )
                                }
                                </select>

                            </li>
                            <li class="row" id='bloc1'>
                                <select className="form-control " name="region" title="Region" id="region"
                                    aria-valuemax=""
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                    onChange={FilterAnnonce}
                                >
                                    <option value="0" selected disabled>Région</option>
                                    {
                                        Region.map((item) =>
                                            <option value={item.id}>{item.label}</option>
                                        )
                                    }
                                </select>
                            </li>
                            <li class="row" id='bloc1'>
                                <select className="form-control" name="commune" id="commune" title="Commune"
                                      onChange={FilterAnnonce}
                                    style={{ marginTop: "30px", marginRight: "17px" }}
                                >
                                    <option selected disabled value="0">Province</option>
                                    {
                                    Object.entries(Communes).map( ([key, value]) => 
                                <option value={key}>{value}</option>
                                    )
                                }
                                </select>
                            </li>
                            <li class="row" id='bloc1' style={{ marginTop: "30px", marginRight: "17px" , marginLeft:"10px"}}>
                                <button className="btn btn-danger col-md-12"
                                 onClick={()=>deleteFilters()}
                                >Supprimer le filtre <i class="fas fa-ban"></i></button>
                            </li>
                            <li class="row" id='bloc1' style={{ marginTop: "30px", marginRight: "17px",marginLeft:"10px" }}>
                               
                                <button className="btn btn-primary col-md-12"
                                 onClick={()=>setToggleMap(!toggleMap)}
                                >
                                    {/* {this.state.typeAffichage}  */}
                                Afficher/Masquer la carte
                                </button>    
                               
                            </li>
                            
                        </ul>

                    </nav>
                    <div id="content" >
                        {
                            toggleMap?
                            <MapComponent></MapComponent>   
                            :
                            <AcceptsAnnonces></AcceptsAnnonces>
                        }
                    
                        {/* <AcceptsAnnonces></AcceptsAnnonces> */}
                       
                    </div>
                </div>
                :
                <DetailAnnonceGP status={4} id={visibleDetail.id} type_bien={getTypeBien(visibleDetail.type_bien)} type_action={4} type_ops={getTypeOperation(visibleDetail.type_operation)}/>
            }
    </FilterContext.Provider>
)

}
export default HomePage;