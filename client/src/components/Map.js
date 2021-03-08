import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MapManip from "./MapManip";

function Map(props) {
  // console.log("REF: props.restocenter in Map.js: ", props.restoCenter);

  //Bring in location prop from Info.js
  const [currentLocation, setCurrentLocation] = useState();

  //Inline CSS

  const[width, setWidth] = useState("100%")


  //State store for directory.json data
  const [stopLoop, setStopLoop] = useState(true);
  const [restoData, setRestoData] = useState([]);

  //Grab info from directory.json api and use to map marker positions
  useEffect(() => {
    if (stopLoop) {
      fetch("/api/directory")
        .then((res) => res.json())
        .then((list) => {
          setRestoData(list);
        });
    }
    setStopLoop(false);
  });

  //Prevent infinite loop then set currentlocation to restaurant page you're on
  if (props.location !== currentLocation) {
    setCurrentLocation(props.location);
  }


  return (
    <MapContainer
      center={[44.47801795, -73.21350650155372]}
      zoom={16}
      dragging={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomControl={true}
      touchZoom={true}
      style={{ height: "100%", width: "100% " }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restoData.map((obj) => {
        //Setting Markers => If on info/restaurant page check if current location matches obj.id and set marker if it does
        if (currentLocation === obj.id) {

          return (
            <Marker position={[obj.lat, obj.long]}>
              <Popup>
                <Link to={`/restaurant/${obj.id}`}>{obj.name}</Link>
              </Popup>
              {/* //Change Map View and zoom// */}
              <MapManip center={[obj.lat, obj.long]} zoom={16} />
            </Marker>

            
          );
        } else if (currentLocation === undefined) {
          //If url is homepage then currentlocation will be undefined, set all markers down
          return (
            <Marker position={[obj.lat, obj.long]}>
              <Popup>
                <Link to={`/restaurant/${obj.id}`}>{obj.name}</Link>
              </Popup>
            </Marker>
          );
        }
      })}
    
    </MapContainer>
  );
}

export default Map;
