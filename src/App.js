// App.js
import React, { useEffect } from "react";
import useNetworkStatus from "./hooks/useNetworkStatus";
import HitBtn from "./components/HitBtn";
import useRequestStore from "./store/RequestStore";
import { SERVER_URL } from "./utlis/apiEndPoints";
import { sendRequest } from "./utlis/utlis";

const App = () => {
  const { requests, removeAllRequests } = useRequestStore();
  const { isOnline } = useNetworkStatus();
  const sendBufferedRequests = async () => {
    const bufferedRequests = requests;

    for (const requestData of bufferedRequests) {
      try {
        await sendRequest(requestData);
        console.log("Buffered request sent:", requestData);
      } catch (error) {
        console.error("Error sending buffered request:", error);
      }
    }
    removeAllRequests();
  };

  useEffect(() => {
    if (isOnline) {
      sendBufferedRequests();
    }
  }, [isOnline]);

  return (
    <div>
      <HitBtn isOnline={isOnline} />
      {!isOnline && (
        <p>
          You are offline. Requests will be buffered and sent when you're back
          online.
        </p>
      )}
    </div>
  );
};

export default App;
