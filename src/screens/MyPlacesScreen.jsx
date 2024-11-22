import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient'; 

const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState("");
    const [places, setPlaces] = useState([
        // { "id": 1, "title": "Av. Costanera", "coords": { "latitude": -27.776869915941024,"longitude": -64.25057025427661, }, "address": "Av. Costanera, Santiago del Estero" }, // PISTA HARDCODEADA
        
    ]);
    const [address, setAddress] = useState("");

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000, 
        });
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return false;
        }
        return true;
    };

    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={"Lugar Geek"} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </FlatCard>
    );

    const getLocation = async () => {
        const permissionOk = await getPermissions();
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`
                );
                const data = await response.json();
                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress);
                } else {
                    console.log('Error en geocodificación inversa:', data.error_message);
                }
                showToast("success", "¡Ubicación obtenida!");
            } else {
                setErrorMsg('Error getting location');
                showToast("error", "No se pudo obtener la ubicación");
            }
            setLocation(location.coords);
        }
    };

    const savePlace = () => {
        if (location && title) {
            setPlaces(prevState => [...prevState, { "id": Math.random(), title, "coords": { "latitude": location.latitude, "longitude": location.longitude }, "address": address }]);
            setTitle("");
            setLocation("");
        } else {
            showToast("error", "No se completaron todos los datos");
        }
    };

    return (
        <LinearGradient
            colors={[colors.negro, colors.smokeGray]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 3 }} 
            style={styles.gradientBackground}
        >
            <View style={styles.container}>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="Localiza y agrega una pista" placeholderTextColor={colors.grisOscuro} onChangeText={(text) => setTitle(text)} value={title} />
                    <Pressable onPress={getLocation}><Icon name="pin-drop" color={colors.burntOrange} size={30} /></Pressable>
                    <Pressable onPress={savePlace}><Icon name="add-circle" color={colors.brightTeal} size={32} /></Pressable>
                </View>
                <Text style={styles.subtitle}>Mis Pistas:</Text>
                <FlatList
                    data={places}
                    keyExtractor={item => item.id}
                    renderItem={renderPlaceItem}
                />
                <Toast />
            </View>
        </LinearGradient>
    );
};

export default MyPlacesScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop:1
    },
    
    subtitle: {
        fontSize: 18,
        color: colors.whiteSmoke,
        fontWeight: "300"
    },
    inputContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.whiteSmoke,
        color:colors.whiteSmoke,
        borderRadius: 20,
        padding: 8,
        width: '80%',
        paddingLeft: 16,
    },
    placesContainer: {
        marginTop: 16,
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 4,
        gap: 24,
        backgroundColor: 'transparent', 
    },
    mapContainer: {
        width: 120,
        height: 120,
        borderRadius: 75,
        overflow: "hidden",
        elevation: 5,
    },
    map: {
        width: 120,
        height: 120,
    },
    mapTitle: {
        fontFamily:"Montserrat",
        fontSize: 20,
        fontWeight: '800',
        color:colors.whiteSmoke
    },
    address: {
        fontWeight: '300',
        color:colors.goldenYellow

    },
    placeDescriptionContainer: {
        width: '60%',
        padding: 8,
        
    },
});


