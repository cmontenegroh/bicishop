import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import FlatCard from '../components/FlatCard';
import { useEffect, useState } from 'react';
import { colors } from '../global/colors';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../services/shopService';
import { LinearGradient } from 'expo-linear-gradient'; 

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const [isPortrait, setIsPortrait] = useState(true);

    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    const dispatch = useDispatch();

    useEffect(() => {
        setIsPortrait(width <= height);
    }, [width, height]);

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable 
                onPress={() => {
                    dispatch(setCategory(item.title)); 
                    navigation.navigate('Productos'); 
                }}
            >
                <FlatCard 
                    style={{ 
                        ...styles.categoryItemContainer, 
                        ...styles.row 
                    }}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        );
    };

    return (
        <LinearGradient
        colors={[colors.negro, colors.smokeGray]}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 3 }}
            style={styles.gradientBackground}
        >
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.burntOrange} />
            ) : error ? (
                <Text>Error al cargar las categorías</Text>
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={renderCategoryItem}
                />
            )}
        </LinearGradient>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    categoryItemContainer: {
        justifyContent: "space-between", 
        alignItems: "center", 
        marginHorizontal: 10, 
        marginVertical: 5, 
        padding: 15, 
        backgroundColor: 'transparent', 
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "300",
        color: colors.whiteSmoke, 
    },
    image: {
        width: 150, 
        height: 80, 
    },
    row: {
        flexDirection: 'row-reverse', 
    },
});




