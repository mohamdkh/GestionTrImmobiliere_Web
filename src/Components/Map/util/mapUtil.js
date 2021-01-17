import styles from "./styles";
import OlView from "ol/View";
import { defaults } from "ol/interaction";
import OlMap from "ol/Map";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import {transform} from "ol/proj";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import VectorImageLayer from 'ol/layer/VectorImage';
export const ANNONCES_LAYER_ID = "annonces-layer";
export const TRACK_LAYER_ID = "track-layer";

export var vectorSource_Annonces = new VectorSource({
  layerId: ANNONCES_LAYER_ID,
  format: new GeoJSON(),
  loader: function(extent, resolution, projection) {
     var proj = projection.getCode();
     var url = 'http://localhost:8080/geoserver/GeoInformatique/ows?service=WFS&' +
         'version=1.0.0&request=GetFeature&typeName=GeoInformatique%3AannoncesData&' +
         'outputFormat=application/json&srsname=' + 'EPSG:3857' + '&' +
         'bbox=' + extent.join(',') + ',' + 'EPSG:3857';
     var xhr = new XMLHttpRequest();
     xhr.open('GET', url);
     var onError = function() {
       vectorSource_Annonces.removeLoadedExtent(extent);
     }
     xhr.onerror = onError;
     xhr.onload = function() {
       if (xhr.status == 200) {
         vectorSource_Annonces.addFeatures(
             vectorSource_Annonces.getFormat().readFeatures(xhr.responseText));
       } else {
         onError();
       }
     }
     xhr.send();
   },
   strategy: bboxStrategy,
 });
export var annonces = new VectorLayer({
  name: "annonces",
  source: vectorSource_Annonces,
  displayInLayerSwitcher: true,
});

const mapUtil = {
  createView: () => {
    return new OlView({
      projection: "EPSG:3857",
      center: transform([-11.63, 29.83], "EPSG:4326", "EPSG:3857"),
      zoom: 5.7,
    });
  },

  createMap: (view) => {
    const interactions = defaults({
      altShiftDragRotate: false,
      pinchRotate: false,
    });
    return new OlMap({
      view: view,
      layers: [
        new OlLayerTile({
          source: new OlSourceOsm(),
        }),
      ],
      interactions: interactions,
    });
  },


//create all-annonces layer
createTrackLayer: (trackFeatures) => {
  const trackLayer = new VectorImageLayer({
    layerId: TRACK_LAYER_ID,
    source: new VectorSource({}),
    format: new GeoJSON,
  });

  mapUtil.setStylesOnTracks(trackFeatures);
  trackLayer.getSource().addFeatures(trackFeatures);
  return trackLayer;
},
//set styles on all-annonces layer
setStylesOnTracks: (tracks) => {
  tracks.map((track) => {
    return track.setStyle(styles.trackStyles);
  });
},


}

export default mapUtil;
