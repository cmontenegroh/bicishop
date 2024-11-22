import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { colors } from '../global/colors';

const FlatCard = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[colors.negro, colors.smokeGray]} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 4 }}   
      style={{ ...styles.cardContainer, ...style }} 
    >
      {children}
    </LinearGradient>
  );
};

export default FlatCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: colors.negro,
    borderColor: colors.whiteSmoke,
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 3, height: 5 },
    elevation: 10,
    borderRadius: 5,
    overflow: 'hidden', 
  },
});


