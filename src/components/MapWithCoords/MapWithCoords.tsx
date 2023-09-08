import 'mapbox-gl/dist/mapbox-gl.css';
import './MapWithCoords.scss'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { MegaProps, OtherPosition, Coordinates  } from '../../interfaces/interfaces';

export default function MapWithCoords(props: MegaProps) {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string
    const userLat = props.position.latitude;
    const userLng = props.position.longitude;
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const mapRef = useRef<MapGl | null>(null)
    const mapContainer = useRef(null)
    const [lat, setLat] = useState<number>(userLat)
    const [lng, setLng] = useState<number>(userLng)
    const [zoom, setZoom] = useState<number>(13)
    
    const questionDataArr = props.quizData;
    const questionData = questionDataArr.questions;

    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return
        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        const map: MapGl = mapRef.current
        map.on('move', () => {
            const position: OtherPosition = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
        })
        questionData.map((question: any) => {

            if(question.location){
                const coords: Coordinates = question.location;
                const longitude: number = coords.longitude;
                const latitude: number = coords.latitude;
                
                markerRef.current = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Question:</h3><span>${question.question}</span><h3>Answer:</h3><span> ${question.answer} </span>`)).addTo(map);

            }


        })
    }, [lat, lng, zoom])
    return (
        <div id='map' ref={mapContainer}></div>
    )
}