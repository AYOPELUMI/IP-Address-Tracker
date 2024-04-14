'use client'

import L from 'leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react'

const Map = () => {

    const [coord, setCoord] = useState([51.505, -0.09])
    const [clientAdress, setClientAddress] = useState({})

    async function getIpAddress() {
        const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_a9bZ8e9065AqRnoktLAOcdLSFb1i9")
        const data =await response.json()
        setCoord([data.location.lat, data.location.lng])
        console.log({data})
    }


    useEffect(()=>{
        getIpAddress()
    },[])
    
    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
      
    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                console.log({navigator})
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log({position})
                    setCoord([position.coords.latitude, position.coords.longitude])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }

    return (
        <div>
            <SearchLocation />
            <GetMyLocation />
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={coord} zoom={1} scrollWheelZoom={false}>
                <ChangeView center={coord} zoom={13} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon.src,
                        iconRetinaUrl: MarkerIcon.src,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                } position={coord}>
                     <Popup>
                        Latitude :{coord[0]} <br />Longitude :{coord[1]}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map