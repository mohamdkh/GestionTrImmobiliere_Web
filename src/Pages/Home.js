import React, { useState } from "react";
import Swal from "sweetalert2";
import "ol/ol.css";
import "antd/dist/antd.css";
import css from "./../Styles/Map.css";
import "./../Components/Map/css/react-geo.css";
import {
  MapComponent,
  MeasureButton,
} from "@terrestris/react-geo";

import { Drawer } from "antd";
import all_annonces from "./../Components/Map/data/all_annonces.json";
import AnnonceService from '../services/AnnonceService'
import geoUtil from "./../Components/Map/util/geoUtil";
import mapUtil, { ANNONCES_LAYER_ID, TRACK_LAYER_ID, annonces, vectorSource_Annonces } from "./../Components/Map/util/mapUtil";
import SimplePopup from "./../Components/Map/SimplePopup";
import Select from "ol/interaction/Select";
import Draw from "ol/interaction/Draw"
import Overlay from "ol/Overlay";
import { singleClick } from "ol/events/condition";
import styles from "./../Components/Map/util/styles";
import { isMobile } from "react-device-detect";
import Control from "ol/control/Control"

const POPUP_ID = "my-popup";

geoUtil.registerProjections();

const view = mapUtil.createView();
const map = mapUtil.createMap(view);

const isGymOrTrackLayer = (layer) => {
  return (
    layer.get("layerId") &&
    (layer.get("layerId") === ANNONCES_LAYER_ID ||
      layer.get("layerId") === TRACK_LAYER_ID)
  );
};

// control ajout d'annonce
var draw = new Draw({
  source: vectorSource_Annonces,
  type: 'Point'
});
const drawIcon = document.createElement("div");
drawIcon.className = css.dragB;
drawIcon.innerHTML = '<button title="Ajouter votre annonce" class="btn btn-primary" style="position: absolute;height: 30px;width: 30px;top: 12px ;right: 0px;"><i class="fa fa-pencil text-center" ></i></i></button>';
drawIcon.addEventListener("click", function () {
  draw.setActive(true);
  map.addInteraction(draw);
});
map.addControl(
  new Control({
    element: drawIcon,
  })
);

draw.on('drawend', function (evt) {
  
  
  Swal.fire({
    title: "Vouluez-vous continuer le process d'ajout d'une annonce",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: `Annuler`,
  }).then((result) => {
    if (result.isConfirmed) {
      draw.setActive(false);
  var feature = evt.feature;
  var p = feature.getGeometry();
    console.log(p.getCoordinates());
    window.parent.location = "/AjouterAnnonce?lon="+p.getCoordinates()[0]+"&lat="+p.getCoordinates()[1];
    } 
  })
});
//fin control ajout d'annonce
const select = new Select({
  condition: singleClick,
  style: styles.AnnonceSelectedStyle,
  layer: annonces,
});
map.addInteraction(select);


const AnnoncesFeatures = geoUtil.toFeatures(all_annonces, "track");
annonces.setStyle(styles.AnnonceStyle);
map.addLayer(annonces);

const popup = new Overlay({});
const onPopupClose = () => {
  popup.setPosition(undefined);
};

function Home() {
  const [visible, setVisible] = useState(false);

  const [hoveredFeatureType, setHoveredFeatureType] = useState("");
  const [hoveredFeatureDesc, setHoveredFeatureDesc] = useState("");
  const [hoveredFeatureSuperficie, setHoveredFeatureSuperficie] = useState("");
  const [hoveredFeaturePrix, setHoveredFeaturePrix] = useState("");
  const [hoveredFeatureContact, setHoveredFeatureContact] = useState("");

  const toggleDrawer = () => {
    setVisible(!visible);
  };
 
  const centerOnTrack = (trackName) => {
    if (isMobile) {
      setVisible(!visible);
    }
    var extent = geoUtil.getExtentOfFeaturesByName(AnnoncesFeatures, trackName);
    var buffered = geoUtil.bufferExtent(extent, 200);
    map.getView().fit(buffered);
  };

  map.on("click", function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      return feature;
    });

    if (feature) {
      if (!popup.getElement()) {
        popup.setElement(document.getElementById(POPUP_ID));
        map.addOverlay(popup);
      }
      setHoveredFeatureDesc(feature.getProperties()["type_ops"]);
      const typebien = GetType(feature.getProperties()["type_bien"],"bien");
      console.log(typebien)
      setHoveredFeatureContact(feature.getProperties()["type_bien"]);
      setHoveredFeatureType(typebien);
      setHoveredFeatureSuperficie(feature.getProperties()["surface"]);
      setHoveredFeaturePrix(feature.getProperties()["prix"]);
     

      popup.setPosition(evt.coordinate);
    }
    else {
      return undefined;
    }
  });
const GetType=(value,catgerie)=>{
  // console.log(value+"++"+catgerie)
  let valeur=""
  if(catgerie=="bien"){
    AnnonceService.GetAllTypeBien().then((res1)=>{
    res1.data.map((elem)=>{
      if(elem.id==parseInt(value)){
        valeur= elem.type
      }
    })
    })
  }
  else{
    AnnonceService.GetAllTypeOperation().then((res2)=>{
      res2.data.map((elem)=>{
        if(elem.id==parseInt(value)){
          valeur= elem.type
        }
      })
  })
  return valeur;
  }
    

}
  return (
      <div class="wrapper d-flex align-items-stretch">
         
        <div id="content" >
          <MapComponent map={map} />
          <SimplePopup
            popupId={POPUP_ID}
            title={hoveredFeatureType}
            text5={hoveredFeatureDesc}
            text2={hoveredFeatureSuperficie}
            text3={hoveredFeaturePrix}
            text4={hoveredFeatureContact}

            onClose={onPopupClose}
          />
           <Drawer
            title="Drawer"
            placement="left"
            onClose={toggleDrawer}
            visible={visible}
            mask={false}
           
            
          > 
            {/* <NominatimSearch key="search" map={map} /> */}
            <MeasureButton
              key="measureButton"
              name="line"
              map={map}
              measureType="line"
              icon="pencil"
            ></MeasureButton>
          </Drawer>
        </div>
      </div>
  );
};

export default Home;
