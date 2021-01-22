import React, {useEffect, useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../Styles/Navbar.css'
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';


function Navbar () {
  const [username,setusername]=useState(localStorage.getItem("userName")!=null?localStorage.getItem("userName").toString():'')
  const [UserExist,setUserExist]=useState(localStorage.getItem("userName")!=null?true:false)
  const [roleLink,setroleLink]=useState(localStorage.getItem("role")!=null?localStorage.getItem("role").toString():"")
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  useEffect(()=>{
    if(localStorage.getItem("userName")!=null){

      setroleLink(localStorage.getItem("role")!=null?localStorage.getItem("role").toString():"")
      setUserExist(true)
      setusername(localStorage.getItem("userName").toString())
   }
  },[])
  
  const LogOut = () => {
    setUserExist(false)
    localStorage.clear();
    window.parent.location = "/login"
  }
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <a className="navbar-brand" href="#">
            <img src={logo} width="140" height="55" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to="/Accueil">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-home"></i> Accueil </a>
                </Link>
              </li>
              <li className="nav-item">
               <Link to="/Statistiques">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i class="fa fa-bar-chart" aria-hidden="true"></i> Statistiques</a>
                </Link>
              </li>
              <li className="nav-item">
               <Link to="/Contact">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-info-circle"></i> Contacter-nous</a>
                </Link>
              </li>
              <li className="nav-item">
               <Link to="/About">
                <a className="nav-link" style={{ fontSize: '18px' }} ><i className="fa fa-info-circle"></i> Qui Somme nous?</a>
                </Link>
              </li>
              <li className="nav-item">
                <img src="./assets/logoName.png" width="360px" height="55"
                style={{
                  // backgroundColor: "aliceblue"
                  boxShadow: "0 0 60px -16px white",
                  marginLeft:"50px"
                }}
                />
              </li>

            </ul>
            {
               roleLink=='intermediaire'&&
              <div className="form-inline my-2 my-lg-0">
              <Link to={roleLink}>
              <button className={' btn btn-info '} type="button" style={{ marginRight: '5px' }} id="DesplayName">{username}</button>
              </Link>
              <ButtonDropdown className="form-inline my-2 my-lg-0" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="primary">
                Espace Gestionnaire
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem><Link to="/ProfilIntermmediaire">Mon Profil</Link></DropdownItem>
               <DropdownItem divider/>
                <DropdownItem onClick={()=>LogOut()}> Déconnexion</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
              {/* <button className=" btn btn-danger " type="button" id="LogOut" onClick={()=>LogOut()}>Déconnexion</button> */}
            </div>
            }
            {
               roleLink=='admin'&&
              <div className="form-inline my-2 my-lg-0">
              <Link to={roleLink}>
              <button className={' btn btn-info '} type="button" style={{ marginRight: '5px' }} id="DesplayName">{username}</button>
              </Link>
              <ButtonDropdown className="form-inline my-2 my-lg-0" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="primary">
                Espace Gestionnaire
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem><Link to="/admin">Boîte de réception</Link></DropdownItem>
               <DropdownItem divider/>
                <DropdownItem onClick={()=>LogOut()}> Déconnexion</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
              {/* <button className=" btn btn-danger " type="button" id="LogOut" onClick={()=>LogOut()}>Déconnexion</button> */}
            </div>
            }
            
            {
              roleLink==''&&
                <ButtonDropdown className="form-inline my-2 my-lg-0" isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="primary">
                    Espace Gestionnaire
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><Link to="/Register">Créer un compte</Link></DropdownItem>
                    <DropdownItem> <Link to="/Login">Se Connecter</Link></DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            }
          </div>
        </nav>
      </>
    )
  }
export default Navbar;