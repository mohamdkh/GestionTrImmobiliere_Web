import { red } from '@material-ui/core/colors';
import React, { Component ,useState} from 'react';
import { Link } from 'react-router';
import styled from "styled-components";
import logo from './../../assets/imageTypeBien/maison.png';
import DetailAnnonce from './DetailAnnonce';
const AnnonceCard = (props)=> {
  const [showButton, showAndHide] = useState(0);
  const OnClickDetail=(id)=>{
    showAndHide(1)
  }
  const getbackground=()=>{
  }
   if(showButton==1){
    return <DetailAnnonce status={props.status} id={props.id_annonce} type_bien={props.type_bien} type_action={props.type_action} type_ops={props.type_ops}/>
   }
   else
        return (
          
            <>
                {/* <DetailAnnonce col={props.type_bien}></DetailAnnonce> */}
                <AnnonceWrapper className="col-12 mx-auto col-md-6 col-lg-3 my-3">
                    <div className="card">
                        <div
                      
                            className="img-container p-5"
                        >
                            <Link to="/details">
                                <img src={logo}  alt="product" className="card-img-top" />
                            </Link>
                            <button
                                className="card-btn"
                                onClick={()=>OnClickDetail(props.id_annonce)}
                            >

                                <p><i className="fa fa-bars" /> Détail</p>
                            </button>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                        <div id="circle-bloc" >--</div><br/>
                         <p className="align-self-center mb-0">{props.type_bien}<br/>type opération :{ props.type_ops}</p><br/>
                         
                            <h5 className="text-blue font-italic mb-0">
                                <span className="mr-1">{props.prix} DH</span>
                            </h5>
                            
                        </div>
                        
                    </div>
                </AnnonceWrapper>
            </>
        );
    
}
const AnnonceWrapper = styled.div`
  #circle-bloc{
    border-radius: 50%;
    with:10px;
    height:10px;
  }
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.1);
  }
  .card-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: (--mainBlue);
    font-size: 1.42rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
  }
  .img-container:hover .card-btn {
    transform: translate(0, 0);
  }
  .card-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
export default AnnonceCard;