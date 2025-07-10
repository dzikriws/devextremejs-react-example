import React from "react";
import { Map } from 'devextreme-react/map';

const centerCoordinates = { lat: 40.749825, lng: -73.987963 };
const authentificationKeys = {
    google: "YOUR_GOOGLE_MAPS_API_KEY",
};

export function MapPage() {
    return (
        <React.Fragment>
            <Map
                center={centerCoordinates}
                zoom={10}
                height="100%"
                width="100%"
                provider="google"
                defaultZoom={10}
                defaultCenter={centerCoordinates}
                apiKey={authentificationKeys.google}
            />
        </React.Fragment>
    );
}