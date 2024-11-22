import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { colors } from '../global/colors';
import CameraIcon from '../components/CameraIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../features/auth/authSlice';
import { usePutProfilePictureMutation } from '../services/userService';
import { LinearGradient } from 'expo-linear-gradient'; 

const ProfileScreen = () => {
    
    const user = useSelector(state => state.authReducer.value.email);
    const image = useSelector(state => state.authReducer.value.profilePicture);
    const localId = useSelector(state => state.authReducer.value.localId);
    const dispatch = useDispatch();

    const [triggerPutProfilePicture] = usePutProfilePictureMutation();

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) return false;
        return true;
    };

    const pickImage = async () => {
        const permissionOk = await verifyCameraPermissions();
        if (permissionOk) {
            let result = await ImagePicker.launchImageLibraryAsync({
                // let result = await ImagePicker.launchCameraAsynclaunchImageLibraryAsync //Puse esta opcion porque en el simulador no abre la camara.
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.7
            });
            if (!result.canceled) {
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`));
                triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId });
            }
        }
    };

    return (
        <LinearGradient
            colors={[colors.negro, colors.smokeGray]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 3 }} 
            style={styles.gradientBackground}
        >
            <View style={styles.profileContainer}>
                <View style={styles.imageProfileContainer}>
                    {
                        image
                            ? <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                            : <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                    }
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                        <CameraIcon />
                    </Pressable>
                </View>
                <Text style={styles.profileData}>User: {user}</Text>
            </View>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        },
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    imageProfileContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: colors.whiteSmoke,
        borderWidth:1,
        backgroundColor: colors.charcoal,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textProfilePlaceHolder: {
        color: colors.whiteSmoke,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 14,
        color: colors.whiteSmoke,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128,
    },
});




