import React, { Component } from 'react';
function About() {
    return (
        <div>
            <div className="row text-center">
                <div className="col-md-12"><h2 style={{margin:0}}><b>Qui Somme nous ?</b></h2></div>
            </div>
            <hr />
            <div className="row text-center">
            <div class="col-md-6">
                <img alt="about-page-page" src="./assets/fullLogo.jpeg" style={{
                    boxShadow: "0 0 60px -16px teal"
                }} width="95%" height="58%"/>	            
                </div>
                <div class="col-md-6 columns">
                    <p>Votre application mobile est à votre service, une plateforme assez responsive conçue selon vos plus particuliers besoins pour attaquer avec exactitude vos attentes soit en terme de gestion ou exécution de vos transactions immobilières.  </p>
                    <p>Et ce en veillant à la sécurité de vos données personnelles qui nous sont d’une grande priorité, sur ce volet nous vous garantissons une fluidité spéciale de navigation et de recherche selon vos critères les plus détaillés. </p>
                    <p> vous êtes toujours safe de toute arnaque extérieure grâce à l’équipe administration qui veille à sécuriser votre compte et aussi tout contenu vous étant proposé, et qui supervise presque en totalité tous les comptes utilisateurs pour en approuver ceux qui s’avèrent pertinents.</p>

                    <p>Notre objectif principal est de satisfaire vous besoin et ainsi vous livrer le meilleur service fondé sur une base technique très solide. Et nous sommes toujours à l’écoute de votre retour sur l’application donc n’hésitez pas à nous évaluer et nous resterons ouverts à vos propositions (onglets réclamations)</p>
                 
                    <hr />
            </div>
        </div>
        </div>
    )
}
export default About;