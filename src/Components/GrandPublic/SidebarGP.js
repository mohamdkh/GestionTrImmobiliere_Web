import React, { Component } from 'react';
import './../../Styles/SidebarGP.css'
export default class SidebarGP extends Component {

    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <div id="sidebar">
                    <div class="tab">
                        <button class="tablinks" id="defaultOpen">
                            <i class="fa fa-search"></i>
                        </button>
                        <button
                            class="tablinks"
                        >
                            <p class="monTexte">Maison</p>
                        </button>
                        <button class="tablinks" >
                            <p class="monTexte">Terrain</p>
                        </button>
                        <button class="tablinks" >
                            <p class="monTexte">Bureau</p>
                        </button>
                        <button class="tablinks">
                            <p class="monTexte">Boutique</p>
                        </button>
                    </div>
                    <div id="Search" class="tabcontent">
                        <div class="options">
                            <h2>Options:</h2>
                            <ul>
                                <li>
                                    Max Inputs:
                                    <input
                                        type="number"
                                        style={{width: "3em"}}
                                        value="10"
                                    />
                                </li>
                                <li>
                                    Attribut de recherche:
                                     <select
                                    >
                                        <option value="nomcomplet">Nom propriétaire</option>
                                        <option value="NAME">Commune</option>

                                    </select>
                                </li>
                            </ul>
                            <i>Utiliser le search control pour effectuer une nouvelle recherche.</i>
                        </div>
                    </div>

                    <div id="Maison" class="tabcontent">

                    </div>

                    <div id="Terrain" class="tabcontent">

                    </div>

                    <div id="Boutique" class="tabcontent">

                    </div>

                    <div id="Bureau" class="tabcontent">
                        <div id="Local" class="tabcontent">

                        </div>

                    </div>
                    </div>
                    <div id="overlay" class="overlay">
  

            <div id="image">
                <span id="btnClose" class="btnClose">&times;</span>
                <div class="options">
                    <h2>Options:</h2>
                    
                        <label><input id="file" type="checkbox" /> Enregistrer le fichier sous format :</label>
                
                    <button id="export-jpg" class="btn" download="map.jpg" target="_new" onclick="printControl.print({ imageType: 'image/jpeg'})">
                    JPEG
                    </button> 
                    <button id="export-png" class="btn" download="map.png" target="_new" onclick="printControl.print({ imageType: 'image/png'})">
                    PNG
                    </button> 
                    <button id="export-pdf" class="btn" download="map.pdf" data-margin="10" target="_new" onclick="printControl.print({ imageType: 'image/jpeg', pdf:true })">
                    PDF
                    </button> 
                </div>
                <div class="img">
                    <h2>Prévisualisation de l'image résultat</h2>
                    <img/>
                </div>
                
                </div>
                </div>
                </div>
        )
    }
}