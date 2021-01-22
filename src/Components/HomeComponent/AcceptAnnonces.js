import React, { useEffect, useState } from "react";
import AnnonceCard from "../AnnonceComponent/AnnonceCard";
import {FilterContext} from './../../context/contexte'
import Pagination from "react-js-pagination";
import "./../../Styles/pagination.css"
import AnnonceCardGP from "./AnnonceCardGP";

function AcceptsAnnonces(){
    const context = React.useContext(FilterContext);
    const AllAnnonces=context.AllAnnonces;
    const [Annonces,setAnnonces]=useState([])
    const [paginationParams,setpaginationParams]=useState({
        activePage: 1,
        itemsCountPerPage:8,
        totalItemsCount:0
    })
    useEffect(()=>{
        setAnnonces(AllAnnonces.slice(0,paginationParams.itemsCountPerPage))
        setpaginationParams({
            ...paginationParams,
            totalItemsCount: AllAnnonces.length
        })
    },[AllAnnonces])
    const handlePageChange=(pageNumber)=> {
        setpaginationParams({
            ...paginationParams,
            activePage: pageNumber
        })
        setAnnonces(AllAnnonces.slice(paginationParams.itemsCountPerPage*(pageNumber-1),paginationParams.itemsCountPerPage*pageNumber))
      }
    return(
        <>
        <div className="py-5">
          <div className="container">
            <div className="row">
            {
                Annonces.map((item) =>
                <AnnonceCardGP className="col-md-3" type_bien={item.type_bien} type_ops={item.type_operation} prix={item.prix} 
                id_annonce={item.id} type_action={4} />
                    )
                    
                }
                
            </div>
            <div className="row">
        <div className="col-md-4 offset-md-8">
            <Pagination           
          activePage={paginationParams.activePage}
          itemsCountPerPage={paginationParams.itemsCountPerPage}
          totalItemsCount={paginationParams.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)}
        />
        </div>
            </div>
          </div>

        </div>
      </>
    )
}
export default AcceptsAnnonces;