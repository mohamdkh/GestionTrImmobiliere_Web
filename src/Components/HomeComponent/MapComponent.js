import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker,FlyToInterpolator,NavigationControl,GeolocateControl , Popup } from "react-map-gl";
import {FilterContext} from './../../context/contexte'
import Swal from "sweetalert2";
import useSupercluster from "use-supercluster";
// import DrawControl from "react-mapbox-gl-draw";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./Home.css"
import $ from 'jquery';
function MapComponent(){
    const context = React.useContext(FilterContext);
    const [AllAnnonces,setAllAnnonces]= useState(context.AllAnnonces);
    const [Authorize,setAuthorize]= useState(false);
    const mapRef = React.useRef();
    const controlRef= React.useRef();
    const [EditMarker,setEditMarker]=useState({
      longitude:0,
      latitude:0
    })
    const [markerVisible,setmarkerVisible]=useState(false)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: "100vh",
        zoom: 0
      });
      const [selectedAnnonce, setselectedAnnonce] = useState(null);
      const [activeAdd,setactiveAdd]=useState(false)
   
    useEffect(()=>{
      setmarkerVisible(false)
        setAllAnnonces(context.AllAnnonces)
        setViewport(
          {
            latitude: context.viewport.latitude,
            longitude: context.viewport.longitude,
            width: "100vw",
            height: "100vh",
            zoom: 6
          }
        )
    },[context])

    const handleGeolocation = (newViewport) => {
      setViewport(newViewport);
    }
    const ActivateAddAnnonce=()=>{
      alert("Vous avez activé l'option d'ajout d'une annonce ! Vueillez localiser votre bien sur la carte !")
      setactiveAdd(true)
      
    }
    const AddPosition=(e)=>{
      if(activeAdd && Authorize){
      setEditMarker({
        longitude:e.lngLat[0],
      latitude:e.lngLat[1]
      })
      setmarkerVisible(true)
     
        Swal.fire({
          title: "Vouluez-vous continuer le process d'ajout d'une annonce",
          showDenyButton: true,
          confirmButtonText: "Oui",
          denyButtonText: `Annuler`,
        }).then((result) => {
          if (result.isConfirmed) {
            setmarkerVisible(false)
          window.parent.location = "/AjouterAnnonce?lon="+e.lngLat[0]+"&lat="+e.lngLat[1];
          } 
          else{
            setmarkerVisible(false)
          }
        })
      }
      setAuthorize(true)
    }
  //Cluster
  const points = AllAnnonces.map(annonce => ({
    type: "Feature",
    properties: { cluster: false, annonceId: annonce.id, type_bien: annonce.type_bien },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(annonce.lon),
        parseFloat(annonce.lat)
      ]
    }
  }));
  // mapRef.current.getMap()._canvas.onclick(()=>console.log("hellooo"))
  // bound of map
  const bounds = mapRef.current
  ? mapRef.current
      .getMap()
      .getBounds()
      .toArray()
      .flat()
  : null;
  // create cluster
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 100, maxZoom: 20 }
  });
  $(".mapboxgl-ctrl-zoom-out").html("<i class='fa fa-minus' aria-hidden='true'></i>")
  $(".mapboxgl-ctrl-zoom-in").html("<i class='fa fa-plus' aria-hidden='true'></i>")
  $(".mapboxgl-ctrl-geolocate").html("<i class='fa fa-map-marker' aria-hidden='true'></i>")
//   console.log(clusters)

//Navigate to detail page 

//*switch image
const RenderSwitcher=(typebien,idAnnonce)=>{
  switch(typebien) {
    case 1 :
      return (
        <img src="/assets/Icons/appartement.png" width="120px" height="120px"
        onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
        alt="crime doesn't pay" />
      )
    case 2:
      return (
        <img src="/assets/Icons/maison.png" width="50px" height="50px"
        onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
        alt="crime doesn't pay" />
      )
    case 3:
        return (
          <img src="/assets/Icons/garage.png" width="120px" height="120px"
          onClick={()=>setselectedAnnonce(selectedAnnonce==null?selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null:null)}
          alt="crime doesn't pay" />
        )
    case 4:
          return (
            <img src="/assets/Icons/TerrainIcone.png" width="120px" height="120px"
            onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
            alt="crime doesn't pay" />
          )
     case 5:
            return (
              <img src="/assets/Icons/residence.png" width="50px" height="50px"
              onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
              alt="crime doesn't pay" />
            )
    case 6:
              return (
                <img src="/assets/Icons/villa.png" width="130px" height="130px"
                onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
                alt="crime doesn't pay" />
              )
    default :
        return (
          <img src="/assets/Icons/icon.png" width="50px" height="50px"
          onClick={()=>setselectedAnnonce(selectedAnnonce==null?AllAnnonces.find(annonce => annonce.id == idAnnonce ):null)}
          alt="crime doesn't pay" />
        )
  }
}
    return(
        <div>
           <div   className="map">
      <ReactMapGL
      onClick={(e)=>{
        AddPosition(e)
      }}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWVka2FmY2hyYWl0IiwiYSI6ImNrazA5bzFqdzBmYWcyeHJyd3gxMzkzNzEifQ.0x8lrv6mP6Keq7a4xvW_pA"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        ref={mapRef}
      >
        <div style={{right:"17%",width:"35px",backgroundColor:"red" ,zIndex:"10",height:"60px",fontSize:"20px", position:"absolute" }}>
        <NavigationControl 
        key={0}
        ref={controlRef}
        showZoom={true}
        showCompass={false}
        />
        <GeolocateControl
        key={66}
        showUserLocation={true}
        trackUserLocation={true}
        onViewportChange={(newViewport) => handleGeolocation(newViewport)}
        className='geolocate-control'
      />
      <button className="btn btn-primary" style={{width:"36px"}} title="Ajouter une annonce"
      onClick={()=>ActivateAddAnnonce()}
      ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </div>
{
clusters.map(cluster=>{
    const [longitude, latitude] = cluster.geometry.coordinates;
    const {
      cluster: isCluster,
      point_count: pointCount
    } = cluster.properties;
    if (isCluster) {
        return (
          <Marker
            key={cluster.id}
            latitude={latitude}
            longitude={longitude}
          >
            <div
              className="cluster-marker"
              style={{
                width: `${10 + (pointCount / points.length) * 20}px`,
                height: `${10 + (pointCount / points.length) * 20}px`
              }}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );

                setViewport({
                  ...viewport,
                  latitude,
                  longitude,
                  zoom: expansionZoom,
                  transitionInterpolator: new FlyToInterpolator({
                    speed: 2
                  }),
                  transitionDuration: "auto"
                });
              }}
            >
              {pointCount}
            </div>
          </Marker>
        );
      }
      return (
        <Marker
          key={cluster.id}
          latitude={latitude}
          longitude={longitude}
        >
          {
            RenderSwitcher(cluster.properties.type_bien, cluster.properties.annonceId)
          }
          
        </Marker>
      )
    
          }
          )
          
    }
    {
      markerVisible&&
      <Marker
      key={300000}
      latitude={EditMarker.latitude}
      longitude={EditMarker.longitude}
    >
      <img src="./assets/Icons/iconSelected.png" width="50px" height="50px"/>
      </Marker>
    }
     {selectedAnnonce ? (
          <Popup
            latitude={selectedAnnonce.lat}
            longitude={selectedAnnonce.lon}
            onClose={() => {
              setselectedAnnonce(null);
            }}
          >
            <div>
            <img src={`data:image/jpeg;base64,${context.FindPhotos(selectedAnnonce.id)}`} width="310px" height="130px" />
             <div className="row">
              <p className="col-md-8">Type de bien :{context.getTypeBien(selectedAnnonce.type_bien)}
              <br/>Type d'opération :{context.getTypeOperation(selectedAnnonce.type_operation)}</p>
              <h5 className="col-md-4">{selectedAnnonce.prix} Dhs</h5>
              <p className="col-md-6">Description : {selectedAnnonce.description.substring(0,10)}...</p>
              <button className="btn btn-primary col-md-4 "
              onClick={()=>context.setvisibleDetail(selectedAnnonce)}
              >Voir plus</button>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
        </div>
    )
}

export default MapComponent;