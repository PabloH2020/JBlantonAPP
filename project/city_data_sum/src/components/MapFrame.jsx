/* eslint-disable react/prop-types */
"use client";
import { useState } from 'react';
import {APIProvider,Map,AdvancedMarker,Pin,InfoWindow} from '@vis.gl/react-google-maps'

export const MapFrame = ({city})=>{
    const position = {lat:city.latitude,lng:city.longitude}
    const [open,setOpen] = useState(false)
    return(
        <APIProvider apiKey={import.meta.env.VITE_MY_GOOGLE_MAPS_KEY}>
             <div className="google-map">
                <Map zoom={9} center={position}>
                    <AdvancedMarker position={position} onClick={()=>{setOpen(true)}}>
                        <Pin/>
                    </AdvancedMarker>
                    {open && (<InfoWindow position={position} onClick={()=>{setOpen(false)}}>
                        <p>City of {city.city}</p>
                    </InfoWindow>)}
                </Map>
             </div>
        </APIProvider>
    )
}
