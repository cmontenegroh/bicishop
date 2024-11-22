import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const MyPlacesNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Bici Shop" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Mis pistas" component={MyPlacesScreen} />
    </Stack.Navigator>
)

export default MyPlacesNavigator