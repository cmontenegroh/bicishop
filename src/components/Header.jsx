
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { colors } from '../global/colors';
import MontserratText from './MontserratText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';
import { clearSessions } from '../db';

const Header = ({ subtitle }) => {
  const user = useSelector(state => state.authReducer.value.email);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearUser());
    clearSessions()
      .then(() => console.log("Sesión eliminada"))
      .catch((error) => console.log("Error al eliminar la sesión"));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Image source={require('../../assets/fonts/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Bici Shop</Text>
        <MontserratText style={styles.subtitle}>{subtitle}</MontserratText>
      </View>
      {user && (
        <View style={styles.rightContainer}>
          <Pressable onPress={onLogout} style={styles.access}>
            <Icon name="logout" size={24} color= {colors.burntOrange}/>
          </Pressable> 
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.negro,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: 65,
    height: 65,
  },
  title: {
    fontSize: 38,
    color: colors.whiteSmoke,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.goldenYellow,
  },
  access: {
    padding: 8,
  },
});




