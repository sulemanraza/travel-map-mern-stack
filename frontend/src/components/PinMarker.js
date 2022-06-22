import { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

// start component
const PinMarker = ({ pin, zoomValue, currentUser, handlePopup }) => {
  return (
    <Marker
      longitude={pin.log}
      latitude={pin.lat}
      anchor="bottom"
      offsetLeft={-3.5 * zoomValue}
      offsetTop={-7 * zoomValue}
    >
      <FaMapMarkerAlt
        size={zoomValue * 5}
        color={currentUser === pin.username ? "tomato" : "#4832E3"}
        onClick={() => handlePopup(pin._id)}
        style={{ cursor: "pointer" }}
      />
    </Marker>
  );
};

export default PinMarker;
