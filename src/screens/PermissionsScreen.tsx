import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Es necesario el uso del GPS para utilizar esta aplicación
            </Text>

            {/* <Button
                title='Permiso'
                onPress={askLocationPermission}
            /> */}

            <BlackButton
                title='Permiso'
                onPress={askLocationPermission}
            />

            <Text style={styles.status}>
                {JSON.stringify(permissions, null, 2)}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    status: {
        marginTop: 20
    }
});

export default PermissionsScreen;