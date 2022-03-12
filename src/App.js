import React, { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    const watchid = navigator.geolocation.watchPosition(handlePositionReceived);

    return () => navigator.geolocation.clearWatch(watchid);
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;

    setLocation({ latitude, longitude });
  }

  return (
    <>
      Latitude:{location.latitude} <br />
      Longitude:{location.longitude}
    </>
  );
}
