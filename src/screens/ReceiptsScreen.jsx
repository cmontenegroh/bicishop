import React from 'react';
import { StyleSheet, Text, FlatList, View, ActivityIndicator, Pressable } from 'react-native';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import { LinearGradient } from 'expo-linear-gradient';
import {  useGetReceiptsQuery } from '../services/receiptsService';
import { useSelector } from 'react-redux';


const ReceiptsScreen = () => {
  
  const token = useSelector((state) => state.authReducer.value.token);

  if (!token) {
    return (
      <>
        <View style={styles.noReceiptsContainer}>
          
          <Text style={{...styles.noReceiptsText, ...styles.underLineText}}>Solo disponible para usuarios regisrados </Text>
       
        </View> 
  
      </>
    );
  } 
  const { data, isLoading, error } = useGetReceiptsQuery();
  

  
  const receipts = data
    ? Object.keys(data).map((key) => ({
        id: key,
        createdAt: data[key].createdAt,
        total: data[key].total,
        cart: data[key].cart || [], 
      }))
    : [];

  

  
  const renderReceiptItem = ({ item }) => {
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <Text style={styles.title}>Código Factura: {item.id}</Text>
        <Text style={styles.date}>
          Creado el: {new Date(item.createdAt).toLocaleString('es-AR', dateOptions)} 
        </Text>
        <Text style={styles.total}>Total: ${item.total}</Text>

       
        {item.cart.length > 0 ? (
          item.cart.map((product, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.itemText}>
                Producto: {product.brand} 
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItems}>No hay productos en el carrito</Text>
        )}

       
      </FlatCard>
    );
  };

  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.burntOrange} />
      </View>
    );
  }

  if (error) {
    return <Text>Error al cargar los recibos</Text>;
  }

  
  return (
    <LinearGradient
      colors={[colors.negro, colors.smokeGray]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 3 }}
      style={styles.gradientBackground}
    >
      <FlatList
        data={receipts}
        keyExtractor={(item) => item.id}
        renderItem={renderReceiptItem}
      />
    </LinearGradient>
  );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.smokeGray,
  },
  receiptContainer: {
    padding: 20,
    margin: 16,
    backgroundColor: colors.smokeGray,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.whiteSmoke,
  },
  total: {
    fontSize: 16,
    color: colors.whiteSmoke,
  },
  date: {
    fontSize: 16,
    color: colors.goldenYellow,
  },
  cartItem: {
    padding: 5,
    marginTop: 5,
    backgroundColor: colors.smokeGray,
    borderRadius: 5,
  },
  itemText: {
    color: colors.whiteSmoke,
    fontSize: 14,
  },
  noItems: {
    color: colors.deepRed,
    fontSize: 14,
    marginTop: 10,
  },
  viewIcon: {
    alignSelf: 'flex-end',
  },
  noReceiptsContainer: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.negro
  },
  noReceiptsText: {
    fontSize: 16,
    color: colors.whiteSmoke,
  },
  underLineText: {
    textDecorationLine: 'underline',
},
});

