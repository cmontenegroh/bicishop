import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { setProductId } from '../features/shop/shopSlice';
import { LinearGradient } from 'expo-linear-gradient';

const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const category = useSelector(state => state.shopReducer.value.categorySelected);

    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

    const dispatch = useDispatch();

    useEffect(() => {
        setProductsFiltered(productsFilteredByCategory);
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, productsFilteredByCategory]);

    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => {
            dispatch(setProductId(item.id));
            navigation.navigate("Producto");
        }}>
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags: </Text>
                        <FlatList
                            style={styles.tags}
                            data={item.tags}
                            keyExtractor={(tag) => tag}
                            renderItem={({ item: tag }) => (<Text style={styles.tagText}>{tag}</Text>)}
                        />
                    </View>
                    {item.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>Descuento {item.discount} %</Text></View>}
                    {item.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                    <Text style={styles.price}>Precio: $ {item.price}</Text>
                </View>
            </FlatCard>
        </Pressable>
    );

    return (
        <LinearGradient
            colors={[colors.negro, colors.smokeGray]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 3 }}
            style={styles.gradientBackground}
        >
            {
                isLoading
                    ? <ActivityIndicator size="large" color={colors.burntOrange} />
                    : error
                        ? <Text>Error al cargar los productos</Text>
                        : <>
                            <View style={styles.headerContainer}>
                                <Pressable onPress={() => navigation.goBack()}>
                                    <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
                                </Pressable>
                                <View style={styles.searchContainer}>
                                    <Search setSearch={setSearch} />
                                </View>
                            </View>
                            <FlatList
                                data={productsFiltered}
                                keyExtractor={item => item.id}
                                renderItem={renderProductItem}
                            />
                        </>
            }
        </LinearGradient>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchContainer: {
        flex: 1,
    },
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
        gap: 10,
        backgroundColor: 'transparent',
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productDescription: {
        width: "80%",
        padding: 20,
        gap: 10,
        color: colors.whiteSmoke,
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '800',
        fontSize: 22,
        color: colors.whiteSmoke,
    },
    shortDescription: {
        fontWeight: '300',
        fontSize: 14,
        color: colors.whiteSmoke,
    },
    tags: {
        color: colors.whiteSmoke,
        flexDirection: 'row',
        gap: 5,
        fontSize: 14,
    },
    tagText: {
        fontWeight: '300',
        fontSize: 14,
        color: colors.peach,
    },
    price: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.whiteSmoke,
    },
    discount: {
        backgroundColor: colors.neonRed,
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    discountText: {
        color: colors.whiteSmoke,
    },
    noStockText: {
        color: colors.deepRed,
    },
    goBack: {
        color: colors.burntOrange,
    },
});


