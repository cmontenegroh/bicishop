import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name="photo-camera" size={22} color={colors.whiteSmoke} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.grisOscuro,
        borderColor: colors.whiteSmoke,
        borderWidth: 1,
        width:38,
        height:38,
        borderRadius:32
    }
})