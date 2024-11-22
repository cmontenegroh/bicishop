import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';
import { LinearGradient } from 'expo-linear-gradient'; 

const ProductScreen = ({ navigation }) => {
    const productId = useSelector(state => state.shopReducer.value.productId);
    const { width } = useWindowDimensions();
    const { data: productFound, error, isLoading } = useGetProductQuery(productId);
    const dispatch = useDispatch();

    return (
        <LinearGradient
        colors={[colors.negro, colors.smokeGray]}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 2 }}
            style={styles.gradientBackground}
        >
            {
                isLoading
                    ? <ActivityIndicator size="large" color={colors.burntOrange} />
                    : error
                        ? <Text>Error al cargar el producto</Text>
                        : <ScrollView style={styles.productContainer}>
                            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
                            <Text style={styles.textBrand}>{productFound.brand}</Text>
                            <Text style={styles.textTitle}>{productFound.title}</Text>
                            <Image
                                source={{ uri: productFound.mainImage }}
                                alt={productFound.title}
                                style={{ width: '100%', height: width * 0.7 }}
                                resizeMode='contain'
                            />
                            <Text style={styles.longDescription}>{productFound.longDescription}</Text>
                            <View style={styles.tagsContainer}>
                                <View style={styles.tags}>
                                    <Text style={styles.tagText}>Tags:</Text>
                                    {productFound.tags?.map(tag => <Text key={Math.random()} style={styles.tagText}>{tag}</Text>)}
                                </View>
                                {productFound.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>- {productFound.discount} %</Text></View>}
                            </View>
                            {productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                            <Text style={styles.price}>Precio: $ {productFound.price}</Text>
                            <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                                onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}
                            >
                                <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                            </Pressable>
                        </ScrollView>
            }
        </LinearGradient>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    goBack: {
        padding: 8,
        color: colors.burntOrange,
    },
    productContainer: {
        paddingHorizontal: 16,
        backgroundColor: 'transparent', 
    },
    textBrand: {
        color: colors.goldenYellow,
        fontSize: 20,
    },
    textTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '800',
        fontSize: 23,
        color: colors.whiteSmoke,
      
    },
    longDescription: {
        fontSize: 14,
        textAlign: 'justify',
        paddingVertical: 8,
        color: colors.whiteSmoke
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.peach,
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
    },
    discount: {
        backgroundColor: colors.neonRed,
        width: 70,
        height: 18,
        borderRadius: 5,
    },
    discountText: {
        color: colors.whiteSmoke,
        textAlign: 'center',
        verticalAlign: 'center',
        fontSize:14,
    },
    noStockText: {
        color: colors.neonRed,
    },
    price: {
        fontWeight: '500',
        fontSize: 20,
        color: colors.whiteSmoke,
        alignSelf: 'center',
        paddingVertical: 6,
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.brightTeal,
        borderRadius: 5,
        marginVertical: 16,
    },
    textAddToCart: {
        color: colors.whiteSmoke,
        fontWeight: 300,
        fontSize: 18,
        textAlign: 'center',
    },
});



