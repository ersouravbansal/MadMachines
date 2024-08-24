// components/HitBtn.js
import React from "react";
import "./HitBtn.css";
import useRequestStore from "../store/RequestStore";
import { SERVER_URL } from "../utlis/apiEndPoints";
import { getUniqueId, sendRequest } from "../utlis/utlis";

const HitBtn = ({ isOnline }) => {
  const { addRequest } = useRequestStore();
  const handleButtonClick = async () => {
    const _id = getUniqueId();
    const requestData = {
      _id: _id,
      url: SERVER_URL,
      body: JSON.stringify({ message: "Hello from Sourav" }),
    };

    if (isOnline) {
      try {
        await sendRequest(requestData);
      } catch (error) {
        console.error("Error sending request:", error);
      }
    } else {
      bufferRequest(requestData);
    }
  };

  const bufferRequest = (data) => {
    addRequest(data);
    console.log("Request buffered:", data);
  };

  return (
    <button
      className={`hit-btn ${isOnline ? "" : "offline"}`}
      onClick={handleButtonClick}
    >
      Hit Me
    </button>
  );
};

export default HitBtn;
