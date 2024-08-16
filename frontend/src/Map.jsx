import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const markers = [
  { position: [28.6139, 77.209], label: 'New Delhi' },
  { position: [19.076, 72.8777], label: 'Mumbai' },
  { position: [13.0827, 80.2707], label: 'Chennai' },
  { position: [22.5726, 88.3639], label: 'Kolkata' },
  { position: [12.9716, 77.5946], label: 'Bangalore' },
];

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

export default function Map() {
  const [center, setCenter] = useState([28.6139, 77.209]);

  return (
    <div className="w-full h-[34rem] mt-10">
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }} className="rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              click: () => {
                setCenter(marker.position);
              },
            }}
          />
        ))}
        <CenterMap position={center} />
      </MapContainer>
    </div>
  );
}
