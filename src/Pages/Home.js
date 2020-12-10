import React, { Component } from "react";
import SidebarGP from './../Components/GrandPublic/SidebarGP'
import OlMap from "ol/map";
import OlView from "ol/view";
import OlLayerTile from "ol/layer/tile";
import TileLayer from "ol/layer/tile";
import OlSourceOSM from "ol/source/osm";
import TileWMS from 'ol/source/tilewms';
 import * as proj from 'ol/proj';
 import './../Styles/Map.css'
 import {FullScreen, defaults as defaultControls} from 'ol/control';
import Swal from "sweetalert2";
class Home extends Component {
  state={
    enableEdit:false
  }
  constructor(props) {
    super(props);

    this.state = { center:[-1058660, 3553542], zoom: 7
};

    this.olmap = new OlMap({
      // controls: defaultControls().extend([new FullScreen()]),
      target: null,
      layers: [
        new OlLayerTile({
          title: "OSM",
          baseLayer: true,
          source: new OlSourceOSM(),
          preload: Infinity,
          displayInLayerSwitcher: false,  
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8080/geoserver/cite/wms',
            params: {
              LAYERS: "communes",
            },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        })
      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);

  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
    this.olmap.on("click", (e) => {
      if(this.state.enableEdit==true){
        console.log(e.target.focus_)
      }
           
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [-1058660, 3553542], zoom: 7 });
  }
  AddAnnonce(){
    this.setState({enableEdit:true})
  }
  render() {
    this.updateMap(); // Update map on render?
    return (
      <div className="row">
      <div className="col-md-4">
        <SidebarGP></SidebarGP>
      </div>
      <div id="map"  className="col-md-8" style={{ width: "100%", height: "100%" }}>
        <button onClick={()=>this.AddAnnonce()} className="btn btn-primary">Ajouter votre annonce</button>
      </div>
      </div>
    );
  }
}

export default Home;
