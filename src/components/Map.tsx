import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';

const Map = () => {

    const {hasLocation, initialPosition} = useLocation();

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            <MapView
                showsUserLocation
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

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
            </MapView>
        </>
    )
};

export default Map;
