import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import FabIcon from './FabIcon';

const Map = () => {

    const { hasLocation, initialPosition, getCurrentLocation } = useLocation();

    const mapViewRef = useRef<MapView>();

    const centerPosition = async () => {
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            zoom: 15,
        })
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

            <FabIcon
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    )
};

export default Map;
