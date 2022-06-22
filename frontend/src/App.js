import "./app.css";
import React, { useEffect, useState } from "react";
import Map, { Popup, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import PinMarker from "./components/PinMarker";
import PinForm from "./components/PinForm";
import PinCard from "./components/PinCard";
import Header from "./components/Header";

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);

  const [currentPlaceId, setcurrentPlaceId] = useState(null);
  const [newPlace, setnewPlace] = useState(null);
  const [zoomValue, setZoomValue] = useState(4);
  const [PinData, setPinData] = useState([]);

  // map viewState
  const [viewState, setViewState] = useState({
    mapStyle: "mapbox://styles/mapbox/streets-v9",
    mapboxAccessToken: process.env.REACT_APP_MAPBOX,
    zoom: 3,
  });

  // useEffect
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(localStorage.getItem("user"));
    }
    const getPin = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/pins");
      setPinData(response.data);
    };
    getPin();
  }, []);

  const handlePopup = (id) => {
    setcurrentPlaceId(id);
  };
  const handleZoom = (e) => {
    const { zoom } = e.viewState;
    setViewState({ ...viewState, zoom });
    setZoomValue(zoom);
  };
  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        localStorage={localStorage}
      />
      <Map
        initialViewState={{
          latitude: 54.526,
          longitude: 15.2551,
          bearing: 0,
          pitch: 0,
        }}
        {...viewState}
        onClick={(e) => setnewPlace(e.lngLat)}
        onZoom={(e) => handleZoom(e)}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ScaleControl />
        {/* show pin data */}
        {PinData?.map((pin) => (
          <div key={pin._id}>
            {/* Marker */}
            <PinMarker
              pin={pin}
              zoomValue={zoomValue}
              currentUser={currentUser}
              handlePopup={handlePopup}
            />

            {/* Popup */}
            {currentPlaceId === pin._id && (
              <Popup
                longitude={pin.log}
                latitude={pin.lat}
                anchor="left"
                offset={0}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setcurrentPlaceId(null)}
              >
                {/* start Pin Card component */}
                <PinCard pin={pin} />
                {/* end Pin Card component */}
              </Popup>
            )}
          </div>
        ))}
        {/* add new Pin */}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="top-left"
            offset={0}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setcurrentPlaceId(null)}
            className="form_card"
          >
            {/*  Pin Form component start */}
            <PinForm
              currentUser={currentUser}
              PinData={PinData}
              setPinData={setPinData}
              setnewPlace={setnewPlace}
              newPlace={newPlace}
            />
            {/*  Pin Form component end */}
          </Popup>
        )}
      </Map>
    </>
  );
}

export default App;
