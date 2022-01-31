import React, { useEffect, useRef, useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import FabIcon from './FabIcon';

const Map = () => {
    const [showPolyline, setShowPolyline] = useState(true);
    const { hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {

        if (!following.current) return;

        const location = userLocation;
        mapViewRef.current?.animateCamera({
            center: {
                latitude: location?.latitude!,
                longitude: location?.longitude!
            },
            zoom: 15,
        });
    }, [userLocation]);


    const centerPosition = async () => {
        const location = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            zoom: 15,
        });
    }

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            <MapView
                ref={(element) => mapViewRef.current = element!}
                showsUserLocation
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                zoomEnabled
                zoomTapEnabled
                zoomControlEnabled
                maxZoomLevel={30}
                minZoomLevel={15}
                onTouchStart={() => following.current = false}
            >
                {/* <Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 18.5119389,
                        longitude: -69.8656178,
                    }}
                    title='Title 1'
                    description='This is a Title 1'
                /> */}

                {
                    showPolyline && (
                        <Polyline 
                            coordinates={ routeLines }
                            strokeColor="black"
                            strokeWidth={ 3 }
                        />
                    )
                }

            </MapView>

            <FabIcon
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 65
                }}
            />

            <FabIcon
                iconName='brush-outline'
                onPress={() => setShowPolyline(!showPolyline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 65
                }}
            />
        </>
    )
};

export default Map;
