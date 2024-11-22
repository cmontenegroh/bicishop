import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)

    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error al agregar el usuario", result)
            setErrorAddUser("Ups! No se pudo agregar el usuario")
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito")
            //console.log(result.data)
            dispatch(setUser(result.data))
        }
    }, [result])

    const onsubmit = () => {
        //console.log(email,password,confirmPassword)
        try {
            validationSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
        }
    }

    return (
        <LinearGradient
            colors={[colors.negro, colors.smokeGray]}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 3 }}   
            style={styles.gradient}
        >
            <Text style={styles.title}>Bici Shop</Text>
            <Text style={styles.subTitle}>EST. 1981</Text>
            <Text style={styles.secondSubtitle}>Registro</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Volver al inicio
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
            <View style={styles.guestOptionContainer}>
               
                <Pressable onPress={() => dispatch(setUser({ email: "demo@bici-shop.com", token: "demo" }))}>
                   
                    <Text style={styles.bottomText}>✅ Crea tu cuenta y obtiene un 15% off </Text>
                   
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
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
        marginTop: 48,
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
        color: colors.whiteSmoke
    },
    bottomText: {
        color: colors.pewter
    },
    underLineText: {
        textDecorationLine: 'underline',
        color: colors.pewter,
    },
    strongText: {
        fontWeight: '900',
        fontSize: 14
    },
    btn: {
        padding: 13,
        paddingHorizontal: 32,
        backgroundColor: colors.burntOrange,
        borderColor: colors.gunmetal,
        borderWidth: 1,
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
    error: {
        color: colors.deepRed
      }
})





