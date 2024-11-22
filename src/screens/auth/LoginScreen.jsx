import { StyleSheet, Text, View, TextInput, Pressable, Dimensions,Platform, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()


    useEffect(() => {
     
        if (result.isSuccess) {
            console.log("Usuario logueado con éxito")
            // console.log(result.data)
            dispatch(setUser(result.data))

            if (rememberMe) {
                clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
                // console.log("result data:", result.data)
                insertSession({
                    localId: result.data.localId,
                    email: result.data.email,
                    token: result.data.idToken
                })
                    .then(res => console.log("Usuario insertado con éxito", res))
                    .catch(error => console.log("Error al insertar usuario", error))
            }

        }
    }, [result, rememberMe])

    const onsubmit = () => {
        //console.log(email,password)       
        triggerLogin({ email, password })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <LinearGradient
                colors={[colors.negro, colors.smokeGray]}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 3 }}   
                style={styles.gradient}
            >
                <Text style={styles.title}>Bici Shop</Text>
                <Text style={styles.subTitle}>EST. 1981</Text>
                <Text style={styles.secondSubtitle}>Inicio</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={colors.whiteSmoke}
                        placeholder="Email"
                        style={styles.textInput}
                    />
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor={colors.whiteSmoke}
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry
                    />

                </View>
                <View style={styles.rememberMeContainer}>
                    <Text style={styles.whiteText}>Recordarme en este equipo</Text>
                    {
                        rememberMe
                            ?
                            <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.brightTeal} /></Pressable>
                            :
                            <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.graphite} /></Pressable>
                    }
                </View>
                <View style={styles.footTextContainer}>
                    <Text style={styles.whiteText}></Text>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={
                            {
                                ...styles.whiteText,
                                ...styles.underLineText
                            }
                        }>
                            Crea tu cuenta
                        </Text>
                    </Pressable>
                </View>

                <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

                <View style={styles.guestOptionContainer}>
                    
                    <Pressable onPress={() => dispatch(setUser({ email: "visitor@bici-shop.com", token: "demo" }))}>
                       
                        <Text style={{...styles.tourText,... styles.underLineText}}> Tour por nuestro store </Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },  
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.whiteSmoke,
        fontFamily: "Poppins",
        fontSize: 40
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 20,
        color: colors.goldenYellow,
        fontWeight: 'bold',
        letterSpacing: 3,
     },
     secondSubtitle:{
        fontFamily: "Montserrat",
        fontSize: 20,
        color: colors.vibrantRed,
         },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 55,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 5,
        borderColor: colors.whiteSmoke,
        borderWidth: 1,
        backgroundColor: "#222222",
        width: textInputWidth,
        color: colors.whiteSmoke,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.pewter,
        fontSize: 14,
    
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    tourText: {
        fontWeight: '400',
        fontSize: 15,
        color: colors.brightTeal,
    },
    btn: {
        padding: 13,
        paddingHorizontal: 26,
        borderColor: colors.gunmetal,
        borderWidth: 1,
        backgroundColor: colors.burntOrange,
        borderRadius: 5,
        marginTop: 32
    },
    btnText: {
        color: colors.whiteSmoke,
        fontSize: 15,
        fontWeight: '500'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
    }
})









