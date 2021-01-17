import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import OurOffers from './Pages/OurOffers'
import ContactForm from './Pages/Contact-us/ContactForm'
import intermediary from './Pages/intermediary';
import AddAnnonce from './Pages/AddAnnonce'
import ProgressBarAnnonce from './Components/Add-Annonce/ProgressBarAnnonce';
import DetailAnnonce from './Components/AnnonceComponent/DetailAnnonce';
import AfficherDemande from './Components/AnnonceComponent/AfficherDemandes';
import Statistiques from './Pages/Statistiques';
import HomePage from './Pages/HomePage';
import Profile from './Components/intermediaryComponents/Profile';
import ConsulterVosAnnonceInterm from './Components/AnnonceComponent/ConsulterVosAnnonces';
import ConbsulterAnnonceInterm from './Components/AnnonceComponent/ConsulterAnnonceIntermediaire';
import TableAdhesion from './Components/AdminComponents/table-adhesions';
import TableIntermmediaire from './Components/AdminComponents/table-intermmediaire';
import ConsulterAnnonceAdmin from './Components/AdminComponents/ConsulterAnnoncesAdmin';
import TableMessages from './Components/AdminComponents/table-messages';
import MapTest from './Pages/MapTest';

ReactDOM.render(
  <><div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/Home' component={Home} />
          <Route path='/Contact' component={ContactForm} />
          <Route path='/Admin' component={Admin} />
          <Route path='/intermediaire' component={intermediary} />
          <Route path='/OurOffers' component={OurOffers} />
          <Route path='/Register' component={Register} />
          <Route path='/Login' component={Login} />
          <Route path='/gestionAdhesion' component={TableAdhesion} />
          <Route path='/gestionIntermmediaire' component={TableIntermmediaire} />
          <Route path='/ConsultationAdmin' component={ConsulterAnnonceAdmin} />
          <Route path='/Messagerie' component={TableMessages} />
          <Route path='/ProfilIntermmediaire' component={Profile} />
          <Route path='/AnnonceInterm' component={ConsulterVosAnnonceInterm} />
          <Route path='/consultationInterm' component={ConbsulterAnnonceInterm} />
          <Route path='/AjouterAnnonce' component={AddAnnonce} />
          <Route path='/showDemands' component={AfficherDemande} />
          <Route path='/Statistiques' component={Statistiques} />
          <Route path='/Accueil'  component={HomePage}/>
          <Route path='/mapTest'  component={MapTest}/>

        </Switch>
      </Router>
      </div>
    </>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
