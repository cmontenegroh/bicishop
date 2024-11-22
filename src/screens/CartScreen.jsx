import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import FlatCard from '../components/FlatCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart, removeItem } from '../features/cart/cartSlice';

const CartScreen = ({ navigation }) => {
    const cart = useSelector(state => state.cartReducer.value.cartItems);
    const total = useSelector(state => state.cartReducer.value.total);
    const cartLength = useSelector(state => state.cartReducer.value.cartLenght);
    const [triggerPost] = usePostReceiptMutation();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeItem(id)); 
    };

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: $ {total} </Text>
            <Pressable
                style={styles.confirmButton}
                onPress={() => {
                    triggerPost({ cart, total, createdAt: Date.now() });
                    dispatch(clearCart());
                    navigation.navigate("Receipts");
                }}
            >
                <Text style={styles.confirmButtonText}>Comprar</Text>
            </Pressable>
        </View>
    );

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <Image
                source={{ uri: item.mainImage }}
                style={styles.cartImage}
                resizeMode="cover"
            />
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                <Pressable onPress={() => handleDelete(item.id)}>
                    <Icon name="delete" size={24} color={colors.deepRed} style={styles.trashIcon} />
                </Pressable>
            </View>
        </FlatCard>
    );

    return (
        <LinearGradient
            colors={[colors.negro, colors.smokeGray]}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 3 }} 
            style={styles.gradientBackground}
        >
            {cartLength > 0 ? (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCartItem}
                    ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
                    ListFooterComponent={<FooterComponent />}
                />
            ) : (
                <View style={styles.cartEmpty}>
                    <Pressable onPress={() => navigation.navigate('Categorías')}>
                        <Text style={{ ...styles.cartEmptyText, ...styles.underLineText }}>
                            El carrito está vacío
                        </Text>
                    </Pressable>
                </View>
            )}
        </LinearGradient>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10,
        backgroundColor: 'transparent',
    },
    cartImage: {
        width: 80,
        height: 80,
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: '900',
        color: colors.whiteSmoke,
    },
    description: {
        marginBottom: 15,
        color: colors.whiteSmoke,
        fontSize: 14,
    },
    price: {
        marginBottom: 4,
        color: colors.goldenYellow,
    },
    quantity: {
        marginBottom: 4,
        color: colors.goldenYellow,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
        color: colors.whiteSmoke,
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerTotal: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.whiteSmoke,
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.brightTeal,
        borderRadius: 5,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.whiteSmoke,
        fontSize: 18,
        fontWeight: '300',
    },
    cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8,
    },
    cartEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartEmptyText: {
        fontSize: 16,
        color: colors.whiteSmoke,
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
});



