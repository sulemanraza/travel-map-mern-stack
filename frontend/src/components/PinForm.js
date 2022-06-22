import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PinForm({ currentUser, newPlace, PinData, setPinData, setnewPlace }) {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);
  //   Post Request for add Pin in Database
  const onSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      log: newPlace.lng,
    };
    try {
      if (!currentUser) {
        const notify = () =>
          toast.error("Login required ", {
            position: toast.POSITION.TOP_LEFT,
          });

        return notify();
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/pins",
        newPin
      );
      setPinData([...PinData, response.data]);
      setnewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Add New Pin</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Add Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Say us something about this place."
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <select onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Add Pin</button>
      </form>
      <ToastContainer />
    </>
  );
}

export default PinForm;
