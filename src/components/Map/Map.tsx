import './Map.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';
import { OtherPosition, Props } from '../../interfaces/interfaces';

export default function Map(props: Props) {
    const lat = props.lat;
    const lng = props.lng;
    const setLat = props.setLat;
    const setLng = props.setLng
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const mapRef = useRef<MapGl | null>(null)
    const mapContainer = useRef(null)
    const [zoom, setZoom] = useState<number>(13)
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string
    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return
        mapRef.current = new MapGl({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        })
        const map: MapGl = mapRef.current;
            map.on('click', (event) => {
                const coordinates: OtherPosition = event.lngLat;
                setLat(coordinates.lat)
                setLng(coordinates.lng)
                const markerElement = document.createElement('div');
                markerElement.className = 'marker';            
                markerRef.current = new mapboxgl.Marker(markerElement).setLngLat([event.lngLat.lng, event.lngLat.lat])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Coordinates:</h3><p>${event.lngLat.lng} Longitud</p><p>${event.lngLat.lat} Latitud</p>`)).addTo(map);
            })
            const position: OtherPosition = map.getCenter()
            setLat(Number(position.lat.toFixed(4)));
            setLng(Number(position.lng.toFixed(4)));
            setZoom(map.getZoom());

    }, [lat, lng, zoom])
    return (
        <div id='map' ref={mapContainer}></div>
    )
}