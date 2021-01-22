import React from 'react';
import AnnonceService from '../../services/AnnonceService'
import AnnonceCard from './../AnnonceComponent/AnnonceCard'
import { Region } from '../../assets/var/RegionData'
import CommuneService from './../../services/CommuneService'
import Pagination from "react-js-pagination";
import $ from 'jquery';
const Statuts = [
    {
      "abr": "NV",
      "Description": "Non validée"
    },
    {
      "abr": "CL",
      "Description": "Clotûrer"
    },
    {
      "abr": "Accept",
      "Description": "prise en charge"
    },
    {
      "abr": "AI",
      "Description": "illégale"
    },
  ]
function ConsulterAnnoncesAdmin(){
    const [AllAnnonces, setAllAnnonces]=React.useState([])
    const [Annonces, setAnnonces]=React.useState([])
    const [PhotoRepresentatifs, setPhotoRepresentatifs]=React.useState([])
    const [resultAnnonces, setresultAnnonces]=React.useState([])
    const [AllTypeBien, setAllTypeBien]=React.useState([])
    const [AllTypeOperation, setAllTypeOperation]=React.useState([])
    const [Communes, setCommunes]=React.useState({})
    const [pagination, setpagination]=React.useState({
        activePage: 1,
        itemsCountPerPage: 8,
        totalItemsCount: 0
    })
    const [isfilter,setIsFilter]=React.useState(false)
    React.useEffect(()=>{
      setAnnonces(resultAnnonces.slice(0,pagination.itemsCountPerPage))
      setpagination({
        ...pagination,
        totalItemsCount: resultAnnonces.length
    })
    },[resultAnnonces])
React.useEffect(()=>{
    AnnonceService.GetAllTypeBien().then((res1) => {
        setAllTypeBien(res1.data)
      }).then(
        AnnonceService.GetAllTypeOperation().then((res2) => {
            setAllTypeOperation(res2.data)
        })
      ).then(
        AnnonceService.GetAllAnnonces().then((res3) => {
            setAllAnnonces(res3.data)
            setAnnonces(res3.data.slice(0, pagination.itemsCountPerPage))
            setresultAnnonces(res3.data)
            setpagination({
                ...pagination,
                totalItemsCount: res3.data.length
            })
        })
      ).then(
        AnnonceService.GetAllPictures().then((pictures) => {
         setPhotoRepresentatifs(pictures.data)
        })
      )
},[])

const getTypeBien=(id_type)=> {
    let type_bien = ""
   AllTypeBien.map((item) => {
      if (item.id == id_type)
        type_bien = item.type
    })
    return type_bien;
  }
  const  getTypeOperation=(id_type)=> {
    let type_Operation = ""
   AllTypeOperation.map((item) => {
      if (item.id == id_type)
        type_Operation = item.type
    })
    return type_Operation;
  }
  const FindPhotos=(id_annonce)=> {
    let foundElements = PhotoRepresentatifs.filter(photo => photo.id_annonce == id_annonce)
    if (foundElements.length != 0) {
      return foundElements[0].image
    }
  }
  const handlePageChange=(pageNumber)=> {
      setpagination({
          ...pagination,
          activePage: pageNumber,
      })
      setAnnonces(resultAnnonces.slice(pagination.itemsCountPerPage * (pageNumber - 1), pagination.itemsCountPerPage * pageNumber))
  }
 const GetCommunes=(value) =>{
    let Communelist={}
    CommuneService.GetCommune(value.toString()).then(response => {
      response.data.forEach(element => {
        let tab = element.split(";");
        Communelist[tab[0]] = tab[1];
      });
      setCommunes(Communelist)
    })
  }
  const changehandler = (e) => {
    setIsFilter(true)
    let result=[]
    console.log(resultAnnonces.length)
    const { name, value } = e.target
    let id = 0;
    if (name == "type_bien") {
        setresultAnnonces(resultAnnonces.filter(annonce => annonce.type_bien == value ))
    }
    else if (name == "type_ops") {
        setresultAnnonces(resultAnnonces.filter(annonce => annonce.type_operation == value ))
      }
      else if (name == "commune") {
        setresultAnnonces(resultAnnonces.filter(annonce => annonce.commune == value ))
      }
      else if (name == "statut") {
        setresultAnnonces(resultAnnonces.filter(annonce => annonce.status == value ))
      }
    
  }
  const deleteFilters=()=>{
    $("#type_bien").val(0) 
    $("#type_ops").val(0) 
    $("#region").val(0) 
    $("#commune").val(0) 
    $("#statut").val(0) 
    setresultAnnonces(AllAnnonces)
    setAnnonces(resultAnnonces.slice(0,pagination.itemsCountPerPage))
    setIsFilter(false)
  }
    return (
        <>
        <div className="form-group row SelectArea">
          <select className="form-control col-md-2" name="type_bien" title="type bien" id="type_bien"
            onChange={changehandler}
          >
            <option selected="selected" value="0" disabled>Type de bien</option>
            {
                AllTypeBien.map((item) =>
                <option value={item.id}>{item.type}</option>
              )
            }
          </select>
          <select className="form-control col-md-2" name="type_ops" title="Type d'opération" id="type_ops"
            onChange={changehandler}
          >
            <option selected="selected" value="0" disabled>Type d'opération</option>
            {
              AllTypeOperation.map((item) =>
                <option value={item.id}>{item.type}</option>
              )
            }
          </select>

          <select className="form-control col-md-2 " name="region" title="Region" id="region"
            aria-valuemax="" 
            onChange={(e) => GetCommunes(e.target.value)}
            >
            <option selected value="0" disabled>Région</option>
            {
              Region.map((item) =>
                <option value={item.id}>{item.label}</option>
              )
            }
          </select>
          <select className="form-control col-md-3" name="commune" id="commune" title="Province"
             onChange={changehandler}
          >
            <option selected  value="0" disabled>Province</option>
            {
              Object.entries(Communes).map(([key, value]) =>
                <option value={key}>{value}</option>
              )
            }
          </select>
          <select className="form-control col-md-2 " name="statut" title="Statut" id="statut"
            aria-valuemax="" 
            onChange={changehandler}
            >
            <option value="0" selected disabled>Statut</option>
            {
              Statuts.map((item) =>
                <option value={item.abr}>{item.Description}</option>
              )
            }
          </select>
          <button className="col-md-1 btn btn-warning"
          onClick={()=>deleteFilters()}
          >
              {
                  isfilter?
                  <i className="fa fa-close"></i>
                  :
                  <i className="fa fa-filter"></i>
              }
             
              
              </button>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="row">
              {
                Annonces.map((item) =>
                  <AnnonceCard className="col-md-3" type_bien={getTypeBien(item.type_bien)} type_ops={getTypeOperation(item.type_operation)} prix={item.prix}
                    id_annonce={item.id} image={FindPhotos(item.id)} type_action={3} status={item.status} />
                )

              }

            </div>
            <div className="row">
              <Pagination
                activePage={pagination.activePage}
                itemsCountPerPage={pagination.itemsCountPerPage}
                totalItemsCount={pagination.totalItemsCount}
                pageRangeDisplayed={5}
                 onChange={handlePageChange.bind(this)}
              />
            </div>
          </div>

        </div>
      </>
    )
}
export default ConsulterAnnoncesAdmin;